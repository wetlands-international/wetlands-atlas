/**
 * Consistency checks across the seed files, run before the seed writes anything. Every check reports all of its
 * failures, so one run lists everything to fix in the files.
 */
import { LOCATION_TYPE } from "../../src/cms/collections/Location";
import { hasRegionPrefix } from "../../src/lib/region-ids";

import { SeedError, type SeedFiles } from "./files";

const duplicatesOf = (values: string[]) => {
  const seenValues = new Set<string>();
  const duplicates = new Set<string>();

  for (const value of values) {
    if (seenValues.has(value)) {
      duplicates.add(value);
    }

    seenValues.add(value);
  }

  return [...duplicates];
};

const checkUniqueIds = (seedFiles: SeedFiles) => {
  const errors: string[] = [];

  for (const [collectionName, records] of Object.entries(seedFiles)) {
    for (const duplicateId of duplicatesOf(records.map((record) => record.id))) {
      errors.push(`${collectionName}: duplicate ID '${duplicateId}'`);
    }
  }

  return errors;
};

const checkReferences = (seedFiles: SeedFiles) => {
  const errors: string[] = [];
  const regionIds = new Set(seedFiles.regions.map((region) => region.id));
  const locationIds = new Set(seedFiles.locations.map((location) => location.id));
  const categoryIds = new Set(seedFiles.categories.map((category) => category.id));
  const indicatorsById = new Map(
    seedFiles.indicators.map((indicator) => [indicator.id, indicator]),
  );

  for (const location of seedFiles.locations) {
    if (!regionIds.has(location.region)) {
      errors.push(`location '${location.id}': unknown region '${location.region}'`);
    }

    if (location.parent !== null && !locationIds.has(location.parent)) {
      errors.push(`location '${location.id}': unknown parent '${location.parent}'`);
    }
  }

  for (const category of seedFiles.categories) {
    if (!regionIds.has(category.region)) {
      errors.push(`category '${category.id}': unknown region '${category.region}'`);
    }

    for (const indicatorId of category.defaultIndicators) {
      const indicator = indicatorsById.get(indicatorId);

      if (!indicator) {
        errors.push(`category '${category.id}': unknown default indicator '${indicatorId}'`);
      } else if (indicator.category !== category.id) {
        errors.push(
          `category '${category.id}': default indicator '${indicatorId}' belongs to '${indicator.category}'`,
        );
      }
    }
  }

  for (const indicator of seedFiles.indicators) {
    if (!categoryIds.has(indicator.category)) {
      errors.push(`indicator '${indicator.id}': unknown category '${indicator.category}'`);
    }
  }

  for (const indicatorDataRecord of seedFiles.indicatorData) {
    if (!indicatorsById.has(indicatorDataRecord.indicator)) {
      errors.push(
        `indicator data '${indicatorDataRecord.id}': unknown indicator '${indicatorDataRecord.indicator}'`,
      );
    }

    if (!locationIds.has(indicatorDataRecord.location)) {
      errors.push(
        `indicator data '${indicatorDataRecord.id}': unknown location '${indicatorDataRecord.location}'`,
      );
    }
  }

  return errors;
};

/** The unique index of the locations table, and a parent chain that must end */
const checkLocationKeys = (seedFiles: SeedFiles) => {
  const errors: string[] = [];
  const uniqueKeys = seedFiles.locations.map(
    (location) => `${location.region}/${location.type}/${location.code}`,
  );

  for (const duplicateKey of duplicatesOf(uniqueKeys)) {
    errors.push(`locations: several locations with region/type/code '${duplicateKey}'`);
  }

  const parentById = new Map(seedFiles.locations.map((location) => [location.id, location.parent]));

  for (const location of seedFiles.locations) {
    const ancestorIds = new Set<string>();

    for (let parentId = location.parent; parentId; parentId = parentById.get(parentId) ?? null) {
      if (ancestorIds.has(parentId) || parentId === location.id) {
        errors.push(`location '${location.id}': its parents loop through '${parentId}'`);
        break;
      }

      ancestorIds.add(parentId);
    }
  }

  return errors;
};

/** The indicator and the location of an indicator-data row must belong to the same region */
const checkIndicatorDataRegions = (seedFiles: SeedFiles) => {
  const errors: string[] = [];
  const regionByCategory = new Map(
    seedFiles.categories.map((category) => [category.id, category.region]),
  );
  const regionByIndicator = new Map(
    seedFiles.indicators.map((indicator) => [
      indicator.id,
      regionByCategory.get(indicator.category),
    ]),
  );
  const regionByLocation = new Map(
    seedFiles.locations.map((location) => [location.id, location.region]),
  );

  for (const indicatorDataRecord of seedFiles.indicatorData) {
    const indicatorRegion = regionByIndicator.get(indicatorDataRecord.indicator);
    const locationRegion = regionByLocation.get(indicatorDataRecord.location);

    if (indicatorRegion && locationRegion && indicatorRegion !== locationRegion) {
      errors.push(
        `indicator data '${indicatorDataRecord.id}': indicator region '${indicatorRegion}' differs from location region '${locationRegion}'`,
      );
    }
  }

  return errors;
};

