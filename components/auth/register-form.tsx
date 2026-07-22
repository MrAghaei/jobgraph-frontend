"use client";

import Link from "next/link";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { GoogleButton } from "@/components/auth/google-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ApiError, register } from "@/lib/api-client";
import {
  hasFieldErrors,
  validateRegisterForm,
  type FieldErrors,
} from "@/lib/auth-validation";

export function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") ?? "/pro/analytics";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    const errors = validateRegisterForm(email, password);
    setFieldErrors(errors);
    if (hasFieldErrors(errors)) return;

    setIsSubmitting(true);
    try {
      await register(email.trim(), password);
      router.replace(redirectTo);
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.fieldErrors) {
          setFieldErrors((prev) => ({ ...prev, ...error.fieldErrors }));
        }
        setFormError(error.message);
      } else {
        setFormError("ثبت‌نام ناموفق بود. دوباره تلاش کنید.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div className="space-y-2">
          <Label htmlFor="register-email">ایمیل</Label>
          <Input
            id="register-email"
            type="email"
            autoComplete="email"
            inputMode="email"
            dir="ltr"
            placeholder="you@example.com"
            value={email}
            aria-invalid={Boolean(fieldErrors.email)}
            aria-describedby={
              fieldErrors.email ? "register-email-error" : undefined
            }
            disabled={isSubmitting}
            onChange={(event) => setEmail(event.target.value)}
          />
          {fieldErrors.email ? (
            <p id="register-email-error" className="text-xs text-destructive">
              {fieldErrors.email}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="register-password">رمز عبور</Label>
          <Input
            id="register-password"
            type="password"
            autoComplete="new-password"
            dir="ltr"
            value={password}
            aria-invalid={Boolean(fieldErrors.password)}
            aria-describedby={
              fieldErrors.password ? "register-password-error" : undefined
            }
            disabled={isSubmitting}
            onChange={(event) => setPassword(event.target.value)}
          />
          {fieldErrors.password ? (
            <p id="register-password-error" className="text-xs text-destructive">
              {fieldErrors.password}
            </p>
          ) : (
            <p className="text-xs text-muted-foreground">حداقل ۸ کاراکتر</p>
          )}
        </div>

        {formError ? (
          <p
            role="alert"
            className="rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive"
          >
            {formError}
          </p>
        ) : null}

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin" />
              در حال ثبت‌نام...
            </>
          ) : (
            "ثبت‌نام"
          )}
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">یا</span>
        </div>
      </div>

      <GoogleButton redirectTo={redirectTo} />

      <p className="text-center text-sm text-muted-foreground">
        قبلاً ثبت‌نام کرده‌اید؟{" "}
        <Link
          href={`/login${redirectTo !== "/pro/analytics" ? `?redirect=${encodeURIComponent(redirectTo)}` : ""}`}
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          ورود
        </Link>
      </p>
    </div>
  );
}
