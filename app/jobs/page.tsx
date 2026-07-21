import Link from "next/link";
import { Search } from "lucide-react";
import { SiteHeader } from "@/components/landing/site-header";
import { SiteFooter } from "@/components/landing/site-footer";
import { Button } from "@/components/ui/button";
import { heroJobs } from "@/lib/landing-data";

export const metadata = {
  title: "آگهی‌ها — جاب‌گراف",
  description: "جستجو و مرور آگهی‌های تکنولوژی از منابع مختلف بازار کار ایران.",
};

export default function JobsPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="space-y-4">
            <h1 className="text-3xl font-semibold tracking-tight text-foreground">
              آگهی‌های تکنولوژی
            </h1>
            <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
              جستجو و فیلتر آزاد — بدون نیاز به ثبت‌نام. داده نمونه تا اتصال
              API آماده شود.
            </p>
          </div>

          <form
            role="search"
            className="flex flex-col gap-3 sm:flex-row"
            action="/jobs"
          >
            <label htmlFor="job-search" className="sr-only">
              جستجوی آگهی
            </label>
            <div className="relative flex-1">
              <Search
                className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <input
                id="job-search"
                name="q"
                type="search"
                placeholder="نقش، شرکت یا مهارت..."
                className="h-11 w-full rounded-xl border border-border bg-background ps-10 pe-4 text-sm outline-none transition-[box-shadow] focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30"
              />
            </div>
            <Button type="submit" size="lg" className="h-11 shrink-0">
              جستجو
            </Button>
          </form>

          <ul className="divide-y divide-border rounded-xl border border-border bg-card">
            {heroJobs.map((job) => (
              <li key={job.id} className="px-4 py-4 sm:px-5">
                <article className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="space-y-1.5">
                    <h2 className="text-base font-semibold text-foreground">
                      {job.title}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {job.company} · {job.location}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {job.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md bg-secondary px-2 py-0.5 font-mono text-xs text-secondary-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end sm:justify-start">
                    <p className="font-mono text-sm font-medium text-foreground">
                      {job.salary}
                    </p>
                    <p className="font-mono text-xs text-muted-foreground">
                      {job.posted}
                    </p>
                  </div>
                </article>
              </li>
            ))}
          </ul>

          <p className="text-center text-sm text-muted-foreground">
            به دنبال هشدار لحظه‌ای هستید؟{" "}
            <Link href="/signup" className="font-medium text-foreground underline-offset-4 hover:underline">
              پلن پرو را ببینید
            </Link>
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
