export type InlineVariableProps = {
  slug: string;
  variables?: Record<string, string | number | boolean>;
};

export const InlineVariable = ({ slug, variables = {} }: InlineVariableProps) => {
  return <strong className="inline-block">{variables[slug] ?? slug}</strong>;
};
