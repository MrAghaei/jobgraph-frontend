import { cn } from "@/lib/utils";

type SectionShellProps = {
  id?: string;
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  tone?: "default" | "muted" | "ink";
};

export function SectionShell({
  id,
  children,
  className,
  innerClassName,
  tone = "default",
}: SectionShellProps) {
  return (
    <section
      id={id}
      className={cn(
        "px-4 sm:px-6 lg:px-8",
        tone === "default" && "bg-background",
        tone === "muted" && "bg-secondary/50",
        tone === "ink" && "bg-primary text-primary-foreground",
        className
      )}
    >
      <div
        className={cn("mx-auto w-full max-w-6xl py-20 md:py-28", innerClassName)}
      >
        {children}
      </div>
    </section>
  );
}
