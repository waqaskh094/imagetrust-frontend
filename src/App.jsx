import { useEffect, useState } from "react";
import Header from "./components/Header";
import Dropzone from "./components/Dropzone";
import ImagePreview from "./components/ImagePreview";
import ErrorAlert from "./components/ErrorAlert";
import ResultCard from "./components/ResultCard";
import HowItWorks from "./components/HowItWorks";
import Notice from "./components/Notice";
import Footer from "./components/Footer";
import { ApiError, ERRORS, getDemoState, predict, validateFile } from "./lib/api";
import { getVerdict, pct } from "./lib/verdict";

function useDarkMode() {
  const [dark, setDark] = useState(() => {
    let saved = null;
    try { saved = localStorage.getItem("imagetrust-theme"); } catch { /* storage can be blocked */ }
    return saved ? saved === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  useEffect(() => {
    try { localStorage.setItem("imagetrust-theme", dark ? "dark" : "light"); } catch { /* storage can be blocked */ }
  }, [dark]);
  return [dark, setDark];
}

// status: "idle" | "selected" | "loading" | "result"
export default function App({ demo, sampleUrl = "/sample.jpg" }) {
  const [dark, setDark] = useDarkMode();
  const [status, setStatus] = useState("idle");
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [forceDrag, setForceDrag] = useState(false);
  const [slow, setSlow] = useState(false);

  // If the server takes a while (a sleeping free Space), tell the user instead of looking frozen.
  useEffect(() => {
    if (status !== "loading" || demo === "loading") {
      setSlow(false);
      return undefined;
    }
    const t = setTimeout(() => setSlow(true), 6000);
    return () => clearTimeout(t);
  }, [status, demo]);

  useEffect(() => {
    if (!demo || demo === "live") return;
    const s = getDemoState(demo, sampleUrl);
    setStatus(s.status);
    setFile(s.file ?? null);
    setError(s.error ?? null);
    setResult(s.result ?? null);
    setForceDrag(!!s.dragOver);
  }, [demo, sampleUrl]);

  const clearFile = () => {
    if (file?.url?.startsWith("blob:")) URL.revokeObjectURL(file.url);
    setFile(null);
  };

  const handleFile = (raw) => {
    setForceDrag(false);
    setResult(null);
    clearFile();
    const invalid = validateFile(raw);
    if (invalid) {
      setError(invalid);
      setStatus("idle");
      return;
    }
    setError(null);
    setFile({ name: raw.name, size: raw.size, url: URL.createObjectURL(raw), raw });
    setStatus("selected");
  };

  const analyze = async () => {
    setError(null);
    setStatus("loading");
    try {
      setResult(await predict(file.raw ?? file));
      setStatus("result");
    } catch (e) {
      setError(e instanceof ApiError ? e.error : ERRORS.server);
      setStatus("selected");
    }
  };

  const reset = () => {
    clearFile();
    setResult(null);
    setError(null);
    setStatus("idle");
  };

  const loading = status === "loading";
  const announcement =
    status === "loading" ? "Analyzing image…"
    : status === "result" && result ? `Analysis complete: ${getVerdict(result).title}, ${pct(result.confidence)}% confidence.`
    : "";

  return (
    <div className={dark ? "dark" : ""}>
      <div className="flex min-h-screen flex-col bg-paper font-sans text-ink antialiased transition-colors duration-300 selection:bg-real-200 dark:bg-base-900 dark:text-base-100 dark:selection:bg-real-800">
        <Header dark={dark} onToggleDark={() => setDark((d) => !d)} />

        <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-16 px-5 pt-10 sm:px-8 sm:pt-12">
          <section aria-label="Image check" aria-busy={loading} className="max-w-3xl rounded-card bg-surface p-4 shadow-soft sm:p-8 dark:bg-base-800">
            {status === "result" && result ? (
              <ResultCard result={result} file={file} onReset={reset} />
            ) : (
              <div className="flex flex-col gap-4">
                {file ? (
                  <ImagePreview file={file} loading={loading} slow={slow} onRemove={reset} onAnalyze={analyze} />
                ) : (
                  <Dropzone onFile={handleFile} forceDragOver={forceDrag} />
                )}
                {error && <ErrorAlert error={error} onRetry={error.kind === "server" ? analyze : undefined} />}
              </div>
            )}
          </section>
          <p className="sr-only" aria-live="polite">{announcement}</p>

          <HowItWorks />
          <Notice />
        </main>

        <Footer />
      </div>
    </div>
  );
}
