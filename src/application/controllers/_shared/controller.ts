import { performance } from 'node:perf_hooks';

import { HttpResponse } from '@shared/types/http-response.type';
import { Either } from '@shared/utils/either.util';
import { selectStatusCode } from '@shared/utils/http-status-code.util';

import { ISendLogErrorLoggerProvider } from '@contracts-providers/logger/send-log-error.logger-provider';
import { ISendLogTimeControllerLoggerProvider } from '@contracts-providers/logger/send-log-time-controller.logger-provider';

import { StatusError } from '@errors/_shared/status-error';

import { StatusSuccess } from './status-success';

export type ResponseSuccess<Data = any> = {
  data: Data;
  status: StatusSuccess;
};

export type ResponseError = {
  message: string;
  status: StatusError;
};

export abstract class Controller<Parameters, Response> {
  constructor(private readonly loggerProvider: ISendLogErrorLoggerProvider & ISendLogTimeControllerLoggerProvider) {}

  public async handle(parameters: Parameters): Promise<HttpResponse> {
    try {
      const startTime = performance.now();

      const response = (await this.performOperation(parameters)) as Either<ResponseError, ResponseSuccess>;
      if (response.isFailure()) {
        this.log({ httpRequest: parameters, startTime, isSuccess: false });
        return this.makeResponseError(response.value as ResponseError);
      }

      this.log({ httpRequest: parameters, startTime, isSuccess: true });
      return this.makeResponseGood(response.value as ResponseSuccess);
    } catch (error) {
      this.loggerProvider.sendLogError({
        message: `${this.constructor.name}.execute(${parameters}) error`,
        value: error
      });

      return {
        statusCode: 500,
        data: error
      };
    }
  }

  private log(parameters: { httpRequest: Parameters; startTime: number; isSuccess: boolean }): void {
    const runtimeInMs = performance.now() - parameters.startTime;
    this.loggerProvider.sendLogTimeController({
      message: `${this.constructor.name} took +${runtimeInMs} ms to execute!`,
      parameters: `${parameters}`,
      runtimeInMs,
      controllerName: this.constructor.name,
      isSuccess: parameters.isSuccess
    });
  }

  private makeResponseError(error: ResponseError): HttpResponse {
    const statusCode = selectStatusCode({ status: error.status });
    return { statusCode, data: { error: error.message } };
  }

  private makeResponseGood(response: ResponseSuccess): HttpResponse {
    const statusCode = selectStatusCode({ status: response.status });
    return { statusCode, data: response.data };
  }

  protected abstract performOperation(parameters: Parameters): Response;
}
