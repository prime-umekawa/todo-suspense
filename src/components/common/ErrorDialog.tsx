import Button from '@/components/common/parts/Button';
import CommonDialog from '@/components/common/parts/CommonDialog';
import { useErrorDialog } from '@/hooks/common/useErrorDialog';

const ErrorDialog = (): JSX.Element => {
  const { dialog } = useErrorDialog();
  const { title, content, isOpen, actions } = dialog;

  return (
    <CommonDialog
      isOpen={isOpen}
      handleClose={actions[0].handleClick}
      className="flex max-w-xs flex-col items-center"
    >
      <h2 className="text-h3">{title}</h2>
      <p className="mt-4 text-body1">{content}</p>
      <div className="mt-6 flex justify-center gap-x-2">
        <Button variant="text" label="OK" onClick={actions[0].handleClick} />
      </div>
    </CommonDialog>
  );
};

export default ErrorDialog;
