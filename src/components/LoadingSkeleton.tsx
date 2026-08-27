export default function LoadingSkeleton() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center gap-3">
        <div className="h-20 w-20 animate-spin rounded-full border-[3px] border-muted/30 border-t-primary" />

        <span className="text-sm text-muted-foreground">
          Loading...
        </span>
      </div>
    </div>
  );
}