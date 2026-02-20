import React, { HTMLAttributes, JSX } from "react";

import {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedInlineBlockNode,
  SerializedListNode,
} from "@payloadcms/richtext-lexical";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import { JSXConverters, JSXConvertersFunction, RichText } from "@payloadcms/richtext-lexical/react";

import EmbeddedVideo from "@/components/embedded-video";
import { NumberBlock } from "@/components/ui/lexical/blocks/number-block";
import { VariableBlock } from "@/components/ui/lexical/blocks/variable-block";
import { CustomUploadComponent } from "@/components/ui/lexical/converters/upload";

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
    upload: ({ node }) => <CustomUploadComponent node={node} />, // Use custom upload component
    list: (args: unknown) => {
      const node = (args as { node?: SerializedListNode }).node;
      const nodesToJSX = (
        args as {
          nodesToJSX?: (a: { nodes: unknown[] }) => React.ReactNode[];
        }
      ).nodesToJSX;
      if (node?.type === "list" && node?.listType === "bullet") {
        return nodesToJSX ? (
          <ul className="list-disc pl-4">
            {nodesToJSX({ nodes: (node.children as unknown[]) || [] })}
          </ul>
        ) : null;
      }

      const base = defaultConverters.list as unknown;
      return typeof base === "function"
        ? (base as (a: unknown) => React.ReactNode)(args)
        : (base as React.ReactNode);
    },
    blocks: {
      videoEmbed: ({
        node,
      }: {
        node: SerializedBlockNode<{
          blockType: "videoEmbed";
          type: string;
          source: string;
          title: string;
        }>;
      }) => <EmbeddedVideo src={node.fields.source} title={node.fields.title} />,
    },
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
