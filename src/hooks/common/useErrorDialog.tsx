import { useCallback } from 'react';
import { useRecoilState } from 'recoil';

import { ErrorDialogState, errorDialogState } from '@/hooks/atom/errorDialogState';

// hook の戻り値
// ダイアログを open するための関数を返す
type UseErrorDialog = () => {
  dialog: ErrorDialogState;
  //エラー表示用
  openErrorDialog: (openMessageDialogArgs: { title: string; content?: string }) => Promise<void>;
};

export const useErrorDialog: UseErrorDialog = () => {
  const [dialog, setMessageDialog] = useRecoilState(errorDialogState);

  const handleClose = useCallback(() => {
    setMessageDialog({
      ...dialog,
      isOpen: false,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openErrorDialog = useCallback(
    (openErrorDialogArgs: { title: string; content?: string }): Promise<void> => {
      const { title, content } = openErrorDialogArgs;

      return new Promise((resolve: () => void) => {
        const okAction = {
          handleClick: () => {
            handleClose();
            resolve();
          },
        };
        const state: ErrorDialogState = {
          title: title,
          content: content,
          isOpen: true,
          actions: [okAction],
        };
        setMessageDialog(state);
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return {
    dialog,
    openErrorDialog,
  };
};
