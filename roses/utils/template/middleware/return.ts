import { pascalCase } from '../../case';

export const returnTemplate = (modelName: string) =>
  `export const return${pascalCase(modelName)}Mw = asyncMw(async (req, res) => {
  return res.status(req.status ?? 200).json({
    code: req.status ?? 200,
    status: httpStatus[\`\${req.status ?? 200}_NAME\`],
    data: req.${modelName},
  });
});`;

export const returnsTemplate = (modelName: string) =>
  `export const return${pascalCase(modelName)}sMw = asyncMw(async (req, res) => {
  const limit = +(req.query.limit === 'all' ? 1 : _.get(req.query, 'limit', 10));
  const page = +_.get(req.query, 'page', 0);
  const offset = page > 0 ? limit * (page - 1) : 0;
  const totalData = +_.get(req.${modelName}s, 'count', 0);
  const queriedData = _.get(req.${modelName}s, 'rows', []),
  const dataSize = queriedData.length < limit ? queriedData.length : limit;
  
  return res.status(200).json({
    code: 200,
    status: httpStatus['200_NAME'],
    data: queriedData,
    page: {
      size: dataSize,
      total: totalData,
      totalPages: totalData / limit,
      current: offset + 1,
    },
  });
});`;
