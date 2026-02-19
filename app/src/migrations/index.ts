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
import * as migration_20250829_091954_remove_media_img_sizes from './20250829_091954_remove_media_img_sizes';
import * as migration_20250903_141307_add_location_types from './20250903_141307_add_location_types';
import * as migration_20250904_144044_rename_stories_to_landscapes from './20250904_144044_rename_stories_to_landscapes';
import * as migration_20250911_063931_change_landscapes_description_type from './20250911_063931_change_landscapes_description_type';
import * as migration_20250912_141903_change_layers_and_location_types from './20250912_141903_change_layers_and_location_types';
import * as migration_20250912_142826_multipolygon_geometry_support from './20250912_142826_multipolygon_geometry_support';
import * as migration_20250915_141326_change_landscapes_name_type from './20250915_141326_change_landscapes_name_type';
import * as migration_20250922_132929 from './20250922_132929';
import * as migration_20250925_123437 from './20250925_123437';
import * as migration_20250925_220412 from './20250925_220412';
import * as migration_20250929_165419_add_group_column_to_indicators from './20250929_165419_add_group_column_to_indicators';
import * as migration_20250930_123011_add_faqs_table from './20250930_123011_add_faqs_table';
import * as migration_20251020_073201_add_published_to_categories from './20251020_073201_add_published_to_categories';
import * as migration_20251120_174722_add_locations_relationship_to_landscapes from './20251120_174722_add_locations_relationship_to_landscapes';
import * as migration_20260219_062652_add_unit_to_indicators from './20260219_062652_add_unit_to_indicators';

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
    name: '20250826_141750',
  },
  {
    up: migration_20250829_091954_remove_media_img_sizes.up,
    down: migration_20250829_091954_remove_media_img_sizes.down,
    name: '20250829_091954_remove_media_img_sizes',
  },
  {
    up: migration_20250903_141307_add_location_types.up,
    down: migration_20250903_141307_add_location_types.down,
    name: '20250903_141307_add_location_types',
  },
  {
    up: migration_20250904_144044_rename_stories_to_landscapes.up,
    down: migration_20250904_144044_rename_stories_to_landscapes.down,
    name: '20250904_144044_rename_stories_to_landscapes',
  },
  {
    up: migration_20250911_063931_change_landscapes_description_type.up,
    down: migration_20250911_063931_change_landscapes_description_type.down,
    name: '20250911_063931_change_landscapes_description_type',
  },
  {
    up: migration_20250912_141903_change_layers_and_location_types.up,
    down: migration_20250912_141903_change_layers_and_location_types.down,
    name: '20250912_141903_change_layers_and_location_types',
  },
  {
    up: migration_20250912_142826_multipolygon_geometry_support.up,
    down: migration_20250912_142826_multipolygon_geometry_support.down,
    name: '20250912_142826_multipolygon_geometry_support',
  },
  {
    up: migration_20250915_141326_change_landscapes_name_type.up,
    down: migration_20250915_141326_change_landscapes_name_type.down,
    name: '20250915_141326_change_landscapes_name_type',
  },
  {
    up: migration_20250922_132929.up,
    down: migration_20250922_132929.down,
    name: '20250922_132929',
  },
  {
    up: migration_20250925_123437.up,
    down: migration_20250925_123437.down,
    name: '20250925_123437',
  },
  {
    up: migration_20250925_220412.up,
    down: migration_20250925_220412.down,
    name: '20250925_220412',
  },
  {
    up: migration_20250929_165419_add_group_column_to_indicators.up,
    down: migration_20250929_165419_add_group_column_to_indicators.down,
    name: '20250929_165419_add_group_column_to_indicators',
  },
  {
    up: migration_20250930_123011_add_faqs_table.up,
    down: migration_20250930_123011_add_faqs_table.down,
    name: '20250930_123011_add_faqs_table',
  },
  {
    up: migration_20251020_073201_add_published_to_categories.up,
    down: migration_20251020_073201_add_published_to_categories.down,
    name: '20251020_073201_add_published_to_categories',
  },
  {
    up: migration_20251120_174722_add_locations_relationship_to_landscapes.up,
    down: migration_20251120_174722_add_locations_relationship_to_landscapes.down,
    name: '20251120_174722_add_locations_relationship_to_landscapes',
  },
  {
    up: migration_20260219_062652_add_unit_to_indicators.up,
    down: migration_20260219_062652_add_unit_to_indicators.down,
    name: '20260219_062652_add_unit_to_indicators'
  },
];
