import Button from "./Button";
import { ImageIcon, LoaderIcon, ScanSearchIcon, XIcon } from "./Icons";
import { formatBytes } from "../lib/api";

export default function ImagePreview({ file, loading, slow = false, onRemove, onAnalyze }) {
  return (
    <div className="flex flex-col gap-5">
      <div className="relative overflow-hidden rounded-card bg-base-200 dark:bg-base-900">
        <img
          src={file.url}
          alt={`Uploaded image: ${file.name}`}
          className={`mx-auto max-h-96 w-full object-contain transition duration-500 motion-reduce:transition-none ${loading ? "scale-[1.02] opacity-50" : ""}`}
        />
        {loading && (
          <div className="absolute inset-0 grid place-items-center transition-opacity duration-300 starting:opacity-0">
            <div className="flex items-center gap-3 rounded-full bg-paper px-5 py-3 font-semibold shadow-soft dark:bg-base-800">
              <LoaderIcon className="size-5 animate-spin motion-reduce:animate-none" />
              {slow ? "Waking up the server…" : "Analyzing…"}
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <span className="grid size-11 shrink-0 place-items-center rounded-full bg-base-100 dark:bg-base-700">
            <ImageIcon className="size-5" />
          </span>
          <div className="min-w-0">
            <p className="truncate font-semibold">{file.name}</p>
            <p className="text-sm text-base-700 dark:text-base-300">{formatBytes(file.size)}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={onRemove} disabled={loading}>
            <XIcon className="size-4" />
            Remove
          </Button>
          <Button onClick={loading ? undefined : onAnalyze} aria-disabled={loading} className="flex-1 sm:flex-none">
            {loading ? <LoaderIcon className="size-4 animate-spin motion-reduce:animate-none" /> : <ScanSearchIcon className="size-4" />}
            {loading ? "Analyzing…" : "Analyze image"}
          </Button>
        </div>
      </div>
      {loading && slow && (
        <p role="status" className="text-sm text-base-700 dark:text-base-300">
          The free server sleeps when it is idle, so the first check can take a minute. Please keep this page open.
        </p>
      )}
    </div>
  );
}
