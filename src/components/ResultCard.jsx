import { useState } from "react";
import Button from "./Button";
import { CheckIcon, CopyIcon, RotateIcon } from "./Icons";
import VerdictBadge from "./VerdictBadge";
import ProbabilityBar from "./ProbabilityBar";
import ModelTable from "./ModelTable";
import { buildSummary, getVerdict, modelsDisagree, pct, realProbability } from "../lib/verdict";

export default function ResultCard({ result, file, onReset }) {
  const verdict = getVerdict(result);
  const [copied, setCopied] = useState(false);
  const disagree = modelsDisagree(result);
  const leaning = result.label === "real" ? "real" : "AI-generated";

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(buildSummary(result, file.name));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <article
      aria-labelledby="result-title"
      className="flex flex-col gap-7 transition duration-300 ease-out starting:translate-y-2 starting:opacity-0 motion-reduce:transition-none"
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <img src={file.url} alt={`Analyzed image: ${file.name}`} className="aspect-square w-28 shrink-0 rounded-card object-cover sm:w-36" />
        <div className="min-w-0">
          <h2 id="result-title" className="truncate text-sm font-semibold text-base-700 dark:text-base-300">
            Result for {file.name}
          </h2>
          <div className="mt-2">
            <VerdictBadge verdict={verdict} />
          </div>
          <p className="mt-3 max-w-md text-pretty text-base-800 dark:text-base-200">{verdict.summary}</p>
        </div>
      </div>

      <div>
        <p className="flex flex-wrap items-baseline gap-x-3">
          {disagree ? (
            <>
              <span className="font-display text-4xl">Models disagree</span>
              <span className="text-base-700 dark:text-base-300">
                average of both: {pct(1 - realProbability(result))}% AI-generated
              </span>
            </>
          ) : (
            <>
              <span className="font-display text-5xl tabular-nums">{pct(result.confidence)}%</span>
              <span className="text-base-700 dark:text-base-300">
                {verdict.key === "uncertain" ? `confidence, leaning ${leaning}` : "confidence"}
              </span>
            </>
          )}
        </p>
        <div className="mt-4">
          <ProbabilityBar pReal={realProbability(result)} />
        </div>
      </div>

      {result.models?.length > 0 && <ModelTable models={result.models} />}

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button onClick={onReset}>
          <RotateIcon className="size-4" />
          Analyze another image
        </Button>
        <Button variant="secondary" onClick={copy}>
          {copied ? <CheckIcon className="size-4" /> : <CopyIcon className="size-4" />}
          {copied ? "Copied" : "Copy result"}
        </Button>
      </div>
      <span className="sr-only" aria-live="polite">{copied ? "Result copied to clipboard" : ""}</span>
    </article>
  );
}
