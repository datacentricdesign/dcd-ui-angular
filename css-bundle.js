/*import { relative } from 'path';
import { Bundler } from 'scss-bundle';
import { writeFile } from 'fs-extra';*/

const path = require('path');
const scssbundle = require('scss-bundle');
const fsextra = require('fs-extra');

/** Bundles all SCSS files into a single file */
async function bundleScss() {
  const { found, bundledContent, imports } = await new scssbundle.Bundler()
    .bundle('./src/_theme.scss', ['./src/**/*.scss']);

  if (imports) {
    const cwd = process.cwd();

    const filesNotFound = imports
      .filter(x => !x.found)
      .map(x => path.relative(cwd, x.filePath));

    if (filesNotFound.length) {
      console.error(`SCSS imports failed \n\n${filesNotFound.join('\n - ')}\n`);
      throw new Error('One or more SCSS imports failed');
    }
  }

  if (found) {
    await fsextra.writeFile('./dist/ui-angular/_theme.scss', bundledContent);
  }
}

bundleScss().catch( error => {
  console.log(error);
});
