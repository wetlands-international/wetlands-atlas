import { useMemo } from "react";

import { TransparentFrameEffect } from "./effect";

export function TransparentFrame({ borderSize }: { borderSize?: number }) {
  const effect = useMemo(() => new TransparentFrameEffect({ borderSize }), [borderSize]);
  return <primitive object={effect} />;
}
