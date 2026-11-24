import Button, { FOCUS_RING } from "./Button";
import { ShieldCheckIcon, MoonIcon, SunIcon } from "./Icons";

export default function Header({ dark, onToggleDark }) {
  return (
    <header className="mx-auto w-full max-w-5xl px-5 pt-5 sm:px-8 sm:pt-8">
      <div className="flex items-center justify-between gap-4">
        <a href="/" className={`flex items-center gap-3 rounded-full pr-2 ${FOCUS_RING}`}>
          <span className="grid size-10 place-items-center rounded-full bg-ink text-paper dark:bg-base-100 dark:text-ink">
            <ShieldCheckIcon className="size-5" />
          </span>
          <span className="font-display text-xl">ImageTrust AI</span>
        </a>
        <Button variant="ghost" onClick={onToggleDark} aria-pressed={dark} className="px-3.5">
          {dark ? <SunIcon className="size-5" /> : <MoonIcon className="size-5" />}
          <span className="sr-only sm:not-sr-only">Dark mode</span>
        </Button>
      </div>
      <div className="mt-12 max-w-2xl sm:mt-16">
        <h1 className="font-display text-4xl leading-[1.05] text-balance sm:text-5xl">
          Check whether an image is real or AI-generated
        </h1>
        <p className="mt-4 max-w-xl text-lg text-pretty text-base-700 dark:text-base-300">
          Upload a photo and two trained models estimate whether it came from a camera or an image generator.
        </p>
      </div>
    </header>
  );
}
