import { HookOperationType, PayloadRequest, RequestContext } from "payload";
import { CollectionBeforeOperationHook } from "payload";

import { sql } from "@payloadcms/db-postgres";

export const landscapesReadLocationCriteriaExtension: CollectionBeforeOperationHook = async ({
  operation,
  req,
  args,
}: {
  operation: HookOperationType;
  req: PayloadRequest;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  args?: any;
  context?: RequestContext;
}) => {
  if (operation !== "read") {
    return;
  }

  const locationId = req?.query?.locationId; // should be included as a query parameter
  if (!locationId || typeof locationId !== "string") {
    // No locationId provided, skip the extra geospatial query
    return;
  }

  const location = await req.payload.findByID({
    collection: "locations",
    id: locationId,
  });

  if (!location?.geometry) {
    return;
  }

  interface LandscapeQueryResult {
    rows: { id: string }[];
  }
  // Query the database to find landscapes that have a location within the specified geometry
  const result = (await req.payload.db.drizzle.execute(sql`
          SELECT s.id FROM landscapes s
          WHERE EXISTS (
              SELECT 1 FROM locations l
              WHERE l.id = '${location.id}' AND ST_Within(s.location,l.geometry_4326)
          )
        `)) as LandscapeQueryResult;

  const landscapesIDs = result.rows.map((row) => row.id);

  //Add the landscapes within the specified location to the query
  args.where = {
    ...args.where,
    id: {
      in: landscapesIDs,
    },
  };

  return args;
};
