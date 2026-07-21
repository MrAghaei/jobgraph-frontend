import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionShell } from "@/components/landing/section-shell";

export function FinalCta() {
  return (
    <SectionShell
      tone="ink"
      innerClassName="py-16 md:py-20"
      className="bg-primary dark:bg-primary/30"
    >
      <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <div className="max-w-2xl space-y-3">
          <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            همین حالا بازار را ببینید
          </h2>
          <p className="max-w-xl text-pretty text-base leading-7 text-primary-foreground/75">
            ثبت‌نام لازم نیست. آگهی‌ها را مرور کنید، فیلتر بزنید، و وقتی آماده
            بودید برای هشدار لحظه‌ای ارتقا دهید.
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Button
            size="lg"
            variant="secondary"
            className="h-11 w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90 sm:w-auto"
            render={<Link href="/jobs" />}
          >
            ورود به آگهی‌ها
            <ArrowLeft className="size-4" aria-hidden="true" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-11 w-full border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground sm:w-auto"
            render={<Link href="/signup" />}
          >
            پلن پرو
          </Button>
        </div>
      </div>
    </SectionShell>
  );
}
