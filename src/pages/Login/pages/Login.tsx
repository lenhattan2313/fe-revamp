import { Button, Input } from '@/components';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Box,
  IconButton,
  InputAdornment,
  Typography,
  useTheme,
} from '@mui/material';
import { useState } from 'react';
const Login = () => {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  function handleShowPassword() {
    setShowPassword((pre) => !pre);
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
        <Input label="Username" />
        <Input
          label="Password"
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
        <Button label="LOGIN" variant="contained" />
      </Box>
    </Box>
  );
};

export default Login;
