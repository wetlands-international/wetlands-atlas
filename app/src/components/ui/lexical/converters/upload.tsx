import Image from "next/image";

import { SerializedUploadNode } from "@payloadcms/richtext-lexical";

// Custom upload converter component that uses next/image
export const CustomUploadComponent: React.FC<{
  node: SerializedUploadNode;
  className?: string;
}> = ({ node, className }) => {
  if (node.relationTo === "media") {
    const uploadDoc = node.value;
    if (typeof uploadDoc !== "object") {
      return null;
    }
    const { alt, height, url, width } = uploadDoc;

    if (!url || !width || !height) {
      return null;
    }

    return (
      <div className={className}>
        <Image alt={alt} height={height} src={url} width={width} />
      </div>
    );
  }

  return null;
};
