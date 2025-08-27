import { Text } from "recharts";

interface TickProps {
  payload: {
    value: string;
  };
  [key: string]: unknown; // Allow other props if necessary
}

export const Tick = (props: TickProps) => {
  return (
    <Text {...props} className="fill-foreground text-2xs">
      {props.payload.value}
    </Text>
  );
};
