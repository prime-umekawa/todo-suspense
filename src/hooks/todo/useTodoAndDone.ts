import { useMemo } from 'react';

import { useTodoGetTasks } from '@/hooks/todo/api/useTodoGetTasks';
import { Task } from '@/lib/common/Task';

type UseTodoAndDone = () => { notCompletedTasks: Task[]; completedTasks: Task[] };

export const useTodoAndDone: UseTodoAndDone = () => {
  // タスクを取得
  const { taskList } = useTodoGetTasks();

  // ま状態成されていない（To Do 状態）のタスク
  const notCompletedTasks = useMemo(() => taskList.filter((task) => !task.completed), [taskList]);

  // 達成された（Done 状態）のタスク
  const completedTasks = useMemo(() => taskList.filter((task) => task.completed), [taskList]);

  return {
    notCompletedTasks,
    completedTasks,
  };
};