/** A published region has exactly one global location; an unpublished one, such as `other`, has no location at all */
const checkGlobalLocations = (seedFiles: SeedFiles) => {
  const errors: string[] = [];

  for (const region of seedFiles.regions) {
    const regionLocations = seedFiles.locations.filter((location) => location.region === region.id);
    const globalLocations = regionLocations.filter(
      (location) => location.type === LOCATION_TYPE.GLOBAL,
    );

    if (!region.published && regionLocations.length > 0) {
      errors.push(
        `region '${region.id}': unpublished, but has ${regionLocations.length} locations`,
      );
    } else if (region.published && globalLocations.length !== 1) {
      errors.push(
        `region '${region.id}': expected one global location, found ${globalLocations.map((location) => location.id).join(", ") || "none"}`,
      );
    }
  }

  return errors;
};

/**
 * IDs carry their region (WM-100): `{region}-{slug}` for categories and indicators, `{region}_{type}_{code}` for
 * locations, and `{prefix}-{location id}` or `{region}-{slug}` for indicator data.
 */
const checkIdPrefixes = (seedFiles: SeedFiles) => {
  const errors: string[] = [];
  const regionByCategory = new Map(
    seedFiles.categories.map((category) => [category.id, category.region]),
  );
  const regionByLocation = new Map(
    seedFiles.locations.map((location) => [location.id, location.region]),
  );

  for (const location of seedFiles.locations) {
    if (!hasRegionPrefix(location.id, location.region, "location")) {
      errors.push(`location '${location.id}': ID must start with '${location.region}_'`);
    }
  }

  for (const category of seedFiles.categories) {
    if (!hasRegionPrefix(category.id, category.region, "category")) {
      errors.push(`category '${category.id}': ID must start with '${category.region}-'`);
    }
  }

  for (const indicator of seedFiles.indicators) {
    const indicatorRegion = regionByCategory.get(indicator.category);

    if (indicatorRegion && !hasRegionPrefix(indicator.id, indicatorRegion, "indicator")) {
      errors.push(`indicator '${indicator.id}': ID must start with '${indicatorRegion}-'`);
    }
  }

  for (const indicatorDataRecord of seedFiles.indicatorData) {
    const locationRegion = regionByLocation.get(indicatorDataRecord.location);

    if (
      locationRegion &&
      !indicatorDataRecord.id.endsWith(`-${indicatorDataRecord.location}`) &&
      !hasRegionPrefix(indicatorDataRecord.id, locationRegion, "indicator")
    ) {
      errors.push(
        `indicator data '${indicatorDataRecord.id}': ID must end with '-${indicatorDataRecord.location}' or start with '${locationRegion}-'`,
      );
    }
  }

  return errors;
};

const checkCategoryNames = (seedFiles: SeedFiles) => {
  const errors: string[] = [];
  const categoryNamesByRegion = new Map<string, string[]>();

  for (const category of seedFiles.categories) {
    categoryNamesByRegion.set(category.region, [
      ...(categoryNamesByRegion.get(category.region) ?? []),
      category.name,
    ]);
  }

  for (const [region, categoryNames] of categoryNamesByRegion) {
    for (const duplicateName of duplicatesOf(categoryNames)) {
      errors.push(`region '${region}': several categories named '${duplicateName}'`);
    }
  }

  return errors;
};

/** The covers are media filenames; the images must be uploaded in the CMS before the seed runs */
const checkCovers = (seedFiles: SeedFiles, mediaFilenames: Set<string>) => {
  const errors: string[] = [];

  for (const region of seedFiles.regions) {
    if (region.cover !== null && !mediaFilenames.has(region.cover)) {
      errors.push(`region '${region.id}': cover '${region.cover}' is not in the media collection`);
    }
  }

  for (const category of seedFiles.categories) {
    if (category.cover !== null && !mediaFilenames.has(category.cover)) {
      errors.push(
        `category '${category.id}': cover '${category.cover}' is not in the media collection`,
      );
    }
  }

  return errors;
};

/** Every inconsistency of the seed files, given the `filename`s of the media collection. Empty when they are valid. */
export const validateSeedFiles = (seedFiles: SeedFiles, mediaFilenames: Set<string>) => [
  ...checkUniqueIds(seedFiles),
  ...checkReferences(seedFiles),
  ...checkLocationKeys(seedFiles),
  ...checkIndicatorDataRegions(seedFiles),
  ...checkGlobalLocations(seedFiles),
  ...checkIdPrefixes(seedFiles),
  ...checkCategoryNames(seedFiles),
  ...checkCovers(seedFiles, mediaFilenames),
];

export const assertValidSeedFiles = (seedFiles: SeedFiles, mediaFilenames: Set<string>) => {
  const errors = validateSeedFiles(seedFiles, mediaFilenames);

  if (errors.length > 0) {
    throw new SeedError(`Invalid seed files:\n${errors.map((error) => `  - ${error}`).join("\n")}`);
  }
};
