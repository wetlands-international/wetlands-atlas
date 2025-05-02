import { Lexical } from "@/components/ui/lexical";
import payloadConfig from "@/payload.config";
import { getPayload } from "payload";

export const Indicators = async () => {
  const payload = await getPayload({ config: payloadConfig });

  const indicators = await payload.find({
    collection: "indicators",
    depth: 0,
    limit: 100,
    page: 1,
    sort: "-createdAt",
  });

  return (
    <div className="container">
      <div className="grid min-h-[calc(100svh_-_theme(spacing.16))]">
        <div className="flex flex-col gap-4">
          {indicators.docs.map((indicator) => (
            <div key={indicator.id}>
              <h2 className="text-sm font-semibold uppercase">{indicator.name}</h2>
              {!!indicator.description && (
                <div className="prose dark:prose-invert prose-sm">
                  <Lexical
                    data={indicator.description}
                    variables={{
                      value: "11M km²",
                      percentage: "7%",
                      location: "World",
                    }}
                  />
                </div>
              )}
              <ul>
                <li className="font-display text-2xl">60%</li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
