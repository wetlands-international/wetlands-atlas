import { useSyncLocation, useSyncRegion } from "@/app/(frontend)/[locale]/(app)/store";

import { useGlobalLocation } from "@/hooks/use-global-locations";

/**
 * Returns the selected location or, if there is none, the current region's global location
 */
export const useLocationId = () => {
  const [region] = useSyncRegion();
  const [location] = useSyncLocation();
  const globalLocation = useGlobalLocation(region);

  return location ?? globalLocation?.id;
};
