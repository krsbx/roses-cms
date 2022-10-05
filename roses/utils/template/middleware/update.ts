import { pascalCase } from '../../case';

const updateTemplate = (modelName: string) =>
  `export const update${pascalCase(modelName)}Mw = asyncMw(async (req, res, next) => {
  req.${modelName} = await repository.${modelName}.update(req.params.id, req.body);

  return next();
});`;

export default updateTemplate;
