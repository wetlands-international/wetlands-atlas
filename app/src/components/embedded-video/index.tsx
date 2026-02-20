import { FC } from "react";

function toYouTubeEmbedUrl(url: string): string {
  try {
    const parsed = new URL(url);
    // Already an embed URL
    if (parsed.pathname.startsWith("/embed/")) return url;
    // https://www.youtube.com/watch?v=VIDEO_ID
    if (parsed.hostname.includes("youtube.com") && parsed.searchParams.has("v")) {
      return `https://www.youtube.com/embed/${parsed.searchParams.get("v")}`;
    }
    // https://youtu.be/VIDEO_ID
    if (parsed.hostname === "youtu.be" && parsed.pathname.length > 1) {
      return `https://www.youtube.com/embed${parsed.pathname}`;
    }
  } catch {
    // Invalid URL, return as-is
  }
  return url;
}

interface EmbeddedVideoProps {
  src?: string | null;
  title?: string | null;
}
const EmbeddedVideo: FC<EmbeddedVideoProps> = ({ src, title }) => {
  const embedSrc = src ? toYouTubeEmbedUrl(src) : undefined;
  return (
    <iframe
      className="aspect-video w-full"
      src={embedSrc}
      title={title || undefined}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      frameBorder="0"
      allowFullScreen
    ></iframe>
  );
};

export default EmbeddedVideo;
