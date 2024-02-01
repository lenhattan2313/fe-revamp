import { Controller, useFormContext } from 'react-hook-form';
import { Input, InputProps } from './Input';

type Props = InputProps & { name: string };

export const FormInput = (props: Props) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={props.name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Input
          {...props}
          size="small"
          helperText={error ? error.message : null}
          error={!!error}
          onChange={onChange}
          value={value}
          sx={
            props.required
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
