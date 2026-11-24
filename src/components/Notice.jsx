import { InfoIcon } from "./Icons";

export default function Notice() {
  return (
    <aside aria-label="Notice" className="flex max-w-3xl gap-4 rounded-card bg-base-200 p-5 sm:p-6 dark:bg-base-800">
      <InfoIcon className="mt-0.5 size-5 shrink-0" />
      <p className="text-pretty">
        <strong className="font-semibold">Results are probabilistic and can be wrong.</strong> The models learned from images made by one AI generator, so they are less reliable on images from other generators. They were also trained on small, low-resolution images, so large, sharp photos (such as portraits) can confuse them. Do not use as the only proof of authenticity.
      </p>
    </aside>
  );
}
