import { FC } from "react";

interface StatsBarProps {
  caption: string;
  value: number;
}

const StatsBar: FC<StatsBarProps> = ({ caption, value }) => {
  return (
    <div
      className="border-l border-white bg-[rgba(255,255,255,0.04)] p-6"
      style={{ borderLeftWidth: value * 4 }}
    >
      <figure className="space-y-2">
        <p className="text-xl font-normal" aria-label={caption}>
          {value}%
        </p>
        <figcaption className="text-base text-gray-300">{caption}</figcaption>
      </figure>
    </div>
  );
};

export default StatsBar;
