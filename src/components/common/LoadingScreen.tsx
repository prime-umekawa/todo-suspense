import { ImSpinner3 } from 'react-icons/im';

const LoadingScreen = (): JSX.Element => {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-white">
      <ImSpinner3 size={32} className="animate-spin text-theme-medium" />
      <div className="mt-4 text-body3-medium text-theme-medium">データ取得中...</div>
    </div>
  );
};

export default LoadingScreen;
