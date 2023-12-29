import {
  Button as ButtonMui,
  ButtonProps as ButtonMuiProps,
  CircularProgress,
} from '@mui/material';
type Props = ButtonMuiProps & { loading?: boolean; label: string };

export const Button = ({ loading = false, label, ...rest }: Props) => {
  return (
    <ButtonMui {...rest} disabled={loading || rest.disabled}>
      {loading && (
        <CircularProgress
          size={24}
          color="inherit"
          sx={{ position: 'absolute' }}
        />
      )}
      {label}
    </ButtonMui>
  );
};
