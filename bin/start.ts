// eslint-disable-next-line import/no-extraneous-dependencies
import appRootPath from 'app-root-path';
import asyncExec from './asyncExec';

const generateCommand = (type: 'api' | 'app') => `cd ${appRootPath}/${type} && npm run start`;

(async () => {
  console.log('Starting all server...');

  Promise.all([asyncExec(generateCommand('api')), asyncExec(generateCommand('app'))]);
})();
