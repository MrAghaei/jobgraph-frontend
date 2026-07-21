import type { Metadata } from "next";
import { Geist_Mono, Vazirmatn, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "جاب‌گراف — آگهی‌های تکنولوژی و تحلیل بازار کار",
  description:
    "همه آگهی‌های تکنولوژی در یک جا. جستجو، فیلتر و تحلیل بازار کار ایران برای مهندسان نرم‌افزار.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={cn(
        "h-full antialiased",
        inter.variable,
        geistMono.variable,
        vazirmatn.variable,
        "font-sans",
      )}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
