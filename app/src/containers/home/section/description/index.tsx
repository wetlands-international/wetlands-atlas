import { FC, PropsWithChildren } from "react";

const Description: FC<PropsWithChildren> = ({ children }) => (
  <div className="space-y-4 text-xl leading-snug">{children}</div>
);

export default Description;
