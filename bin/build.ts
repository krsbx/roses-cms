// eslint-disable-next-line import/no-extraneous-dependencies
import appRootPath from 'app-root-path';
import { exec } from 'child_process';
// eslint-disable-next-line import/no-extraneous-dependencies
import fs from 'fs-extra';
import { promisify } from 'util';

const asyncExec = promisify(exec);

const buildApi = async () => {
  const buildPath = `${appRootPath}/api/dist`;

  if (fs.existsSync(buildPath)) {
    console.log('Removing old API builds...');

    fs.rmSync(buildPath, {
      recursive: true,
    });

    console.log('Old API builds removed');
  }

  asyncExec(`cd ${appRootPath}/app && npm run build`);
};

const buildApp = async () => {
  const buildPath = `${appRootPath}/app/build`;

  if (fs.existsSync(buildPath)) {
    console.log('Removing old APP builds...');

    fs.rmSync(buildPath, {
      recursive: true,
    });

    console.log('Old APP builds removed');
  }

  asyncExec(`cd ${appRootPath}/api && npm run build`);
};

(async () => {
  try {
    console.log('Building CMS data...');

    await Promise.all([buildApi(), buildApp()]);

    console.log('Building CMS completed!');
  } catch (e) {
    console.log('Error while building the CMS');
  }
})();
