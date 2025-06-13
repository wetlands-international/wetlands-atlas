import * as migration_20250520_080118 from './20250520_080118';
import * as migration_20250530_141431 from './20250530_141431';
import * as migration_20250602_094758 from './20250602_094758';
import * as migration_20250613_090308 from './20250613_090308';

export const migrations = [
  {
    up: migration_20250520_080118.up,
    down: migration_20250520_080118.down,
    name: '20250520_080118',
  },
  {
    up: migration_20250530_141431.up,
    down: migration_20250530_141431.down,
    name: '20250530_141431',
  },
  {
    up: migration_20250602_094758.up,
    down: migration_20250602_094758.down,
    name: '20250602_094758',
  },
  {
    up: migration_20250613_090308.up,
    down: migration_20250613_090308.down,
    name: '20250613_090308'
  },
];
