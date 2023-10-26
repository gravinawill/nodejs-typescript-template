import { makeInfrastructure } from '@factories/infrastructure.factory';

import { Framework } from './frameworks';

const start = async (): Promise<void> => {
  makeInfrastructure();
  await Framework.initializeExpress();
};

start();
