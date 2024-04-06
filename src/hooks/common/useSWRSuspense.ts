// SWR ライブラリから必要な型と関数をインポート
import useSWR, { Key, Fetcher, SWRConfiguration, SWRResponse } from 'swr';

// `data`プロパティがundefinedではないことを保証する型
type NonUndefinedData<T> = T extends { data?: undefined | infer Data }
  ? { data: Data } & Omit<T, 'data'> // `data`がundefined以外であることを保証し、元の型から`data`を除外
  : never; // 条件に合わない場合はnever型を返す

// SWRのレスポンス型で`data`がundefinedでないことを保証する型
type SWRSuspenseResponse<Data, Error> = NonUndefinedData<SWRResponse<Data, Error>>;

// `suspense`オプションを除外してSWRの設定型を定義
type SWRSuspenseConfiguration<Data, Error> = Omit<SWRConfiguration<Data, Error>, 'suspense'>;

// useSWRSuspenseフック: SWRを使いつつ、`suspense`を強制的に有効化
export function useSWRSuspense<Data, Error>(
  key: Key, // データフェッチのキー
  fetcher: Fetcher<Data> | null, // データフェッチ関数
  config?: SWRSuspenseConfiguration<Data, Error>, // SWRの設定（`suspense`除外）
): SWRSuspenseResponse<Data, Error> {
  // useSWRフックを使ってデータをフェッチ
  const { data, ...others } = useSWR<Data, Error>(key, fetcher, { ...config, suspense: true });

  // フェッチしたデータ（`data`）とその他のレスポンスを返却
  return {
    data: data!, // `suspense: true`により、`data`がundefinedになることはないため、非nullアサーションを使用
    ...others,
  };
}
