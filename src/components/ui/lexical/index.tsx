import React, { HTMLAttributes, JSX } from "react";
import { JSXConverters, JSXConvertersFunction, RichText } from "@payloadcms/richtext-lexical/react";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import { DefaultNodeTypes, SerializedInlineBlockNode } from "@payloadcms/richtext-lexical";
import { VariableBlock } from "@/components/ui/lexical/blocks/variable-block";
import { NumberBlock } from "@/components/ui/lexical/blocks/number-block";

export type LexicalProps = {
  variables?: Record<string, number | string | boolean>;
  /**
   * Override class names for the container.
   */
  className?: string;
  /**
   * Custom converters to transform your nodes to JSX. Can be an object or a function that receives the default converters.
   */
  converters?: JSXConverters | JSXConvertersFunction;
  /**
   * Serialized editor state to render.
   */
  data: SerializedEditorState;
  /**
   * If true, removes the container div wrapper.
   */
  disableContainer?: boolean;
  /**
   * If true, disables indentation globally. If an array, disables for specific node `type` values.
   */
  disableIndent?: boolean | string[];
  /**
   * If true, disables text alignment globally. If an array, disables for specific node `type` values.
   */
  disableTextAlign?: boolean | string[];
} & HTMLAttributes<HTMLDivElement>;

export const Lexical = (props: LexicalProps) => {
  if (!props.data) {
    return null;
  }

  const jsxConverters: JSXConvertersFunction<DefaultNodeTypes> = ({ defaultConverters }) => ({
    ...defaultConverters,
    blocks: {},
    inlineBlocks: {
      number: ({
        node,
      }: {
        node: SerializedInlineBlockNode<{
          variable: string;
          format: "number" | "percentage";
        }>;
      }) => <NumberBlock {...node} variables={props.variables} />,

      ...Object.keys(props.variables ?? {}).reduce(
        (acc, key) => {
          acc[key] = () => <VariableBlock slug={key} variables={props.variables} />;
          return acc;
        },
        {} as Record<string, () => JSX.Element>,
      ),
    },
    ...props.converters,
  });

  return <RichText {...props} converters={jsxConverters} />;
};
