const SkeltonTodoAndDone = (): JSX.Element => {
  return (
    <div className="mt-8">
      <div className="animate-pulse">
        <div className="h-20 w-full rounded-md bg-theme-light"></div>
      </div>

      <div className="mt-4 animate-pulse">
        <div className="h-20 w-full rounded-md bg-theme-light"></div>
      </div>
    </div>
  );
};

export default SkeltonTodoAndDone;
