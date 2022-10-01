// eslint-disable-next-line import/no-extraneous-dependencies
import appRootPath from 'app-root-path';
import { exec } from 'child_process';
import { promisify } from 'util';

const asyncExec = promisify(exec);

(async () => {
  try {
    await Promise.all([
      asyncExec(`cd ${appRootPath}/api && npm run start`),
      asyncExec(`cd ${appRootPath}/app && npm run start`),
    ]);
    // eslint-disable-next-line no-empty
  } catch {}
})();
