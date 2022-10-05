import { pascalCase } from '../../case';

const deleteTemplate = (modelName: string) =>
  `export const delete${pascalCase(modelName)}Mw = asyncMw(async (req, res) => {
  await repository.${modelName}.delete(req.params.id);

  return res.sendStatus(204);
});`;

export default deleteTemplate;
