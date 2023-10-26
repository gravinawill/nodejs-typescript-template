export namespace SendLogTimeControllerLoggerProviderDTO {
  export type Parameters = Readonly<{
    message: string;
    runtimeInMs: number;
    controllerName: string;
    parameters: string;
    isSuccess: boolean;
  }>;
  export type Result = void;
}

export interface ISendLogTimeControllerLoggerProvider {
  sendLogTimeController(
    parameters: SendLogTimeControllerLoggerProviderDTO.Parameters
  ): SendLogTimeControllerLoggerProviderDTO.Result;
}
