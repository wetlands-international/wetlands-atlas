import { FC } from "react";

interface EmbeddedVideoProps {
  src?: string | null;
  title?: string | null;
}
const EmbeddedVideo: FC<EmbeddedVideoProps> = ({ src, title }) => {
  return (
    <iframe
      className="aspect-video w-full"
      src={src || undefined}
      title={title || undefined}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      frameBorder="0"
      allowFullScreen
    ></iframe>
  );
};

export default EmbeddedVideo;
