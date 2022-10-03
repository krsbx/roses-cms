import { exec } from 'child_process';
import { promisify } from 'util';

const asyncExec = promisify(exec);

export default asyncExec;
