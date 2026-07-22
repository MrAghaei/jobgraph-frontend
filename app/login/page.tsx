import { SiteHeader } from "@/components/landing/site-header";
import { SiteFooter } from "@/components/landing/site-footer";
import { ButtonLink } from "@/components/ui/button-link";

export const metadata = {
  title: "ورود — جاب‌گراف",
};

export default function LoginPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="w-full max-w-md space-y-6 rounded-xl border border-border bg-card p-6">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">ورود</h1>
            <p className="text-sm text-muted-foreground">
              ورود برای پلن پرو و تنظیم هشدارها. مرور آگهی‌ها بدون حساب کاربری
              آزاد است.
            </p>
          </div>
          <ButtonLink className="w-full" href="/jobs">
            ادامه بدون ورود
          </ButtonLink>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
