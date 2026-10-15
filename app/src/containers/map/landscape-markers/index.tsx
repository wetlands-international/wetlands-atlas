import { convertLexicalToPlaintext } from "@payloadcms/richtext-lexical/plaintext";

import { useLandscapes } from "@/hooks/use-landscapes";

import LandscapeMarker from "@/containers/map/landscape-marker";

const LandscapeMarkers = () => {
  const { data: landscapes } = useLandscapes();

  return landscapes.docs.map((s) => (
    <LandscapeMarker
      key={`landscape-marker-${s.id}`}
      name={convertLexicalToPlaintext({ data: s.name })}
      location={s.geoLocation}
      href={`/landscapes/${s.id}`}
      media={s.cover && typeof s.cover === "object" ? s.cover : undefined}
    />
  ));
};

export default LandscapeMarkers;
