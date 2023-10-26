import { ISendLogErrorLoggerProvider } from '@contracts-providers/logger/send-log-error.logger-provider';
import { ISendLogHttpLoggerProvider } from '@contracts-providers/logger/send-log-http.logger-provider';
import { ISendLogInfoLoggerProvider } from '@contracts-providers/logger/send-log-info.logger-provider';
import { ISendLogTimeControllerLoggerProvider } from '@contracts-providers/logger/send-log-time-controller.logger-provider';
import { ISendLogTimeUseCaseLoggerProvider } from '@contracts-providers/logger/send-log-time-use-case.logger-provider';

import { WinstonLoggerProvider } from '@infrastructure/providers/logger/winston.logger-provider';

import { GLOBAL_CONFIG } from '@main/configs/infrastructure.config';

export const makeLoggerProvider = (): ISendLogErrorLoggerProvider &
  ISendLogInfoLoggerProvider &
  ISendLogHttpLoggerProvider &
  ISendLogTimeControllerLoggerProvider &
  ISendLogTimeUseCaseLoggerProvider =>
  new WinstonLoggerProvider({
    IS_DEVELOPMENT: GLOBAL_CONFIG.IS_DEVELOPMENT,
    LOGS_FOLDER: GLOBAL_CONFIG.LOGS_FOLDER
  });
