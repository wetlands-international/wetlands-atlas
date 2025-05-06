import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <div className="container">
      <div className="flex flex-col gap-4">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-10 w-2/3" />
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-10 w-2/3" />
      </div>
    </div>
  );
}
