import { pascalCase } from '../case';

export const returnTemplate = (modelName: string) =>
  `export const return${pascalCase(modelName)}Mw = asyncMw(async (req, res) => {
  const ${modelName} = repository.${modelName}.modelToResource(req.body);
    
  return res.json(${modelName});
});`;

export const returnsTemplate = (modelName: string) =>
  `export const return${pascalCase(modelName)}sMw = asyncMw(async (req, res) => {
  return res.json({
    rows: await Promise.all(
      _.map(_.get(req.${modelName}s, 'rows', []), async (${modelName}) => repository.${modelName}.modelToResource(${modelName}))
    ),
    count: _.get(req.posts, 'count', 0),
  });
});`;
