import * as migration_20250520_080118 from './20250520_080118';

export const migrations = [
  {
    up: migration_20250520_080118.up,
    down: migration_20250520_080118.down,
    name: '20250520_080118'
  },
];
