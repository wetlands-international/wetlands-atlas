import { JSONFieldServerComponent } from "payload";

import { FieldDescription, FieldLabel, SectionTitle } from "@payloadcms/ui";

import { MapFieldLayers } from "@/cms/fields/map/layers";
import { MapfieldMap } from "@/cms/fields/map/map";

export const MapFieldComponent: JSONFieldServerComponent = async ({
  payload,
  clientField,
  path,
}) => {
  const layers = await payload.find({
    collection: "layers",
    depth: 0,
    limit: 100,
    sort: "name",
    locale: "en",
  });

  return (
    <>
      <FieldLabel
        label={clientField?.label || clientField?.name}
        path={path}
        required={clientField?.required}
      />
      <FieldDescription path={path} description={clientField.admin?.description} />

      <section className="flex pt-6">
        <aside className="w-1/3 shrink-0 space-y-2">
          <SectionTitle customValue="Layers" path={path} readOnly />
          <MapFieldLayers layers={layers.docs} />
        </aside>
        <div className="relative flex aspect-square grow flex-col overflow-hidden bg-[#326E82]">
          <MapfieldMap />
        </div>
      </section>
    </>
  );
};

export default MapFieldComponent;
