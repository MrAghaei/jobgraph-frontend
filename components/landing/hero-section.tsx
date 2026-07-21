import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { heroJobs } from "@/lib/landing-data";

export function JobFeedPreview() {
  return (
    <div
      aria-hidden="true"
      className="relative overflow-hidden rounded-xl border border-border bg-card shadow-[0_1px_0_0_oklch(0_0_0/4%)]"
    >
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <span className="font-mono text-xs text-muted-foreground">
          feed · live
        </span>
        <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          <span className="size-1.5 rounded-full bg-emerald-500" />
          به‌روزرسانی لحظه‌ای
        </span>
      </div>

      <ul className="divide-y divide-border">
        {heroJobs.map((job) => (
          <li key={job.id} className="px-4 py-3.5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 space-y-1">
                <p className="truncate text-sm font-medium text-foreground">
                  {job.title}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {job.company} · {job.location}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {job.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-secondary px-1.5 py-0.5 font-mono text-xs text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="shrink-0 text-end">
                <p className="font-mono text-xs font-medium text-foreground">
                  {job.salary}
                </p>
                <p className="pt-1 font-mono text-xs text-muted-foreground">
                  {job.posted}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-14 sm:px-6 sm:pb-20 sm:pt-20 lg:px-8">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(ellipse_at_top,oklch(0.97_0_0),transparent_70%)]" />

      <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-16">
        <div className="space-y-8 landing-enter">
          <div className="space-y-5">
            <p className="max-w-xl text-pretty text-lg leading-8 text-muted-foreground">
              آگهی‌های تکنولوژی از چند برد کاری — یک فید، یک جستجو، یک تصویر از
              بازار.
            </p>
            <h1 className="max-w-2xl text-balance text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
              بازار کار را بخوانید، نه فقط اسکرول کنید
            </h1>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              size="lg"
              className="h-11 px-5 text-base"
              render={<Link href="/jobs" />}
            >
              مشاهده آگهی‌ها
              <ArrowLeft className="size-4" aria-hidden="true" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-11 px-5"
              render={<Link href="#market" />}
            >
              آمار بازار کار
            </Button>
          </div>

          <p className="max-w-lg text-sm leading-6 text-muted-foreground">
            بدون ثبت‌نام شروع کنید. جستجو، فیلتر و مقایسه آزاد است — هشدار
            لحظه‌ای برای پلن پرو.
          </p>
        </div>

        <div className="lg:pt-4">
          <JobFeedPreview />
        </div>
      </div>
    </section>
  );
}
