import { Button, FormInput } from '@/components';
import { yupResolver } from '@hookform/resolvers/yup';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Box,
  IconButton,
  InputAdornment,
  Typography,
  useTheme,
} from '@mui/material';
import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import * as yup from 'yup';
import { IFormLoginData } from '../types/ILogin';
import { useLogin } from '../api/login';
const Login = () => {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  function handleShowPassword() {
    setShowPassword((pre) => !pre);
  }
  const validateSchema = yup.object().shape({
    userName: yup.string().required('Field is required!'),
    password: yup.string().required('Field is required!'),
  });
  const form = useForm<IFormLoginData>({
    defaultValues: {
      userName: '',
      password: '',
    },
    resolver: yupResolver(validateSchema),
  });
  const { handleSubmit } = form;
  const { mutate: login, isLoading } = useLogin();

  function onSubmit(data: IFormLoginData) {
    login(data, {
      onError: (error) => {
        console.log(error);
      },
      onSuccess: () => {},
    });
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
          <FormInput name="userName" label="Username" required />
          <FormInput
            name="password"
            label="Password"
            required
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </FormProvider>

        <Button
          label="LOGIN"
          variant="contained"
          loading={isLoading}
          onClick={handleSubmit(onSubmit)}
        />
      </Box>
    </Box>
  );
};

export default Login;
