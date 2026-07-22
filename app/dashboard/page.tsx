import { SiteHeader } from "@/components/landing/site-header";
import { SiteFooter } from "@/components/landing/site-footer";
import { ProtectedGuard } from "@/components/auth/protected-guard";

export const metadata = {
  title: "داشبورد — جاب‌گراف",
};

export default function DashboardPage() {
  return (
    <>
      <SiteHeader />
      <ProtectedGuard>
        <main className="flex-1 px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl space-y-4">
            <h1 className="text-3xl font-semibold tracking-tight">داشبورد</h1>
            <p className="text-sm text-muted-foreground">
              پروفایل، تنظیمات هشدار و اشتراک شما اینجا نمایش داده می‌شود.
            </p>
          </div>
        </main>
      </ProtectedGuard>
      <SiteFooter />
    </>
  );
}
