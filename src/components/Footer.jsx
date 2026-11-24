import { FOCUS_RING } from "./Button";
import { SITE } from "../lib/site";

const LINKS = SITE.links.filter((l) => l.href);
const CREDIT = ["ImageTrust AI", SITE.course, SITE.team && `Built by ${SITE.team}`].filter(Boolean).join(" · ");

export default function Footer() {
  return (
    <footer className="mx-auto w-full max-w-5xl px-5 pb-10 pt-20 sm:px-8">
      <div className="flex flex-col gap-4 border-t-2 border-base-300 pt-6 text-sm text-base-700 sm:flex-row sm:items-center sm:justify-between dark:border-base-700 dark:text-base-300">
        <p>{CREDIT}</p>
        {LINKS.length > 0 && (
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {LINKS.map((l) => (
              <li key={l.label}>
                <a href={l.href} className={`rounded font-semibold text-ink underline-offset-4 hover:underline dark:text-base-100 ${FOCUS_RING}`}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        )}
      </div>
    </footer>
  );
}
