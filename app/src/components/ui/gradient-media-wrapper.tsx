import { FC, PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

interface GradientMediaWrapperProps {
  className?: string;
}

export const GradientMediaWrapper: FC<PropsWithChildren<GradientMediaWrapperProps>> = ({
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        "w-full rounded-2xl bg-gradient-to-t from-[#D5EB4E] to-[#5AC4C6] p-0.5 shadow-[0_0_20px_rgba(90,196,198,0.2)] transition-all duration-500",
        className,
      )}
    >
      <div className="overflow-hidden rounded-[14px] transition-transform duration-300 hover:scale-[1.02]">
        {children}
      </div>
    </div>
  );
};
