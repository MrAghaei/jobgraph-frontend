import { SiteHeader } from "@/components/landing/site-header";
import { SiteFooter } from "@/components/landing/site-footer";
import { PublicAnalyticsView } from "@/components/analytics/public-analytics-view";

export const metadata = {
  title: "تحلیل بازار — جاب‌گراف",
  description: "شاخص‌های پایه بازار کار تکنولوژی ایران — بدون نیاز به ثبت‌نام.",
};

export default function PublicAnalyticsPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="space-y-4">
            <h1 className="text-3xl font-semibold tracking-tight">
              تحلیل بازار
            </h1>
            <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
              حجم آگهی فعال و پرتقاضاترین مهارت‌ها در ۳۰ روز گذشته.
            </p>
          </div>
          <PublicAnalyticsView />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
