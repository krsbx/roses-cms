import { pascalCase } from '../case';

const createTemplate = (modelName: string) =>
  `export const create${pascalCase(modelName)}Mw = asyncMw(async (req, res, next) => {
  const ${modelName} = repository.${modelName}.resourceToModel(req.body);

  req.${modelName} = await repository.${modelName}.create(${modelName});

  return next();
});`;

export default createTemplate;
