import { pascalCase } from '../../case';

export const getTemplate = (modelName: string) =>
  `export const get${pascalCase(modelName)}Mw = asyncMw(async (req, res, next) => {
  req.${modelName} = await repository.${modelName}.findOne(req.params.id);

  if (!req.${modelName}) {
    return res.status(404).json({
      code: 404,
      status: httpStatus['404_NAME'],
      message: '${pascalCase(modelName)} not found',
    });
  }

  return next();
});`;

export const getsTemplate = (modelName: string) =>
  `export const get${pascalCase(modelName)}sMw = asyncMw(async (req, res, next) => {
  req.${modelName}s = await repository.${modelName}.findAll({}, req.filterQueryParams, req.query, {});

  return next();
});`;
