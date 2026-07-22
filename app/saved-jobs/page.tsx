import { SiteHeader } from "@/components/landing/site-header";
import { SiteFooter } from "@/components/landing/site-footer";
import { ProtectedGuard } from "@/components/auth/protected-guard";

export const metadata = {
  title: "آگهی‌های ذخیره‌شده — جاب‌گراف",
};

export default function SavedJobsPage() {
  return (
    <>
      <SiteHeader />
      <ProtectedGuard>
        <main className="flex-1 px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl space-y-4">
            <h1 className="text-3xl font-semibold tracking-tight">
              آگهی‌های ذخیره‌شده
            </h1>
            <p className="text-sm text-muted-foreground">
              آگهی‌هایی که ذخیره کرده‌اید اینجا نمایش داده می‌شوند.
            </p>
          </div>
        </main>
      </ProtectedGuard>
      <SiteFooter />
    </>
  );
}
