import { PrismaClient } from '@prisma/client';
import { API_PATH } from '../utils/constant';
import asyncExec from './asyncExec';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

(async () => {
  try {
    console.log('Generating migrations data');

    asyncExec('npx prisma-repo --model-structures', {
      cwd: API_PATH,
    });

    console.log('Files are generated');
  } catch (e) {
    console.log(e);
  }
})();
