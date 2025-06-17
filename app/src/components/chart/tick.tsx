import { Text } from "recharts";

interface TickProps {
  payload: {
    value: string;
  };
  [key: string]: unknown; // Allow other props if necessary
}

export const Tick = (props: TickProps) => {
  return (
    <Text {...props} className="fill-muted-foreground text-[10px]">
      {props.payload.value}
    </Text>
  );
};
