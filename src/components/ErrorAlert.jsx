import Button from "./Button";
import { CircleAlertIcon, RotateIcon } from "./Icons";

export default function ErrorAlert({ error, onRetry }) {
  return (
    <div
      role="alert"
      className="flex flex-wrap items-start gap-3 rounded-2xl bg-base-100 p-4 ring-2 ring-inset ring-fake-600/40 transition-opacity duration-300 starting:opacity-0 dark:bg-base-900/50 dark:ring-fake-400/40"
    >
      <CircleAlertIcon className="mt-0.5 size-5 shrink-0 text-fake-700 dark:text-fake-300" />
      <div className="min-w-0 flex-1">
        <p className="font-semibold">{error.title}</p>
        <p className="mt-0.5 text-sm text-base-700 dark:text-base-300">{error.message}</p>
      </div>
      {onRetry && (
        <Button variant="secondary" onClick={onRetry} className="w-full sm:w-auto">
          <RotateIcon className="size-4" />
          Try again
        </Button>
      )}
    </div>
  );
}
