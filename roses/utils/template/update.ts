import { pascalCase } from '../case';

const updateTemplate = (modelName: string) =>
  `export const update${pascalCase(modelName)}Mw = asyncMw(async (req, res, next) => {
  const ${modelName} = repository.${modelName}.resourceToModel(req.body);

  req.${modelName} = await repository.${modelName}.update(req.params.id, ${modelName});

  return next();
});`;

export default updateTemplate;
