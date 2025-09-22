import { Text } from "recharts";

import { formatNumber } from "@/lib/formats";

interface TickProps {
  payload: {
    value: string;
  };
  [key: string]: unknown; // Allow other props if necessary
}

export const Tick = (props: TickProps) => {
  return (
    <Text {...props} className="fill-foreground text-2xs">
      {formatNumber(+props.payload.value, {
        notation: "compact",
        maximumFractionDigits: 2,
      })}
    </Text>
  );
};
