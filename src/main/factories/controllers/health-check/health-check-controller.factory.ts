import { Controller } from '@controllers/_shared/controller';
import { HealthCheckController, HealthCheckControllerDTO } from '@controllers/health-check/health-check.controller';

import { makeLoggerProvider } from '@factories/providers/logger-provider.factory';

export const makeHealthCheckController = (): Controller<
  HealthCheckControllerDTO.Parameters,
  HealthCheckControllerDTO.Result
> => new HealthCheckController(makeLoggerProvider());
