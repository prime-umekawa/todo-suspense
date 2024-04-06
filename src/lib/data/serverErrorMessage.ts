export const ServerErrorMessage = {
  BAD_REQUEST_METHOD: 'リクエストメソッドが不正です。',
  BAD_REQUEST_BODY: 'リクエストボディが不正です。',
  NOT_FOUNDED_TASK: 'タスクが見つかりません。',
  FAILED_TO_LOAD_TASK: 'タスクの読み込みに失敗しました。',
  INTERNAL_SERVER_ERROR: '不明なエラーです。',
} as const;

export type ServerErrorMessage = (typeof ServerErrorMessage)[keyof typeof ServerErrorMessage];
