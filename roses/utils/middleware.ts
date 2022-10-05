import _ from 'lodash';
import { IMPORTS } from './constant/template/middleware';
import createTemplate from './template/middleware/create';
import deleteTemplate from './template/middleware/delete';
import { getsTemplate, getTemplate } from './template/middleware/get';
import { returnsTemplate, returnTemplate } from './template/middleware/return';
import updateTemplate from './template/middleware/update';

const createModelMiddleware = async (modelName: string) => {
  const template = [..._.values(IMPORTS), '\n'];

  template.push(createTemplate(modelName), '\n');
  template.push(updateTemplate(modelName), '\n');
  template.push(getTemplate(modelName), '\n');
  template.push(getsTemplate(modelName), '\n');
  template.push(deleteTemplate(modelName), '\n');
  template.push(returnTemplate(modelName), '\n');
  template.push(returnsTemplate(modelName), '\n');

  return template.join('\n');
};

export default createModelMiddleware;
