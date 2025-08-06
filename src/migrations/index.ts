import * as migration_20250804_095244 from './20250804_095244';
import * as migration_20250806_025415 from './20250806_025415';

export const migrations = [
  {
    up: migration_20250804_095244.up,
    down: migration_20250804_095244.down,
    name: '20250804_095244',
  },
  {
    up: migration_20250806_025415.up,
    down: migration_20250806_025415.down,
    name: '20250806_025415'
  },
];
