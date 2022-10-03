import { execSync } from 'child_process';
import fs from 'fs-extra';
import { PATH } from '../utils/constant';
import asyncExec from './asyncExec';

const prepostmigrate = async () => {
  console.log('Checking repository existences...');

  if (!fs.existsSync(`${PATH.API}/src/repository/baseRepository.ts`)) {
    console.log('Creating repository...');

    await asyncExec(
      `npx prisma-repo --base-repository --settings ${PATH.ROOT}/repository.setting.ts`,
      {
        cwd: PATH.ROOT,
      }
    );

    console.log('Repository created!');
  } else {
    console.log('Repository creation skipped!');
  }

  console.log('Running post-migration things...\n');

  execSync(`npx ts-node ${PATH.ROSES}/bin/postmigrate.ts`, {
    cwd: PATH.ROOT,
    stdio: 'inherit',
  });
};

prepostmigrate();
