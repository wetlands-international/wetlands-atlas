import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";
import { ContentType } from "recharts/types/component/Tooltip";

export const ChartTooltip: ContentType<ValueType, NameType> | undefined = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background rounded-md p-2 shadow-md">
        <ul>
          {payload.map((item, index) => (
            <li key={`tooltip-item-${index}`} className="text-sm">
              <p className="text-sm font-semibold">{item.payload.name}</p>
              <p className="text-muted-foreground text-xs">{`Value: ${item.value}`}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return null;
};

export const ChartLabelTooltip: ContentType<ValueType, NameType> | undefined = ({
  active,
  payload,
}) => {
  if (active && payload && payload.length) {
    return <p className="text-[10px] font-normal">{payload[0].payload.name}</p>;
  }

  return null;
};
