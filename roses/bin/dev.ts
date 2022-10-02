import type { PathTypeKey } from '../types/constant';
import { PATH } from '../utils/constant';
import asyncExec from './asyncExec';

const dev = (type: 'api' | 'app') =>
  asyncExec(`cd ${PATH[type.toUpperCase() as PathTypeKey]} && npm run dev`);

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

        dev('api');

        startType = 'API';

        break;

      case 'app':
      case 'frontend':
        isWithArg = true;

        console.log('Starting APP...');

        dev('app');

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
    console.log(`${type} dev server started`);

    return;
  }

  console.log('Starting all dev server...');

  Promise.all([dev('api'), dev('app')]);
};

main();
