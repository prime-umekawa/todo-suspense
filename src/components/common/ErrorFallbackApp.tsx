import { FallbackProps } from 'react-error-boundary';

import ErrorPage from '@/components/common/ErrorPage';
import { APIError } from '@/lib/api/error';

const ErrorFallbackApp = (props: FallbackProps): JSX.Element => {
  const apiError = props.error as APIError;

  console.log('ERROR', { apiError });
  return <ErrorPage message={`${apiError.message}。エラーコード: ${apiError.code}`} />;
};
export default ErrorFallbackApp;
