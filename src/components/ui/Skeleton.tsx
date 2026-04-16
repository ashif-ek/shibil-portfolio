import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg bg-muted border border-border/50",
        "before:absolute before:inset-0 before:z-10 before:animate-shimmer before:content-['']",
        className
      )}
      {...props}
    />
  );
}
