export const getModelNames = (prisma: string) => {
  const prismaArray = prisma.split('\n');

  const modelNames = prismaArray
    .filter((line) => line.match(/export type (Aggregate.*?) =/))
    .map((line) => {
      const lineChunks = line.split(' ');

      return lineChunks[lineChunks.length - 3].replace('Aggregate', '');
    });

  return modelNames;
};
