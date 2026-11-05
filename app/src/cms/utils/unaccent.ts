import { sql, type postgresAdapter } from "@payloadcms/db-postgres";

import type { Column, SQL } from "drizzle-orm";

type PostgresAdapterResult = ReturnType<typeof postgresAdapter>;

type Operator = (column: Column, value: unknown) => SQL;

/**
 * The text operators of the Postgres adapter, made accent-insensitive so that searching "cote" finds "Côte d'Ivoire".
 * Payload maps them to `ILIKE`, which ignores the case but not the accents. Both sides are cast to text because
 * `unaccent()` only takes text, which `ILIKE` already requires.
 */
export const unaccentOperators = {
  contains: (column, value) => sql`unaccent(${column}::text) ilike unaccent(${value}::text)`,
  like: (column, value) => sql`unaccent(${column}::text) ilike unaccent(${value}::text)`,
  not_like: (column, value) => sql`unaccent(${column}::text) not ilike unaccent(${value}::text)`,
} satisfies Record<string, Operator>;

/**
 * Replaces the text operators of the adapter with `unaccentOperators`. The `unaccent` extension must be listed in the
 * adapter's `extensions`. Payload 4 ships the same behaviour as the `postgresUnaccent()` preset, which this should
 * give way to on upgrade: Payload 3 has no option for it, so this overrides `operators`, an internal property.
 */
export const withUnaccent = (adapterResult: PostgresAdapterResult): PostgresAdapterResult => ({
  ...adapterResult,
  init: (args) => {
    const adapter = adapterResult.init(args);

    // Fail at start-up rather than silently search with the accents if a Payload update renames the property
    if (typeof adapter.operators?.like !== "function") {
      throw new Error("The Postgres adapter has no `operators.like` to make accent-insensitive");
    }

    adapter.operators = { ...adapter.operators, ...unaccentOperators };

    return adapter;
  },
});
