import { CollectionBeforeOperationHook, Where } from "payload";

import { sql } from "@payloadcms/db-postgres";

/**
 * Keeps the landscapes whose `geoLocation` point is inside a location's geometry.
 *
 * The REST SDK only sends the standard query params, so the location's ID is passed as
 * `where: { geoLocation: { within: locationId } }`. Payload's own `within` operator expects a GeoJSON object, so a
 * string value can't be mistaken for it.
 */
export const landscapesReadLocationCriteriaExtension: CollectionBeforeOperationHook = async ({
  operation,
  req,
  args,
}) => {
  if (operation !== "read" || !("where" in args) || !args.where) {
    return args;
  }

  const { geoLocation, ...where } = args.where as Where;
  const locationId = geoLocation && "within" in geoLocation ? geoLocation.within : undefined;

  if (typeof locationId !== "string") {
    return args;
  }

  interface LandscapeQueryResult {
    rows: { id: string }[];
  }

  // An unknown location matches no landscape
  const result = (await req.payload.db.drizzle.execute(sql`
    SELECT landscapes.id FROM landscapes
    JOIN locations ON ST_Within(landscapes.geo_location, locations.geometry_4326)
    WHERE locations.id = ${locationId}
  `)) as LandscapeQueryResult;

  args.where = {
    and: [where, { id: { in: result.rows.map((row) => row.id) } }],
  };

  return args;
};
