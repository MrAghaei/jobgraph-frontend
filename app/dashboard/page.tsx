import { SiteHeader } from "@/components/landing/site-header";
import { SiteFooter } from "@/components/landing/site-footer";
import { ProtectedGuard } from "@/components/auth/protected-guard";
import { DashboardPanel } from "@/components/dashboard/dashboard-panel";

export const metadata = {
  title: "داشبورد — جاب‌گراف",
};

export default function DashboardPage() {
  return (
    <>
      <SiteHeader />
      <ProtectedGuard>
        <main className="flex-1 px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl space-y-6">
            <h1 className="text-3xl font-semibold tracking-tight">داشبورد</h1>
            <DashboardPanel />
          </div>
        </main>
      </ProtectedGuard>
      <SiteFooter />
    </>
  );
}
