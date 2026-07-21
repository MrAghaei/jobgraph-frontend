import { SectionShell } from "@/components/landing/section-shell";
import { steps } from "@/lib/landing-data";

export function HowItWorks() {
  return (
    <SectionShell id="how-it-works">
      <div className="grid gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
        <div className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <h2 className="max-w-md text-balance text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            از کشف آگهی تا تصمیم مطمئن
          </h2>
          <p className="max-w-md text-pretty text-base leading-7 text-muted-foreground">
            جاب‌گراف برای کسی ساخته شده که وقتش را بین چند سایت هدر نمی‌دهد.
            یک جریان واحد: پیدا کردن، خواندن بازار، اقدام کردن.
          </p>
        </div>

        <ol className="space-y-10">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="grid gap-3 border-t border-border pt-8 first:border-t-0 first:pt-0 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-6"
            >
              <span
                aria-hidden="true"
                className="font-mono text-sm text-muted-foreground"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold tracking-tight text-foreground">
                  {step.title}
                </h3>
                <p className="max-w-prose text-pretty text-sm leading-7 text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </SectionShell>
  );
}
