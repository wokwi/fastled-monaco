import { promises as fs } from 'fs';
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';
import typescript from 'typescript';
const { transpile } = typescript;

const __dirname = dirname(fileURLToPath(import.meta.url));
const parentSrc = resolve(join(__dirname, '..', 'src'));

function parentProjectPlugin(options) {
  options.plugins.push({
    name: 'parent-project',
    async resolveId(id, importer) {
      if (options.mode === 'build') {
        return;
      }
      if (id === parentSrc) {
        return '\0parent-project:/@fastled-monaco/index.ts';
      }
      if (importer && importer.startsWith('\0fastled-monaco:') && !id.endsWith('.ts')) {
        return id + '.ts';
      }
    },
    async load(id) {
      const prefix = '\0fastled-monaco:';
      if (id.startsWith(prefix)) {
        const relative = id.substr(prefix.length);
        const finalPath = resolve(parentSrc, relative);
        this.addWatchFile(finalPath);
        return transpile(await fs.readFile(finalPath, { encoding: 'utf-8' }), {
          target: 'es2020',
          module: 'es2015',
        });
      }
    },
  });
}

export default function (config) {
  parentProjectPlugin(config);
}
