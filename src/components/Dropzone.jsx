import { useRef, useState } from "react";
import { FOCUS_RING } from "./Button";
import { UploadIcon } from "./Icons";
import { ACCEPTED_EXT } from "../lib/api";

export default function Dropzone({ onFile, forceDragOver = false }) {
  const inputRef = useRef(null);
  const [over, setOver] = useState(false);
  const active = over || forceDragOver;
  const open = () => inputRef.current?.click();

  const onKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      open();
    }
  };
  const onDrop = (e) => {
    e.preventDefault();
    setOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) onFile(file);
  };

  return (
    <div>
      <div
        role="button"
        tabIndex={0}
        aria-label="Upload an image. Drag and drop, or press Enter to browse files."
        aria-describedby="dropzone-limits"
        onClick={open}
        onKeyDown={onKeyDown}
        onDragOver={(e) => { e.preventDefault(); setOver(true); }}
        onDragLeave={() => setOver(false)}
        onDrop={onDrop}
        className={`group flex min-h-72 cursor-pointer flex-col items-center justify-center gap-4 rounded-card border-2 border-dashed px-6 py-10 text-center transition duration-200 [&_*]:pointer-events-none ${FOCUS_RING} ${
          active
            ? "border-ink bg-base-200 dark:border-base-100 dark:bg-base-700"
            : "border-base-500 bg-base-100 hover:border-base-700 dark:border-base-600 dark:bg-base-900/40 dark:hover:border-base-400"
        }`}
      >
        <span
          className={`grid size-16 place-items-center rounded-full transition duration-200 ${
            active ? "scale-110 bg-ink text-paper dark:bg-base-100 dark:text-ink" : "bg-surface text-ink dark:bg-base-700 dark:text-base-100"
          }`}
        >
          <UploadIcon className="size-7" />
        </span>
        <div>
          <p className="text-lg font-semibold">{active ? "Drop to upload" : "Drag and drop an image here"}</p>
          <p className="mt-1 text-base-700 dark:text-base-300">or</p>
        </div>
        <span
          aria-hidden="true"
          className="inline-flex min-h-11 items-center rounded-full bg-ink px-5 text-[15px] font-semibold text-paper transition-colors group-hover:bg-base-800 dark:bg-base-100 dark:text-ink dark:group-hover:bg-base-200"
        >
          Browse files
        </span>
      </div>
      <p id="dropzone-limits" className="mt-3 px-2 text-sm text-base-700 dark:text-base-300">
        JPG, PNG or WEBP · Maximum 10 MB
      </p>
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_EXT}
        tabIndex={-1}
        aria-hidden="true"
        className="sr-only"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onFile(file);
          e.target.value = "";
        }}
      />
    </div>
  );
}
