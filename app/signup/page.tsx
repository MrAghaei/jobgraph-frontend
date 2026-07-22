import { Suspense } from "react";
import { SiteHeader } from "@/components/landing/site-header";
import { SiteFooter } from "@/components/landing/site-footer";
import { RegisterForm } from "@/components/auth/register-form";
import { AuthFormSkeleton } from "@/components/auth/google-button";
import { ButtonLink } from "@/components/ui/button-link";

export const metadata = {
  title: "ثبت‌نام — جاب‌گراف",
};

export default function SignupPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="w-full max-w-md space-y-6 rounded-xl border border-border bg-card p-6">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">ثبت‌نام</h1>
            <p className="text-sm leading-6 text-muted-foreground">
              هشدار تلگرام، خلاصه ایمیل و تحلیل عمیق‌تر بازار. مرور آگهی‌ها
              بدون حساب کاربری آزاد است.
            </p>
          </div>

          <Suspense fallback={<AuthFormSkeleton />}>
            <RegisterForm />
          </Suspense>

          <ButtonLink variant="ghost" className="w-full" href="/jobs">
            فعلاً آگهی‌ها را ببینید
          </ButtonLink>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
