import { LucideMapPin } from "lucide-react";

export const Search = () => {
  return (
    <div className="flex h-16 w-full items-center justify-center gap-2 p-2">
      <div className="bg-primary flex size-12 shrink-0 items-center justify-center rounded-full">
        <LucideMapPin className="h-4 w-4 text-white" />
      </div>
      <span className="w-full">Worldwide</span>
    </div>
  );
};
