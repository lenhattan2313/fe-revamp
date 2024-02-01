import { TextField, TextFieldProps } from '@mui/material';

export type InputProps = TextFieldProps;

export const Input = ({ size = 'small', ...rest }: InputProps) => {
  return (
    <TextField
      {...rest}
      fullWidth
      size={size}
      autoComplete="on"
      id={rest.name}
    />
  );
};
