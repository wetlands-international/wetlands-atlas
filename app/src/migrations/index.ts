import * as migration_20250520_080118 from './20250520_080118';
import * as migration_20250530_141431 from './20250530_141431';
import * as migration_20250602_094758 from './20250602_094758';
import * as migration_20250613_103816 from './20250613_103816';
import * as migration_20250619_081526 from './20250619_081526';
import * as migration_20250627_093746 from './20250627_093746';
import * as migration_20250702_150156 from './20250702_150156';
import * as migration_20250715_104039_add_embedded_video_to_stories from './20250715_104039_add_embedded_video_to_stories';
import * as migration_20250722_163655_add_sizes_to_media from './20250722_163655_add_sizes_to_media';
import * as migration_20250805_091012 from './20250805_091012';
import * as migration_20250819_154345 from './20250819_154345';
import * as migration_20250820_091116_add_user_sessions_table from './20250820_091116_add_user_sessions_table';
import * as migration_20250822_164446 from './20250822_164446';
import * as migration_20250826_141750 from './20250826_141750';

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
    up: migration_20250613_103816.up,
    down: migration_20250613_103816.down,
    name: '20250613_103816',
  },
  {
    up: migration_20250619_081526.up,
    down: migration_20250619_081526.down,
    name: '20250619_081526',
  },
  {
    up: migration_20250627_093746.up,
    down: migration_20250627_093746.down,
    name: '20250627_093746',
  },
  {
    up: migration_20250702_150156.up,
    down: migration_20250702_150156.down,
    name: '20250702_150156',
  },
  {
    up: migration_20250715_104039_add_embedded_video_to_stories.up,
    down: migration_20250715_104039_add_embedded_video_to_stories.down,
    name: '20250715_104039_add_embedded_video_to_stories',
  },
  {
    up: migration_20250722_163655_add_sizes_to_media.up,
    down: migration_20250722_163655_add_sizes_to_media.down,
    name: '20250722_163655_add_sizes_to_media',
  },
  {
    up: migration_20250805_091012.up,
    down: migration_20250805_091012.down,
    name: '20250805_091012',
  },
  {
    up: migration_20250819_154345.up,
    down: migration_20250819_154345.down,
    name: '20250819_154345',
  },
  {
    up: migration_20250820_091116_add_user_sessions_table.up,
    down: migration_20250820_091116_add_user_sessions_table.down,
    name: '20250820_091116_add_user_sessions_table',
  },
  {
    up: migration_20250822_164446.up,
    down: migration_20250822_164446.down,
    name: '20250822_164446',
  },
  {
    up: migration_20250826_141750.up,
    down: migration_20250826_141750.down,
    name: '20250826_141750'
  },
];
