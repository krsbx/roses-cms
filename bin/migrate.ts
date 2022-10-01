// eslint-disable-next-line import/no-extraneous-dependencies
import appRootPath from 'app-root-path';
import asyncExec from './asyncExec';

(async () => {
  try {
    console.log('Generating migrations data');

    asyncExec('npx prisma-repo --model-structures', {
      cwd: `${appRootPath}/api`,
    });

    console.log('Files are generated');
  } catch (e) {
    console.log(e);
  }
})();
