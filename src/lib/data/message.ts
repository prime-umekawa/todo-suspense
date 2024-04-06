/**
 * useErrorDialog() で表示するダイアログに渡すメッセージ等の一覧
 *
 * 【第一階層】機能ごとに分ける
 * - e.g) material, tag, ...
 *
 * 【第二階層】open***Dialog() に渡すデータ
 * - openMessageDialog() に渡す場合 → message***
 * - openConfirmDialog() に渡す場合 → confirm***
 * - openErrorDialog() に渡す場合   → error***
 */

export const message = {
  todo: {
    badRequest: {
      title: 'リクエストが不正です。',
    },
    notFoundedTask: {
      title: 'タスクが存在しません。',
    },
    internalServerError: {
      title: '処理が失敗しました。',
    },
  },
};
