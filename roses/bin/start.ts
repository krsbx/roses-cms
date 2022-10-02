import type { PathTypeKey } from '../types/constant';
import { PATH } from '../utils/constant';
import asyncExec from './asyncExec';

const start = (type: 'api' | 'app') =>
  asyncExec(`cd ${PATH[type.toUpperCase() as PathTypeKey]} && npm run start`);

const processArgs = () => {
  let isWithArg = false;
  let startType = '';

  if (process.argv.length > 2) {
    const [type] = process.argv.slice(2, 3);

    switch (type.toLowerCase()) {
      case 'api':
      case 'backend':
        isWithArg = true;

        console.log('Starting API...');

        start('api');

        startType = 'API';

        break;

      case 'app':
      case 'frontend':
        isWithArg = true;

        console.log('Starting APP...');

        start('app');

        startType = 'App';
        break;

      default:
    }
  }

  return {
    isWithArg,
    type: startType,
  };
};

const main = async () => {
  const { isWithArg, type } = processArgs();

  if (isWithArg) {
    console.log(`${type} server started`);

    return;
  }

  console.log('Starting all server...');

  Promise.all([start('api'), start('app')]);
};

main();
