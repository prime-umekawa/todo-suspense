import TodoEdit from '@/components/todo/TodoEdit';
import { useTodoAndDone } from '@/hooks/todo/useTodoAndDone';

const TodoAndDone = (): JSX.Element => {
  const { completedTasks, notCompletedTasks } = useTodoAndDone();
  return (
    <>
      {/* TO DO を表示 */}
      <div className="mt-8 rounded-md border p-4">
        <h2 className="mb-3 text-h3">TODO</h2>
        {notCompletedTasks.map((task) => (
          <TodoEdit task={{ ...task }} key={task.id} />
        ))}
      </div>

      {/* Done を表示 */}
      <div className="mt-4 rounded-md border p-4">
        <h2 className="mb-3 text-h3">DONE</h2>
        {completedTasks.map((task) => (
          <TodoEdit task={{ ...task }} key={task.id} />
        ))}
      </div>
    </>
  );
};

export default TodoAndDone;
