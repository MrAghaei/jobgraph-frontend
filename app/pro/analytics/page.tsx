import { SiteHeader } from "@/components/landing/site-header";
import { SiteFooter } from "@/components/landing/site-footer";
import { ProtectedGuard } from "@/components/auth/protected-guard";
import { ProAnalyticsView } from "@/components/analytics/pro-analytics-view";

export const metadata = {
  title: "تحلیل پرو — جاب‌گراف",
};

export default function ProAnalyticsPage() {
  return (
    <>
      <SiteHeader />
      <ProtectedGuard requirePro>
        <main className="flex-1 px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-semibold tracking-tight">
                تحلیل بازار — پرو
              </h1>
              <p className="text-sm text-muted-foreground">
                هم‌وقوعی مهارت‌ها، روند ماهانه و توزیع حقوق.
              </p>
            </div>
            <ProAnalyticsView />
          </div>
        </main>
      </ProtectedGuard>
      <SiteFooter />
    </>
  );
}
