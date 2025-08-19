"use client";

import { useDebounceValue } from "usehooks-ts";

export type LoaderProps = {
  isLoading?: boolean;
};

export const Loader = ({ isLoading }: LoaderProps) => {
  const [loading] = useDebounceValue(isLoading, 250);

  if (!loading) {
    return null;
  }

  return (
    <div className="absolute top-0 left-0 h-4 w-full rounded-4xl">
      <div className="relative h-1 w-full rounded-4xl bg-transparent">
        <span className="from-accent animate-moving absolute top-0 left-0 block h-full w-0 rounded-4xl bg-gradient-to-r to-blue-500" />
      </div>
    </div>
  );
};
