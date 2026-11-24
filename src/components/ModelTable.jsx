import { FOCUS_RING } from "./Button";
import { ChevronDownIcon } from "./Icons";
import VerdictBadge from "./VerdictBadge";
import { getVerdict, pct } from "../lib/verdict";

const splitName = (name) => {
  const m = name.match(/^(.*?)\s*\((.*)\)$/);
  return m ? [m[1], m[2]] : [name, null];
};

export default function ModelTable({ models }) {
  return (
    <details open className="group rounded-2xl bg-base-100 dark:bg-base-900/40">
      <summary className={`flex min-h-12 cursor-pointer list-none items-center justify-between rounded-2xl px-4 font-semibold [&::-webkit-details-marker]:hidden ${FOCUS_RING}`}>
        Model breakdown
        <ChevronDownIcon className="size-5 transition-transform duration-200 group-open:rotate-180" />
      </summary>
      <div className="overflow-x-auto px-4 pb-2">
        <table className="w-full text-left text-sm">
          <caption className="sr-only">Verdict and confidence from each model</caption>
          <thead className="text-base-700 dark:text-base-300">
            <tr>
              <th scope="col" className="py-2 pr-4 font-semibold">Model</th>
              <th scope="col" className="py-2 pr-4 font-semibold">Verdict</th>
              <th scope="col" className="py-2 text-right font-semibold">Confidence</th>
            </tr>
          </thead>
          <tbody>
            {models.map((m) => {
              const [title, detail] = splitName(m.name);
              return (
                <tr key={m.name} className="border-t-2 border-base-200 dark:border-base-700">
                  <th scope="row" className="py-3 pr-4 font-normal">
                    <span className="block font-semibold">{title}</span>
                    {detail && <span className="block text-base-700 dark:text-base-300">{detail}</span>}
                  </th>
                  <td className="py-3 pr-4"><VerdictBadge verdict={getVerdict(m)} size="sm" /></td>
                  <td className="py-3 text-right text-base font-semibold tabular-nums">{pct(m.confidence)}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </details>
  );
}
