import { SiteHeader } from "@/components/landing/site-header";
import { SiteFooter } from "@/components/landing/site-footer";

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
              شاخص‌های پایه بازار کار — بدون نیاز به ثبت‌نام. برای تحلیل
              عمیق‌تر، پلن پرو را ببینید.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { label: "آگهی فعال", value: "۱,۲۴۷" },
              { label: "میانگین حقوق", value: "۴۲M" },
              { label: "رشد هفتگی", value: "+۱۲٪" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-border bg-card p-5"
              >
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="mt-2 font-mono text-2xl font-semibold">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
