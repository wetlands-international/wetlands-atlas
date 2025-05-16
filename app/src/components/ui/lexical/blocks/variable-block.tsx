export type VariableBlockProps = {
  slug: string;
  variables?: Record<string, string | number | boolean>;
};

export const VariableBlock = ({ slug, variables = {} }: VariableBlockProps) => {
  return <strong className="inline-block">{variables[slug] ?? slug}</strong>;
};
