import * as migration_20250520_080118 from './20250520_080118';
import * as migration_20250530_141431 from './20250530_141431';

export const migrations = [
  {
    up: migration_20250520_080118.up,
    down: migration_20250520_080118.down,
    name: '20250520_080118',
  },
  {
    up: migration_20250530_141431.up,
    down: migration_20250530_141431.down,
    name: '20250530_141431'
  },
];
