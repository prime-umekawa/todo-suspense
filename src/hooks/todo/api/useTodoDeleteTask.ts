import { useState } from 'react';
import { mutate } from 'swr';

import { useErrorDialog } from '@/hooks/common/useErrorDialog';
import { APIError, ErrorCode } from '@/lib/api/error';
import api from '@/lib/api/todo';
import { message } from '@/lib/data/message';

type UseTodoDeleteTask = () => {
  execute: (id: string) => Promise<boolean>;
  loading: boolean;
};

export const useTodoDeleteTask: UseTodoDeleteTask = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { openErrorDialog } = useErrorDialog();

  const execute = async (id: string) => {
    let ret = true;
    setLoading(true);
    try {
      // タスクを削除
      await api.todoDelete(id);
    } catch (e) {
      if (e instanceof APIError) {
        switch (e.code) {
          case ErrorCode.BadRequest:
            await openErrorDialog(message.todo.badRequest);
            break;
          default:
            await openErrorDialog(message.todo.internalServerError);
        }
      } else {
        await openErrorDialog(message.todo.internalServerError);
      }
      ret = false;
    }
    // キャッシュ削除・再フェッチ
    void mutate(api.url());
    setLoading(false);
    return ret;
  };

  return {
    execute,
    loading,
  };
};
