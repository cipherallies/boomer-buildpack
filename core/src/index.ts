import yargs from 'yargs';
import * as git from 'isomorphic-git';
import { join } from 'path'

const aS = (s: string) => `-----> ${s}`, pS = (s: string) => ' '.repeat(`-----> `.length) + s;
const { log } = console, [BUILD_DIR] = yargs.argv._, { CFG_USERNAME, CFG_TOKEN, CFG_DIR, CFG_URL } = process.env

log(aS(`Cloning configuration - username ${CFG_USERNAME}, token ${CFG_TOKEN}`));

git.plugins.set('fs', require('fs'))
git.clone({
    dir: join(BUILD_DIR, CFG_DIR || 'config'),
    url: CFG_URL,
    singleBranch: true,
    depth: 1,
    username: CFG_USERNAME,
    token: CFG_TOKEN
}).then(() => log(pS('Cloned configuration.')))
