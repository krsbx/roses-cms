import { PATH } from '../utils/constant';

export type PathTypeKey = keyof typeof PATH;

export type PathType = typeof PATH[PathTypeKey];
