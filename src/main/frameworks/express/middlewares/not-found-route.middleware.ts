import { RequestHandler } from 'express';

import { HttpStatusCode } from '@shared/utils/http-status-code.util';

import { GLOBAL_CONFIG } from '@main/configs/infrastructure.config';

type Adapter = () => RequestHandler;

export const notFoundRouteMiddleware: Adapter = () => async (request, response, _next) => {
  if (response.headersSent === false) {
    const error = {
      code: 'not_found',
      message: `Can't find ${request.method.toUpperCase()} ${request.originalUrl} on this server.`,
      status: HttpStatusCode.NOT_FOUND,
      appVersion: GLOBAL_CONFIG.APP_VERSION
    };
    return response.status(error.status).send(error);
  }
  return response.end();
};
