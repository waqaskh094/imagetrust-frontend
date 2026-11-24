export const FOCUS_RING =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink dark:focus-visible:outline-base-100";

const VARIANTS = {
  primary:
    "bg-ink text-paper hover:bg-base-800 active:bg-base-900 dark:bg-base-100 dark:text-ink dark:hover:bg-base-200 dark:active:bg-base-300",
  secondary:
    "text-ink ring-2 ring-inset ring-base-500 hover:bg-base-200 active:bg-base-300 dark:text-base-100 dark:hover:bg-base-700 dark:active:bg-base-600",
  ghost:
    "text-base-800 hover:bg-base-200 active:bg-base-300 dark:text-base-200 dark:hover:bg-base-800 dark:active:bg-base-700",
};

export default function Button({ variant = "primary", className = "", children, ...props }) {
  return (
    <button
      type="button"
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-[15px] font-semibold transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-45 aria-disabled:cursor-progress ${FOCUS_RING} ${VARIANTS[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
