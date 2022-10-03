import fs from 'fs-extra';
import _ from 'lodash';
import { PATH } from './constant';
import { ROSES_CMS } from './constant/backend';

const createRepository = (modelNames: string[]) => {
  const models = _(modelNames)
    .filter((modelName) => _.camelCase(modelName) !== ROSES_CMS)
    .map((modelName) => _.camelCase(modelName))
    .value();

  if (models.length === 0) return;

  const template = [
    ..._.map(models, (modelName) => `import ${modelName} from './${modelName}';\n`),
  ];

  template.push(`const repository = {`);
  template.push(..._.map(models, (modelName) => `  ${modelName}`));
  template.push('};\n');
  template.push('export default repository;');

  if (!fs.existsSync(`${PATH.API}/src/repository`)) {
    fs.mkdirpSync(`${PATH.API}/src/repository`);
  }

  fs.writeFile(`${PATH.API}/src/repository/index.ts`, template.join('\n'));
};

export default createRepository;
