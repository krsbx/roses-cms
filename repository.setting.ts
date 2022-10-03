import { PrismaRepoConfig } from 'prisma-repo';

const config: PrismaRepoConfig = {
  overwrite: {
    baseRepository: false,
    repository: false,
  },
  repositoryPath: 'api/src/repository',
  prismaLogger: true,
};

export default config;
