import { FC, PropsWithChildren } from "react";

const Kicker: FC<PropsWithChildren> = ({ children }) => (
  <h3 className="text-muted-foreground mb-2 text-sm font-bold uppercase">{children}</h3>
);

export default Kicker;
