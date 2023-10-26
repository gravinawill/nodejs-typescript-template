import endent from 'endent';
import figlet from 'figlet';

import { makeLoggerProvider } from '@factories/providers/logger-provider.factory';

import { GLOBAL_CONFIG } from '@main/configs/infrastructure.config';

export const showBanner = (): void => {
  const banner = endent`Application started successfully!
      ${figlet.textSync(GLOBAL_CONFIG.APP_NAME)}
       Version: ${GLOBAL_CONFIG.APP_VERSION}
       Port: ${GLOBAL_CONFIG.APP_PORT}
       Environment: ${GLOBAL_CONFIG.ENVIRONMENT}
    `;
  makeLoggerProvider().sendLogInfo({ message: banner });
};
