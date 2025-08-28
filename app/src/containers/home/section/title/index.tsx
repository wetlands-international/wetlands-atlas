import { FC, PropsWithChildren } from "react";

const Title: FC<PropsWithChildren> = ({ children }) => (
  <h2 className="text-foreground mb-9 text-4xl">{children}</h2>
);

export default Title;
