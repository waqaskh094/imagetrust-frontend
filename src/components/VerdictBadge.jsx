const SIZES = {
  lg: { pill: "gap-2.5 px-5 py-2.5 font-display text-2xl sm:text-3xl", icon: "size-6 sm:size-7" },
  sm: { pill: "gap-1.5 px-3 py-1 text-sm font-semibold whitespace-nowrap", icon: "size-4" },
};

export default function VerdictBadge({ verdict, size = "lg" }) {
  const { Icon } = verdict;
  const s = SIZES[size];
  return (
    <span className={`inline-flex items-center rounded-full ${verdict.badge} ${s.pill}`}>
      <Icon className={`shrink-0 ${s.icon}`} />
      {size === "lg" ? verdict.title : verdict.short}
    </span>
  );
}
