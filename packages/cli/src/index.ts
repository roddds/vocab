import type { TranslationFile } from '@vocab/types';
import { loadConfig } from '@vocab/utils';
import yargs from 'yargs';

import generateTypes from './generate-types';
import pull from './pull-translations';
import push from './push-translations';

import envCi from 'env-ci';

const { branch } = envCi();

const branchDefinition = {
  type: 'string',
  describe: 'The Phrase branch to target',
  default: branch || 'local-development',
} as const;

// eslint-disable-next-line @typescript-eslint/no-unused-expressions
yargs(process.argv.slice(2))
  .scriptName('vocab')
  .option('config', {
    type: 'string',
    describe: 'Path to config file',
  })
  .middleware(async ({ config }) => {
    await loadConfig(config);
  })
  .command({
    command: 'push',
    builder: () => yargs.options({ branch: branchDefinition }),
    handler: async (options) => {
      await push(options);
    },
  })
  .command({
    command: 'pull',
    builder: () => yargs.options({ branch: branchDefinition }),
    handler: async (options) => {
      await pull(options);
    },
  })
  .command({
    command: 'generate-types',
    handler: async () => {
      await generateTypes();
    },
  })
  .help()
  .wrap(72).argv;

// Export TranslationFile type for use in generated translation file type declarations
export type { TranslationFile };
