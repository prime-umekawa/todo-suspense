import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Control, useForm } from 'react-hook-form';
import * as z from 'zod';

import { useTodoAddTask } from '@/hooks/todo/api/useTodoAddTask';

const schema = z.object({
  title: z.string().min(1, 'タスク名を入力してください').max(50, '50文字以内で入力してください'),
});

type TaskInput = z.infer<typeof schema>;

const DEFAULT_TASK_INPUT = {
  title: '',
};

type UseTodoAdd = () => {
  isOpen: boolean;
  control: Control<TaskInput>;
  handleOpen: () => void;
  handleClose: () => void;
  handleClickUpdate: () => Promise<void>;
  loadingApiTodoAdd: boolean;
};

export const useTodoAdd: UseTodoAdd = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { control, handleSubmit, reset } = useForm<TaskInput>({
    resolver: zodResolver(schema),
    defaultValues: DEFAULT_TASK_INPUT,
  });
  const handleClose = () => {
    setIsOpen(false);
    reset();
  };
  const handleOpen = () => {
    setIsOpen(true);
  };

  // タスクを追加
  const apiTodoAdd = useTodoAddTask();
  const onSubmit = async (data: TaskInput) => {
    const { title } = data;
    const isSuccess = await apiTodoAdd.execute(title);
    if (!isSuccess) {
      return; // 何もしない
    }
    reset();
    handleClose();
  };

  return {
    isOpen,
    control,
    handleOpen,
    handleClose,
    handleClickUpdate: handleSubmit(onSubmit),
    loadingApiTodoAdd: apiTodoAdd.loading,
  };
};
