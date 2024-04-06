/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import { httpWrapper } from '@/lib/api/apibase';
import { Task } from '@/lib/common/Task';

const api = {
  url: (): string => '/todo/todo',
  todoGet: async (): Promise<Task[]> => {
    const data = await httpWrapper.get('/api/todo/get_tasks', {});
    return data.records.map((record: any) => new Task(record));
  },
  todoAdd: async (title: string): Promise<void> => {
    const body = {
      title,
    };
    await httpWrapper.post('/api/todo/add_task', body);
  },
  todoUpdate: async (
    id: string,
    fields: { title?: string; completed?: boolean },
  ): Promise<void> => {
    const body = {
      id,
      fields,
    };
    await httpWrapper.post('/api/todo/update_task', body);
  },
  todoDelete: async (id: string): Promise<void> => {
    const body = {
      id,
    };
    await httpWrapper.delete('/api/todo/delete_task', body);
  },
};

export default api;
