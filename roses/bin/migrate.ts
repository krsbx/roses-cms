import { execSync, ExecSyncOptionsWithBufferEncoding } from 'child_process';
import _ from 'lodash';
import { PATH } from '../utils/constant';

const commands = ['reset', 'deploy', 'status', 'resolve'];

const processArgs = () => {
  let withName = false;
  let modelName = '';
  let isCommand = false;

  if (process.argv.length > 2) {
    const [name] = process.argv.slice(2, 3);

    isCommand = commands.includes(name);

    if (name.trim() === '')
      return {
        isCommand,
        withName,
        name,
      };

    withName = true;
    modelName = name;
  }

  return {
    isCommand,
    withName,
    name: modelName,
  };
};

const migrate = async () => {
  const { name, withName, isCommand } = processArgs();

  const rest = process.argv.splice(3);
  const hasMore = rest.length > 0;
  const restArgs = hasMore ? ` ${_.compact(rest).join(' ')}` : '';

  const options: ExecSyncOptionsWithBufferEncoding = {
    cwd: PATH.API,
    stdio: 'inherit',
  };

  try {
    if (withName) {
      execSync(`prisma migrate dev --name ${name}${restArgs}`, options);

      return;
    }

    if (isCommand) {
      execSync(`prisma migrate ${name}${restArgs}`, options);

      return;
    }

    execSync(`prisma migrate dev${restArgs}`, options);
  } catch {
    console.log('Error while running the migrate functions');
  }
};

migrate();
