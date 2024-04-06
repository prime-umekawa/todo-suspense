// エラーメッセージをログに記録するヘルパー関数
export const logError = (message: string): void => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ERROR: ${message}`);
};
