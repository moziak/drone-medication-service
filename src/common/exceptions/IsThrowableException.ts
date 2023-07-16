import { HttpException, InternalServerErrorException } from '@nestjs/common';

type IOptions = {
  message?: string;
  useError?: boolean;
};

export function IsThrowableException(
  error: HttpException | Error | any,
  options?: IOptions,
) {
  if (error instanceof HttpException) {
    throw error;
  }
  if (options?.useError) {
    throw new Error(
      options?.message ?? error?.message ?? 'Unknown error occured',
    );
  }
  throw new InternalServerErrorException(
    options?.message ??
      `Unexpected server error, we are looking into it. Please retry later.`,
  );
}
