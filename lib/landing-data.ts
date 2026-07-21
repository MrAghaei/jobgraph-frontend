export function formatFaNumber(value: number): string {
  return value.toLocaleString("fa-IR");
}

export const sources = [
  { name: "جابینجا", slug: "jobinja" },
  { name: "جاب‌ویژن", slug: "jobvision" },
  { name: "کوئرا", slug: "quera" },
  { name: "لینکدین", slug: "linkedin" },
] as const;

export const heroJobs = [
  {
    id: "jg-4821",
    title: "توسعه‌دهنده فرانت‌اند",
    company: "دیجی‌کالا",
    location: "تهران · دورکاری",
    tags: ["React", "TypeScript"],
    posted: "۲ ساعت پیش",
    salary: "۴۵–۶۵M",
  },
  {
    id: "jg-4819",
    title: "مهندس بک‌اند",
    company: "اسنپ",
    location: "تهران · هیبرید",
    tags: ["NestJS", "PostgreSQL"],
    posted: "۴ ساعت پیش",
    salary: "۵۰–۷۰M",
  },
  {
    id: "jg-4814",
    title: "DevOps Engineer",
    company: "تپسی",
    location: "دورکاری",
    tags: ["Docker", "Kubernetes"],
    posted: "امروز",
    salary: "۵۵–۸۰M",
  },
] as const;

export const marketStats = {
  activeJobs: 1247,
  updatedMinutesAgo: 12,
  topSkills: [
    { name: "React", share: 34 },
    { name: "Python", share: 28 },
    { name: "Node.js", share: 24 },
    { name: "TypeScript", share: 22 },
    { name: "Docker", share: 18 },
  ],
  remoteShare: 41,
  newToday: 86,
} as const;

export const steps = [
  {
    title: "جستجو بدون مانع",
    description:
      "بدون ثبت‌نام شروع کنید. نقش، شهر، نوع همکاری و مهارت را فیلتر کنید و فقط آگهی‌های مرتبط را ببینید.",
  },
  {
    title: "داده‌ای که تصمیم می‌گیرد",
    description:
      "عنوان، شرکت، سطح تجربه و مهارت‌ها از متن آگهی استخراج می‌شوند — نه فقط یک لیست خام.",
  },
  {
    title: "هشدار قبل از بقیه",
    description:
      "در پلن پرو، آگهی‌های منطبق با معیار شما ظرف چند دقیقه در تلگرام یا ایمیل می‌رسند.",
  },
] as const;
