import { Controller, useFormContext } from 'react-hook-form';
import { Input, InputProps } from './Input';

type Props = InputProps & { name: string };

export const FormInput = ({ name, required, ...rest }: Props) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Input
          {...rest}
          size="small"
          helperText={error ? error.message : null}
          error={!!error}
          onChange={onChange}
          value={value}
          required={required}
          sx={
            required
              ? {
                  '& .MuiFormLabel-asterisk': { color: 'red' },
                }
              : undefined
          }
        />
      )}
    />
  );
};
