import { CheckCircleIcon, TriangleAlertIcon, CircleHelpIcon } from "../components/Icons";
import { UNCERTAIN_THRESHOLD } from "./api";

// Full literal class strings so Tailwind can detect them.
export const VERDICTS = {
  real: {
    key: "real",
    title: "Likely Real",
    short: "Real",
    summary: "The models found patterns consistent with a photograph taken by a camera.",
    Icon: CheckCircleIcon,
    badge: "bg-real-200 text-real-900 dark:bg-real-800 dark:text-real-100",
  },
  fake: {
    key: "fake",
    title: "Likely AI-Generated",
    short: "AI-generated",
    summary: "The models found patterns consistent with images made by AI image generators.",
    Icon: TriangleAlertIcon,
    badge: "bg-fake-200 text-fake-900 dark:bg-fake-800 dark:text-fake-100",
  },
  uncertain: {
    key: "uncertain",
    title: "Uncertain",
    short: "Uncertain",
    summary: "The models could not reach a confident decision. Treat this result as inconclusive.",
    Icon: CircleHelpIcon,
    badge: "bg-base-300 text-base-900 dark:bg-base-600 dark:text-base-100",
  },
};

export const getVerdict = ({ label, confidence }) =>
  VERDICTS[confidence < UNCERTAIN_THRESHOLD ? "uncertain" : label];

export const realProbability = ({ label, confidence }) => (label === "real" ? confidence : 1 - confidence);

export const modelsDisagree = (result) => {
  const labels = new Set((result.models ?? []).map((m) => m.label));
  return labels.size > 1;
};

export const pct = (n) => Math.round(n * 100);

export function buildSummary(result, fileName) {
  const lines = [
    modelsDisagree(result)
      ? `ImageTrust AI result for ${fileName}: Models disagree (average: ${pct(1 - realProbability(result))}% AI-generated)`
      : `ImageTrust AI result for ${fileName}: ${getVerdict(result).title} (${pct(result.confidence)}% confidence)`,
    ...(result.models ?? []).map((m) => `- ${m.name}: ${getVerdict(m).short}, ${pct(m.confidence)}%`),
    "Results are probabilistic and can be wrong.",
  ];
  return lines.join("\n");
}
