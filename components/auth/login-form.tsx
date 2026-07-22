"use client";

import Link from "next/link";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { GoogleButton } from "@/components/auth/google-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ApiError, login } from "@/lib/api-client";
import {
  hasFieldErrors,
  validateLoginForm,
  type FieldErrors,
} from "@/lib/auth-validation";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") ?? "/jobs";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    const errors = validateLoginForm(email, password);
    setFieldErrors(errors);
    if (hasFieldErrors(errors)) return;

    setIsSubmitting(true);
    try {
      await login(email.trim(), password);
      router.replace(redirectTo);
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.fieldErrors) {
          setFieldErrors((prev) => ({ ...prev, ...error.fieldErrors }));
        }
        setFormError(error.message);
      } else {
        setFormError("ورود ناموفق بود. دوباره تلاش کنید.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div className="space-y-2">
          <Label htmlFor="login-email">ایمیل</Label>
          <Input
            id="login-email"
            type="email"
            autoComplete="email"
            inputMode="email"
            dir="ltr"
            placeholder="you@example.com"
            value={email}
            aria-invalid={Boolean(fieldErrors.email)}
            aria-describedby={fieldErrors.email ? "login-email-error" : undefined}
            disabled={isSubmitting}
            onChange={(event) => setEmail(event.target.value)}
          />
          {fieldErrors.email ? (
            <p id="login-email-error" className="text-xs text-destructive">
              {fieldErrors.email}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="login-password">رمز عبور</Label>
          <Input
            id="login-password"
            type="password"
            autoComplete="current-password"
            dir="ltr"
            value={password}
            aria-invalid={Boolean(fieldErrors.password)}
            aria-describedby={
              fieldErrors.password ? "login-password-error" : undefined
            }
            disabled={isSubmitting}
            onChange={(event) => setPassword(event.target.value)}
          />
          {fieldErrors.password ? (
            <p id="login-password-error" className="text-xs text-destructive">
              {fieldErrors.password}
            </p>
          ) : null}
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
              در حال ورود...
            </>
          ) : (
            "ورود"
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
        حساب ندارید؟{" "}
        <Link
          href={`/signup${redirectTo !== "/jobs" ? `?redirect=${encodeURIComponent(redirectTo)}` : ""}`}
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          ثبت‌نام
        </Link>
      </p>
    </div>
  );
}
