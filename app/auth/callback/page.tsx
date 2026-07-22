import { SiteHeader } from "@/components/landing/site-header";
import { SiteFooter } from "@/components/landing/site-footer";
import { AuthCallbackContent } from "@/components/auth/auth-callback-handler";

export const metadata = {
  title: "تکمیل ورود — جاب‌گراف",
};

export default function AuthCallbackPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="w-full max-w-md rounded-xl border border-border bg-card p-6">
          <AuthCallbackContent />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
