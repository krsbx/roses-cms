// eslint-disable-next-line import/no-extraneous-dependencies
import appRootPath from 'app-root-path';

export const APP_PATH = `${appRootPath}/app`;
export const API_PATH = `${appRootPath}/api`;

export const PATH = {
  APP: APP_PATH,
  API: API_PATH,
} as const;
