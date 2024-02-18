import useAuthStore from '@/auth/useAuthStore';
import { Button, FormInput } from '@/components';
import { useAlert } from '@/hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import { ArrowBack, Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Box,
  IconButton,
  InputAdornment,
  Typography,
  useTheme,
} from '@mui/material';
import { KeyboardEvent, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useSignUp } from '../api/login';
import { IFormSignUpData, IShowPasswordConfirm } from '../types/ILogin';
const SignUp = () => {
  const { showSnackbar } = useAlert();
  const theme = useTheme();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<IShowPasswordConfirm>({
    password: false,
    confirmPassword: false,
  });
  function handleShowPassword(type: keyof IShowPasswordConfirm) {
    setShowPassword((pre) => ({ ...pre, [type]: !pre[type] }));
  }
  const validateSchema = yup.object().shape({
    name: yup.string().required('Field is required!'),
    email: yup.string().required('Field is required!'),
    password: yup.string().required('Field is required!'),
    confirmPassword: yup.string().required('Field is required!'),
  });
  const form = useForm<IFormSignUpData>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(validateSchema),
  });
  const { handleSubmit } = form;
  const { mutate: signUpAction, isLoading } = useSignUp();

  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);
  function onSubmit(data: IFormSignUpData) {
    if (!data) return;
    if (data.confirmPassword !== data.password) {
      showSnackbar('Passwords do not match ', 'error');
      return;
    }
    signUpAction(data, {
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
        <Typography variant="h5">Create Account</Typography>
        <FormProvider {...form}>
          <FormInput name="name" label="Name" required />
          <FormInput name="email" label="Email" required />
          <FormInput
            name="password"
            label="Password"
            required
            type={showPassword.password ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => handleShowPassword('password')}
                    edge="end"
                    tabIndex={-1}
                  >
                    {showPassword.password ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <FormInput
            name="confirmPassword"
            label="Confirm Password"
            required
            type={showPassword.confirmPassword ? 'text' : 'password'}
            onKeyDown={handleKeyDown}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => handleShowPassword('confirmPassword')}
                    edge="end"
                    tabIndex={-1}
                  >
                    {showPassword.confirmPassword ? (
                      <Visibility />
                    ) : (
                      <VisibilityOff />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </FormProvider>

        <Button
          label="SIGN UP"
          type="submit"
          variant="contained"
          loading={isLoading}
          onClick={handleSubmit(onSubmit)}
        />
        <Box
          to={'/login'}
          component={Link}
          sx={{
            textDecoration: 'none',
            color: theme.palette.primary.main,
            fontSize: '0.8rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: 1,
          }}
        >
          <ArrowBack fontSize="small" />
          Back to login
        </Box>
      </Box>
    </Box>
  );
};

export default SignUp;
