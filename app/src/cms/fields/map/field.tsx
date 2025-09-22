import { JSONFieldServerComponent } from "payload";

import { FieldDescription, FieldLabel } from "@payloadcms/ui";

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

      <section className="flex aspect-square overflow-hidden pt-6 xl:aspect-video">
        <aside className="bg-background relative z-0 w-1/3 max-w-md shrink-0 overflow-auto px-4 pb-4 shadow-2xl">
          <h2 className="from-background sticky top-0 bg-gradient-to-b to-transparent py-4 text-2xl text-white">
            Layers
          </h2>
          <MapFieldLayers layers={layers.docs} />
        </aside>

        <div className="relative flex w-2/3 grow flex-col overflow-hidden bg-[#326E82]">
          <MapfieldMap layers={layers.docs} />
        </div>
      </section>
    </>
  );
};

export default MapFieldComponent;
