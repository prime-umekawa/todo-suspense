/* eslint-disable */

export const ErrorCode = {
  BadRequest: 'E0000',
  NotFoundedTask: 'E0001',
  InternalServerError: 'E0002',
} as const;

export type ErrorCode = (typeof ErrorCode)[keyof typeof ErrorCode];

export class APIError extends Error {
  statusCode: number;
  code: string;
  constructor(statusCode: number, data: any) {
    super(data?.message ?? 'no message');
    this.code = data.code;
    this.statusCode = statusCode < 0 ? 500 : statusCode;
  }

  static getCodeString(e: unknown): string {
    return e instanceof APIError ? String(e.code) : 'none';
  }
}
