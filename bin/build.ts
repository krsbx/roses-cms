// eslint-disable-next-line import/no-extraneous-dependencies
import appRootPath from 'app-root-path';
// eslint-disable-next-line import/no-extraneous-dependencies
import fs from 'fs-extra';
import asyncExec from './asyncExec';

const build = (type: 'api' | 'app', dist: 'dist' | 'build') => {
  const buildPath = `${appRootPath}/${type}/${dist}`;

  if (fs.existsSync(buildPath)) {
    console.log(`Removing old ${type.toUpperCase()} builds...`);

    fs.rmSync(buildPath, {
      recursive: true,
    });

    console.log(`Old ${type} builds removed`);
  }

  asyncExec(`npm run build`, {
    cwd: `${appRootPath}/${type}`,
  });
};

(async () => {
  try {
    console.log('Building CMS data...');

    await Promise.all([build('api', 'dist'), build('app', 'build')]);

    console.log('Building CMS completed!');
  } catch {
    console.log('Error while building the CMS');
  }
})();
