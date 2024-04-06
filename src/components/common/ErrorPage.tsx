type ErrorPageProps = {
  message: string;
  Button?: React.ReactNode;
  currentPath?: string;
};

const ErrorPage = (props: ErrorPageProps): JSX.Element => {
  const { message, Button } = props;

  return (
    <>
      <div className="flex min-h-screen flex-col">
        <main className="flex flex-1 items-center justify-center">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col items-center">
              <h1 className="text-4xl text-primary">ERROR</h1>
              <p className="mt-6 text-center text-body2 leading-loose">{message}</p>
              {Button && <div className="mt-14">{Button}</div>}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default ErrorPage;
