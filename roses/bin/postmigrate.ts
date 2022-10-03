import fs from 'fs-extra';
import _ from 'lodash';
import { pascalCase } from '../utils/case';
import { PATH } from '../utils/constant';
import { ROSES_CMS } from '../utils/constant/backend';
import createModelMiddleware from '../utils/middleware';
import { getModelNames } from '../utils/model';
import createRepository from '../utils/repository';
import RosesCMS, { RosesCMSFindAll } from '../utils/rosesCms';
import asyncExec from './asyncExec';

let prisma = '';

let generated: RosesCMSFindAll = {
  rows: [],
  count: 0,
};

const resyncMigration = async () => {
  console.log('Generating extra migration data...');

  console.log('Resyncing migration type definitions...');

  await asyncExec('npx prisma-repo --model-structures', {
    cwd: PATH.ROSES,
  });

  console.log('Migration type definitions synced!');

  generated = await RosesCMS.findAll({});
};

const removeCmsRepo = () => {
  const filePath = `${PATH.API}/src/repository/${ROSES_CMS}.ts`;

  if (!fs.existsSync(filePath)) return;

  fs.rmSync(filePath);
};

const createCms = (modelNames: string[]) =>
  _.map(modelNames, async (modelName) => {
    if (modelName === pascalCase(ROSES_CMS)) return;

    const isGenerated = _.findIndex(generated.rows, ['name', modelName]) !== -1;

    if (isGenerated) return;

    const fileName = _.camelCase(modelName);

    await asyncExec(
      `npx prisma-repo --modelname ${modelName} --settings ${PATH.ROOT}/repository.setting.ts`,
      {
        cwd: PATH.ROOT,
      }
    );

    const middleware = await createModelMiddleware(fileName);

    if (!fs.existsSync(`${PATH.API}/src/middleware`)) {
      fs.mkdirpSync(`${PATH.API}/src/middleware`);
    }

    fs.writeFile(`${PATH.API}/src/middleware/${fileName}s.ts`, middleware);

    RosesCMS.create({
      name: modelName,
    });
  });

const postmigrate = async () => {
  prisma = await fs.readFile(`${PATH.ROOT}/node_modules/.prisma/client/index.d.ts`, 'utf8');
  const modelNames = getModelNames(prisma);

  try {
    await resyncMigration();

    await Promise.all(createCms(modelNames));

    createRepository(modelNames);

    removeCmsRepo();

    console.log('Files generated successfully');
  } catch (e) {
    console.log(e);
  }
};

postmigrate();
