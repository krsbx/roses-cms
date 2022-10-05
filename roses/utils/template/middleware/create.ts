import { pascalCase } from '../../case';

const createTemplate = (modelName: string) =>
  `export const create${pascalCase(modelName)}Mw = asyncMw(async (req, res, next) => {
  req.${modelName} = await repository.${modelName}.create(req.body);
  req.status = 201;

  return next();
});`;

export default createTemplate;
