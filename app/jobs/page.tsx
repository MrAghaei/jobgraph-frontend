import { Suspense } from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/landing/site-header";
import { SiteFooter } from "@/components/landing/site-footer";
import { JobsBoard } from "@/components/jobs/jobs-board";

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
              جستجو و فیلتر آزاد — بدون نیاز به ثبت‌نام.
            </p>
          </div>

          <Suspense
            fallback={
              <p className="font-mono text-sm text-muted-foreground">
                در حال بارگذاری…
              </p>
            }
          >
            <JobsBoard />
          </Suspense>

          <p className="text-center text-sm text-muted-foreground">
            به دنبال هشدار لحظه‌ای هستید؟{" "}
            <Link
              href="/pricing"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              پلن پرو را ببینید
            </Link>
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
