import { pascalCase } from '../case';

export const getTemplate = (modelName: string) =>
  `export const get${pascalCase(modelName)}Mw = asyncMw(async (req, res, next) => {
  req.${modelName} = await repository.${modelName}.findOne(req.params.id);

  return next();
});`;

export const getsTemplate = (modelName: string) =>
  `export const get${pascalCase(modelName)}sMw = asyncMw(async (req, res, next) => {
  req.${modelName}s = await repository.${modelName}.findAll({}, req.filterQueryParams, req.query, {});

  return next();
});`;
