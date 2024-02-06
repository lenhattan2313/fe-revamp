import useAuthStore from '@/auth/useAuthStore';
import { Button, FormInput } from '@/components';
import { useAlert } from '@/hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Box,
  IconButton,
  InputAdornment,
  Typography,
  useTheme,
} from '@mui/material';
import { KeyboardEvent, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useLogin } from '../api/login';
import { IFormLoginData } from '../types/ILogin';
const Login = () => {
  const { showSnackbar } = useAlert();
  const theme = useTheme();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  function handleShowPassword() {
    setShowPassword((pre) => !pre);
  }
  const validateSchema = yup.object().shape({
    email: yup.string().required('Field is required!'),
    password: yup.string().required('Field is required!'),
  });
  const form = useForm<IFormLoginData>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(validateSchema),
  });
  const { handleSubmit } = form;
  const { mutate: loginAction, isLoading } = useLogin();

  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);
  function onSubmit(data: IFormLoginData) {
    if (!data) return;
    loginAction(data, {
      onError: (error) => {
        showSnackbar(error.message, 'error');
      },
      onSuccess: (data) => {
        const {
          shop,
          token: { accessToken, refreshToken },
        } = data.metadata;

        setAuthenticated({
          isAuthenticated: true,
          accessToken,
          refreshToken,
          shopId: shop._id,
        });
        navigate('../'); //goto home page
      },
    });
  }
  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter' || event.keyCode === 13) {
      handleSubmit(onSubmit)();
    }
  }
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: theme.palette.background.default,
      }}
    >
      <Box
        sx={{
          padding: 4,
          background: theme.palette.background.paper,
          borderRadius: 1,
          boxShadow: 0.5,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Typography variant="h5">Welcome</Typography>
        <FormProvider {...form}>
          <FormInput name="email" label="Email" required />
          <FormInput
            name="password"
            label="Password"
            required
            type={showPassword ? 'text' : 'password'}
            onKeyDown={handleKeyDown}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleShowPassword}
                    edge="end"
                    tabIndex={-1}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </FormProvider>

        <Button
          label="LOGIN"
          type="submit"
          variant="contained"
          loading={isLoading}
          onClick={handleSubmit(onSubmit)}
        />
      </Box>
    </Box>
  );
};

export default Login;
