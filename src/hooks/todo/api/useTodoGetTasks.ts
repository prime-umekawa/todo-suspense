import { useSWRSuspense } from '@/hooks/common/useSWRSuspense';
import { APIError } from '@/lib/api/error';
import api from '@/lib/api/todo';
import { Task } from '@/lib/common/Task';

type UseTodoGetTasks = () => {
  taskList: Task[];
};

export const useTodoGetTasks: UseTodoGetTasks = () => {
  const { data } = useSWRSuspense<Task[], APIError>(
    api.url(),
    (): Promise<Task[]> => api.todoGet(),
  );

  return { taskList: data };
};
