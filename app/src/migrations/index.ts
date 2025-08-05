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
    name: '20250805_091012'
  },
];
