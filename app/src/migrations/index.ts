import * as migration_20250516_082322 from './20250516_082322';

export const migrations = [
  {
    up: migration_20250516_082322.up,
    down: migration_20250516_082322.down,
    name: '20250516_082322'
  },
];
