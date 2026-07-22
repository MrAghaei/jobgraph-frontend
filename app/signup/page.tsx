import { SiteHeader } from "@/components/landing/site-header";
import { SiteFooter } from "@/components/landing/site-footer";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";

export const metadata = {
  title: "پلن پرو — جاب‌گراف",
};

export default function SignupPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="w-full max-w-md space-y-6 rounded-xl border border-border bg-card p-6">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">پلن پرو</h1>
            <p className="text-sm leading-6 text-muted-foreground">
              هشدار تلگرام، خلاصه ایمیل و تحلیل عمیق‌تر بازار. ثبت‌نام به‌زودی
              فعال می‌شود.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <Button disabled className="w-full">
              ثبت‌نام — به‌زودی
            </Button>
            <ButtonLink variant="outline" className="w-full" href="/jobs">
              فعلاً آگهی‌ها را ببینید
            </ButtonLink>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
