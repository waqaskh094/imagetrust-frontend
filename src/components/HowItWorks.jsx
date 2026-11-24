const STEPS = [
  { title: "Upload", text: "Add a JPG, PNG or WEBP image up to 10 MB." },
  { title: "Model analyzes", text: "Two models look for patterns left by cameras and by image generators." },
  { title: "Get verdict with confidence", text: "You see a verdict and a confidence score. Scores under 60% are marked Uncertain." },
];

export default function HowItWorks() {
  return (
    <section aria-labelledby="how-title">
      <h2 id="how-title" className="font-display text-3xl">How it works</h2>
      <ol className="mt-8 grid gap-8 sm:grid-cols-3 sm:gap-6">
        {STEPS.map((step, i) => (
          <li key={step.title} className="flex gap-4 sm:flex-col">
            <span aria-hidden="true" className="grid size-14 shrink-0 place-items-center rounded-full bg-surface font-display text-2xl dark:bg-base-800">
              {i + 1}
            </span>
            <div>
              <h3 className="text-lg font-semibold">{step.title}</h3>
              <p className="mt-1 max-w-xs text-pretty text-base-700 dark:text-base-300">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
