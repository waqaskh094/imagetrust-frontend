import { CheckCircleIcon, TriangleAlertIcon } from "./Icons";
import { pct } from "../lib/verdict";

// A native <progress> carries the split, so no inline width styles are needed:
// the filled value is Real, the remaining track is AI-generated.
export default function ProbabilityBar({ pReal }) {
  const real = pct(pReal);
  const ai = 100 - real;
  return (
    <div>
      <progress
        value={real}
        max={100}
        aria-label={`Probability: ${real}% real, ${ai}% AI-generated`}
        className="block h-4 w-full appearance-none overflow-hidden rounded-full border-0 bg-fake-600 dark:bg-fake-400 [&::-moz-progress-bar]:rounded-full [&::-moz-progress-bar]:bg-real-600 dark:[&::-moz-progress-bar]:bg-real-400 [&::-webkit-progress-bar]:bg-fake-600 dark:[&::-webkit-progress-bar]:bg-fake-400 [&::-webkit-progress-value]:rounded-r-full [&::-webkit-progress-value]:border-r-[3px] [&::-webkit-progress-value]:border-surface [&::-webkit-progress-value]:bg-real-600 [&::-webkit-progress-value]:transition-[width] [&::-webkit-progress-value]:duration-700 dark:[&::-webkit-progress-value]:border-base-800 dark:[&::-webkit-progress-value]:bg-real-400"
      />
      <div className="mt-3 flex justify-between gap-4 text-sm font-semibold">
        <span className="flex items-center gap-1.5 text-real-700 dark:text-real-300">
          <CheckCircleIcon className="size-4" />
          Real {real}%
        </span>
        <span className="flex items-center gap-1.5 text-fake-700 dark:text-fake-300">
          AI-generated {ai}%
          <TriangleAlertIcon className="size-4" />
        </span>
      </div>
    </div>
  );
}
