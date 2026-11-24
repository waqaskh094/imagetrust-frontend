export const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];
export const ACCEPTED_EXT = ".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp";
export const MAX_BYTES = 10 * 1024 * 1024;
export const UNCERTAIN_THRESHOLD = 0.6;

// Address of the ImageTrust API (Hugging Face Space). Set VITE_API_URL in Vercel / .env to change it.
export const API_URL = (import.meta.env.VITE_API_URL || "https://myusernmae-iamgetrust-api.hf.space").replace(/\/$/, "");
// A free Space that was asleep can take a minute or more to wake up on the first request.
const REQUEST_TIMEOUT_MS = 120_000;

export function formatBytes(bytes) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export const ERRORS = {
  type: { kind: "type", title: "This file type isn't supported", message: "Choose a JPG, PNG or WEBP image." },
  size: (bytes) => ({ kind: "size", title: "This file is too large", message: `The image is ${formatBytes(bytes)}. The limit is 10 MB.` }),
  server: { kind: "server", title: "We couldn't analyze this image", message: "The server didn't respond. Your image is still selected, so you can try again." },
  invalid: { kind: "invalid", title: "We couldn't read this image", message: "The file may be damaged. Remove it and choose a different image." },
};

export class ApiError extends Error {
  constructor(error) {
    super(error.message);
    this.error = error;
  }
}

export function validateFile(file) {
  if (!ACCEPTED_TYPES.includes(file.type)) return ERRORS.type;
  if (file.size > MAX_BYTES) return ERRORS.size(file.size);
  return null;
}

const MOCK_RESPONSES = {
  real: {
    label: "real",
    confidence: 0.91,
    models: [
      { name: "Model A (CNN from scratch)", label: "real", confidence: 0.86 },
      { name: "Model B (fine-tuned pretrained)", label: "real", confidence: 0.94 },
    ],
  },
  fake: {
    label: "fake",
    confidence: 0.87,
    models: [
      { name: "Model A (CNN from scratch)", label: "fake", confidence: 0.79 },
      { name: "Model B (fine-tuned pretrained)", label: "fake", confidence: 0.92 },
    ],
  },
  uncertain: {
    label: "real",
    confidence: 0.54,
    models: [
      { name: "Model A (CNN from scratch)", label: "fake", confidence: 0.58 },
      { name: "Model B (fine-tuned pretrained)", label: "real", confidence: 0.63 },
    ],
  },
};

function normalize(data) {
  const ok = (m) => m && (m.label === "real" || m.label === "fake") && typeof m.confidence === "number";
  if (!ok(data)) throw new ApiError(ERRORS.server);
  return {
    label: data.label,
    confidence: data.confidence,
    models: Array.isArray(data.models) ? data.models.filter(ok).map(({ name, label, confidence }) => ({ name, label, confidence })) : [],
  };
}

// POST /predict, multipart field "image". Returns { label, confidence, models: [{ name, label, confidence }] }.
export async function predict(file) {
  const body = new FormData();
  body.append("image", file);

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    let res;
    try {
      res = await fetch(`${API_URL}/predict`, { method: "POST", body, signal: controller.signal });
    } catch {
      throw new ApiError(ERRORS.server);              // network failure, CORS problem or timeout
    }
    if (res.status === 413) throw new ApiError(ERRORS.size(file.size));
    if (res.status === 415) throw new ApiError(ERRORS.type);
    if (res.status === 422) throw new ApiError(ERRORS.invalid);
    if (!res.ok) throw new ApiError(ERRORS.server);
    try {
      return normalize(await res.json());
    } catch (e) {
      throw e instanceof ApiError ? e : new ApiError(ERRORS.server);
    }
  } finally {
    clearTimeout(timer);
  }
}

export function getDemoState(demo, sampleUrl) {
  const file = { name: "harbor-at-dawn.jpg", size: 2480000, url: sampleUrl };
  switch (demo) {
    case "drag-over": return { status: "idle", dragOver: true };
    case "selected": return { status: "selected", file };
    case "loading": return { status: "loading", file };
    case "real":
    case "fake":
    case "uncertain": return { status: "result", file, result: MOCK_RESPONSES[demo] };
    case "error-type": return { status: "idle", error: ERRORS.type };
    case "error-size": return { status: "idle", error: ERRORS.size(14200000) };
    case "error-server": return { status: "selected", file, error: ERRORS.server };
    default: return { status: "idle" };
  }
}
