import _ from 'lodash';

export const pascalCase = (str: string) => _.startCase(_.camelCase(str)).replace(/ /g, '');

export const constantCase = (str: string) => _.upperCase(str).replace(/ /g, '_');

export const dotCase = (str: string) => _.lowerCase(str).replace(/ /g, '.');

export const sentenceCase = (str: string) => _.upperFirst(_.lowerCase(str));

export const titleCase = (str: string) => _.startCase(_.camelCase(str));
