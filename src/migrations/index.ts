import * as migration_20250804_095244 from './20250804_095244';

export const migrations = [
  {
    up: migration_20250804_095244.up,
    down: migration_20250804_095244.down,
    name: '20250804_095244'
  },
];
