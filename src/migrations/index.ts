import * as migration_20250507_102919 from "./20250507_102919";

export const migrations = [
  {
    up: migration_20250507_102919.up,
    down: migration_20250507_102919.down,
    name: "20250507_102919",
  },
];
