// eslint-disable-next-line import/no-relative-packages
import BaseRepository from '../../api/src/repository/baseRepository';
// eslint-disable-next-line import/no-relative-packages
import { MODELS_NAME } from '../../api/src/repository/models';

class RosesCMS extends BaseRepository(MODELS_NAME.ROSES_CMS) {}

export type RosesCMSFindAll = Awaited<ReturnType<typeof RosesCMS['findAll']>>;

export default RosesCMS;
