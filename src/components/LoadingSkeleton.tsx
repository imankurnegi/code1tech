import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

interface LoadingSkeletonProps {
  type?: "card" | "hero" | "list" | "text";
  count?: number;
}

export default function LoadingSkeleton({
  type = "card",
  count = 1,
}: LoadingSkeletonProps) {
  const renderSkeleton = () => {
    switch (type) {
      case "hero":
        return (
          <div className="space-y-6">
            <Skeleton className="h-10 w-2/3" />
            <Skeleton className="h-5 w-1/2" />
            <Skeleton className="h-40 w-full rounded-xl" />
          </div>
        );

      case "list":
        return (
          <div className="space-y-4">
            {Array.from({ length: count }).map((_, i) => (
              <div
                key={i}
                className="rounded-xl border border-border/40 bg-[rgba(255,255,255,0.03)] p-6 animate-pulse"
              >
                <div className="mb-4 h-5 w-2/3 rounded bg-muted/30" />

                <div className="flex gap-3">
                  <div className="h-4 w-24 rounded bg-muted/20" />
                  <div className="h-4 w-20 rounded bg-muted/20" />
                  <div className="h-4 w-28 rounded bg-muted/20" />
                </div>
              </div>
            ))}
          </div>
        );

      case "text":
        return (
          <div className="space-y-3">
            {Array.from({ length: count }).map((_, i) => (
              <Skeleton
                key={i}
                className={i % 3 === 0 ? "h-4 w-3/4" : "h-4 w-full"}
              />
            ))}
          </div>
        );

      case "card":
      default:
        return (
          <div className="grid gap-5">
            {Array.from({ length: count }).map((_, i) => (
              <Card key={i} className="rounded-xl">
                <CardContent className="space-y-4 p-6">
                  <Skeleton className="h-6 w-2/3" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                </CardContent>
              </Card>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="min-h-[calc(100vh-72px)] w-full px-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl py-32">
        <div className="relative">
          {/* Skeleton */}
          <div className="opacity-60">
            {renderSkeleton()}
          </div>

          {/* Loading overlay */}
          <div className="absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-background/20 backdrop-blur-[2px]">
            <div className="flex flex-col items-center gap-3">
              <div className="h-20 w-20 animate-spin rounded-full border-[3px] border-muted/30 border-t-primary" />

              <span className="text-sm text-muted-foreground">
                Loading...
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}