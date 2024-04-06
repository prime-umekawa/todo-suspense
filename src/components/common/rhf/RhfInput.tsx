import { FieldValues, useController, UseControllerProps } from 'react-hook-form';

type InputProps<T extends FieldValues> = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'name'> &
  Pick<UseControllerProps<T>, 'name' | 'control'>;

const RhfInput = <T extends FieldValues>(props: InputProps<T>): JSX.Element => {
  const { name, control, className = '', ...inputAttributes } = props;
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <>
      <input
        className={`rounded border px-4 py-2 text-input outline-none placeholder:text-theme-medium focus:border-primary ${
          error ? 'border-error' : 'border-theme-medium'
        } ${className}`}
        {...field}
        {...inputAttributes}
      />
      {error && (
        <div className="mt-1 text-body3 text-error">
          <span>{error.message}</span>
        </div>
      )}
    </>
  );
};

export default RhfInput;
