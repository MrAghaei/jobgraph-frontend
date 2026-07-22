const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface FieldErrors {
  email?: string;
  password?: string;
}

export function validateEmail(email: string): string | undefined {
  if (!email.trim()) return "ایمیل الزامی است.";
  if (!EMAIL_PATTERN.test(email)) return "فرمت ایمیل معتبر نیست.";
  return undefined;
}

export function validatePassword(password: string): string | undefined {
  if (!password) return "رمز عبور الزامی است.";
  if (password.length < 8) return "رمز عبور باید حداقل ۸ کاراکتر باشد.";
  return undefined;
}

export function validateLoginForm(email: string, password: string): FieldErrors {
  const errors: FieldErrors = {};
  const emailError = validateEmail(email);
  const passwordError = validatePassword(password);
  if (emailError) errors.email = emailError;
  if (passwordError) errors.password = passwordError;
  return errors;
}

export function validateRegisterForm(
  email: string,
  password: string,
): FieldErrors {
  return validateLoginForm(email, password);
}

export function hasFieldErrors(errors: FieldErrors): boolean {
  return Object.keys(errors).length > 0;
}
