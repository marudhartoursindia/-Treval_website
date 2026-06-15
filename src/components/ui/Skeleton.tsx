import { cn } from "@/lib/utils";

export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("shimmer rounded-none bg-[var(--border-color)]", className)}
      {...props}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="border border-[var(--border-color)] bg-[var(--card-bg)] overflow-hidden">
      <Skeleton className="h-56 w-full" />
      <div className="p-6 space-y-4">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <div className="flex justify-between items-center pt-4 border-t border-[var(--border-color)]">
          <Skeleton className="h-6 w-1/4" />
          <Skeleton className="h-8 w-1/3" />
        </div>
      </div>
    </div>
  );
}
