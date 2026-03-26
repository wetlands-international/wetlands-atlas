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
        "w-full rounded-2xl bg-gradient-to-r from-[rgba(133,148,157,0)] via-[#85949D] to-[rgba(133,148,157,0)] p-px",
        className,
      )}
    >
      <div className="overflow-hidden rounded-[14px] [&_img]:m-0">
        {children}
      </div>
    </div>
  );
};
