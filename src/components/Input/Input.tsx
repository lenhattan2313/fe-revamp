import { TextField, TextFieldProps } from '@mui/material';

type Props = TextFieldProps;

export const Input = ({ size = 'small', ...rest }: Props) => {
  return <TextField {...rest} fullWidth size={size} />;
};
