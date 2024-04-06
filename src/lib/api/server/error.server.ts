import { logError } from '@/lib/common/logError.server';
import { ServerErrorMessage } from '@/lib/data/serverErrorMessage';

export class ServerCommonError extends Error {
  type: string;
  code: string;
  status: number;
  constructor(body: ErrorBody, errorMessage: ServerErrorMessage) {
    logError(errorMessage);
    super();
    this.type = body.type;
    this.code = body.code;
    this.status = body.status;
    this.message = body.message;
  }
}

export const ErrorBody = {
  BAD_REQUEST: {
    code: 'E0000',
    type: 'BadRequest',
    message: '不正なリクエストです',
    status: 400,
  },
  NOT_FOUNDED_TASK: {
    code: 'E0001',
    type: 'NotFoundedTask',
    message: 'タスクが見つかりません',
    status: 404,
  },
  INTERNAL_SERVER_ERROR: {
    code: 'E0002',
    type: 'InternalServerError',
    message: 'Internal server error',
    status: 500,
  },
} as const;

export type ErrorBody = (typeof ErrorBody)[keyof typeof ErrorBody];
