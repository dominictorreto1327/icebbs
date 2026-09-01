import { access, rename, rmdir } from 'node:fs/promises';
import { constants } from 'node:fs';
import { join } from 'node:path';

const clientDir = join(process.cwd(), 'dist', 'client');
const prefixedDir = join(clientDir, 'icebbs');
const prefixedAssets = join(prefixedDir, '_next');
const rootAssets = join(clientDir, '_next');

await access(join(clientDir, 'index.html'), constants.R_OK);
await access(prefixedAssets, constants.R_OK);
await rename(prefixedAssets, rootAssets);
await rmdir(prefixedDir);

console.log('GitHub Pages artifact prepared.');
