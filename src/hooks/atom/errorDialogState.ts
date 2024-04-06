import { atom } from 'recoil';

import { __log } from '@/lib/common/log';

// ボタンへの設定
export type ErrorDialogAction = {
  handleClick: () => void;
};

export type ErrorDialogState = {
  title: string;
  content?: string;
  isOpen: boolean;
  actions: ErrorDialogAction[];
  labels?: (string | undefined)[];
};

export const errorDialogState = atom<ErrorDialogState>({
  key: 'errorDialogState',
  default: {
    title: '',
    content: '',
    isOpen: false,
    actions: [
      {
        handleClick: () => {
          // eslint-disable-next-line no-console
          __log('do nothing');
        },
      },
    ],
  },
});
