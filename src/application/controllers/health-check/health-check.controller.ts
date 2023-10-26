import { HttpRequest } from '@shared/types/http-request.type';
import { Either, failure, success } from '@shared/utils/either.util';

import { Controller, ResponseSuccess } from '@controllers/_shared/controller';
import { StatusSuccess } from '@controllers/_shared/status-success';

export class HealthCheckController extends Controller<
  HealthCheckControllerDTO.Parameters,
  HealthCheckControllerDTO.Result
> {
  protected async performOperation(parameters: HealthCheckControllerDTO.Parameters): HealthCheckControllerDTO.Result {
    if (parameters.access_token.length > 0) {
      return failure(undefined);
    }

    return success({
      status: StatusSuccess.DONE,
      data: { isSuccess: true }
    });
  }
}

export namespace HealthCheckControllerDTO {
  export type Parameters = Readonly<HttpRequest<any, any, any>>;

  type ResultError = undefined;
  type ResultSuccess = Readonly<ResponseSuccess<{ isSuccess: true }>>;

  export type Result = Promise<Either<ResultError, ResultSuccess>>;
}
