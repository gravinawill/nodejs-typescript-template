import { StatusError } from './status-error';

type ParametersConstructorDTO = {
  error?: Error;
  provider: {
    name: ProviderNames;
    method: CryptoProviderMethods;
    externalName?: string;
  };
};

export enum ProviderNames {
  CRYPTO = 'crypto'
}

export enum CryptoProviderMethods {
  GENERATE_ID = 'generate id'
}

export class ProviderError {
  readonly status: StatusError;

  readonly message: string;

  readonly name: 'ProviderError';

  readonly error?: Error;

  constructor(parameters: ParametersConstructorDTO) {
    this.name = 'ProviderError';
    this.message = `Error in ${parameters.provider.name} provider in ${parameters.provider.method} method.${
      parameters.provider.externalName === undefined
        ? ''
        : ` Error in external provider name: ${parameters.provider.externalName}.`
    }`;
    this.status = StatusError.PROVIDER_ERROR;
    this.error = parameters.error;
  }
}
