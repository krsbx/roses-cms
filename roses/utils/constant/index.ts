import appRootPath from 'app-root-path';

export const APP_PATH = `${appRootPath}/app`;
export const ROSES_PATH = `${appRootPath}/roses`;
export const API_PATH = `${appRootPath}/api`;

export const PATH = {
  APP: APP_PATH,
  API: API_PATH,
  ROSES: ROSES_PATH,
  ROOT: appRootPath.path,
} as const;
