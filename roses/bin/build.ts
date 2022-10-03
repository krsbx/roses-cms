// eslint-disable-next-line import/no-extraneous-dependencies
import fs from 'fs-extra';
import type { PathTypeKey } from '../types/constant';
import { PATH } from '../utils/constant';
import asyncExec from './asyncExec';

const build = (type: 'api' | 'app', dist: 'dist' | 'build') => {
  const path = PATH[type.toUpperCase() as PathTypeKey];
  const buildPath = `${path}/${dist}`;

  if (fs.existsSync(buildPath)) {
    console.log(`Removing old ${type.toUpperCase()} builds...`);

    fs.rmSync(buildPath, {
      recursive: true,
    });

    console.log(`Old ${type} builds removed`);
  }

  asyncExec(`npm run build`, {
    cwd: path,
  });
};

const processArgs = () => {
  let isWithArg = false;

  if (process.argv.length > 2) {
    const [type] = process.argv.slice(2, 3);

    switch (type.toLowerCase()) {
      case 'api':
      case 'backend':
        isWithArg = true;

        console.log('Building API...');

        build('api', 'dist');

        break;

      case 'app':
      case 'frontend':
        isWithArg = true;

        console.log('Building APP...');

        build('app', 'build');
        break;

      default:
    }
  }

  return isWithArg;
};

const main = async () => {
  const isWithArg = processArgs();

  if (isWithArg) {
    console.log('Build completed!');

    return;
  }

  try {
    console.log('Building CMS data...');

    await Promise.all([build('api', 'dist'), build('app', 'build')]);

    console.log('Building CMS completed!');
  } catch {
    console.log('Error while building the CMS');
  }
};

main();
