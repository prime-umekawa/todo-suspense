import Button from '@/components/common/parts/Button';
import CommonDialog from '@/components/common/parts/CommonDialog';
import RhfCheckboxLabel from '@/components/common/rhf/RhfCheckboxLabel';
import RhfInput from '@/components/common/rhf/RhfInput';
import { useTodoEdit } from '@/hooks/todo/useTodoEdit';
import { Task } from '@/lib/common/Task';

type Props = {
  task: Task;
};

const TodoEdit = (props: Props): JSX.Element => {
  const { task } = props;
  const {
    isOpen,
    control,
    handleOpen,
    handleClose,
    handleClickUpdate,
    handleTaskDelete,
    loadingTodoUpdate,
    loadingTodoDelete,
    isTaskChanged,
  } = useTodoEdit({ task });
  return (
    <>
      {/* ダイアログ */}
      <CommonDialog
        canCloseOtherClick={false}
        isOpen={isOpen}
        handleClose={handleClose}
        className="max-w-sm"
      >
        {/* タスク入力ラベル */}
        <div className="mb-3">
          <label className="text-h3">タスク名</label>
          <RhfInput name="title" control={control} className="mt-2 w-full" placeholder="タスク名" />
        </div>

        {/* 「達成済み」のチェックボックス */}
        <RhfCheckboxLabel label="達成済み" name="completed" control={control} />
        <div className="mt-8 flex space-x-2">
          {/* タスク名を変更する */}
          <Button
            onClick={handleClickUpdate}
            variant="primary"
            label="変更を保存"
            loading={loadingTodoUpdate}
            disabled={!isTaskChanged}
          />
          {/* タスクを削除 */}
          <Button
            loading={loadingTodoDelete}
            onClick={handleTaskDelete}
            variant="error"
            label="削除"
          />

          {/* 閉じる */}
          <Button onClick={handleClose} variant="text" label="閉じる" />
        </div>
      </CommonDialog>

      {/* タスクの表示 */}
      <span
        onClick={handleOpen}
        className="mr-2 cursor-pointer rounded-full bg-primary px-2 py-1 text-body2 text-white"
      >
        {task.title}
      </span>
    </>
  );
};

export default TodoEdit;
