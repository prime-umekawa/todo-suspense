/* eslint-disable */
import { APIError } from '@/lib/api/error';
import { __log } from '@/lib/common/log';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

export type CommonHTTPResponse = {
  status: number;
  data: any;
  headers: any;
};

// APIを叩くときのbaseURL
export const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

// APIを叩くコード
export const execRequest = async (config: AxiosRequestConfig): Promise<CommonHTTPResponse> => {
  try {
    // API リクエストのログをとる
    __log(`>>> HTTP Request: ${config.method} ${config.url}`, config);
    const response = await httpClient(config);
    __log(`<<< HTTP Response: ${config.method} ${config.url}`, response);
    return {
      status: response.status,
      data: response.data,
      headers: response.headers,
    };
  } catch (error) {
    const axiosError = error as AxiosError;
    const errorResponse = axiosError.response;

    // エラーのログをとる
    __log('<<<XXX HTTP Error', errorResponse);

    // API から返却されたエラーをそのまま return する
    if (errorResponse) {
      return {
        status: errorResponse.status,
        data: errorResponse.data,
        headers: errorResponse.headers,
      };
    } else if (axiosError.request) {
      // リクエストが行われたけれど、レスポンスが返ってこなかった場合
      return {
        status: -1,
        data: {
          message: 'no response',
        },
        headers: {},
      };
    } else {
      // リクエスト中に何らかのエラーが起きた時
      return {
        status: -2,
        data: {
          message: 'failed in request',
        },
        headers: {},
      };
    }
  }
};

type MakeHttpRequestArgs = {
  method: string;
  path: string;
  data?: object;
  params?: object;
};

const makeHttpRequest = async (args: MakeHttpRequestArgs) => {
  const { method, path, data, params } = args;
  const config = {
    method: method,
    url: path,
    ...(data && { data }), // dataが存在する場合、dataプロパティを設定
    ...(params && { params }), // paramsが存在する場合、paramsプロパティを設定
    ...(method !== 'get' && {
      headers: {
        'Content-Type': 'application/json', // 必要に応じて他のヘッダーを追加
      },
    }),
  };
  return await execRequest(config); // execRequest関数を呼び出してHTTPリクエストを実行
};

// メソッドの分岐を記述
export const http = {
  get: async (path: string, params: object) => makeHttpRequest({ method: 'get', path, params }),
  post: async (path: string, data: object) => makeHttpRequest({ method: 'post', path, data }),
  put: async (path: string, data: object) => makeHttpRequest({ method: 'put', path, data }),
  delete: async (path: string, data: object) => makeHttpRequest({ method: 'delete', path, data }),
};

// API エラーを自作して throw する関数
export const wrapper = async (res: CommonHTTPResponse): Promise<any> => {
  if (res.status < 200 || 300 <= res.status) {
    throw new APIError(res.status, res.data);
  }
  return res.data;
};

// リクエスト時に使用する
export const httpWrapper = {
  get: async (path: string, params: object): Promise<any> => {
    return wrapper(await http.get(path, params));
  },

  post: async (path: string, data: object): Promise<any> => {
    return wrapper(await http.post(path, data));
  },

  put: async (path: string, data: object): Promise<any> => {
    return wrapper(await http.put(path, data));
  },

  delete: async (path: string, data: object): Promise<any> => {
    return wrapper(await http.delete(path, data));
  },
};
