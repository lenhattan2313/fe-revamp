import { Box } from '@mui/material';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Navbar } from './Narbar';

export const BasicLayout = () => {
  const [open, setOpen] = useState(true);
  return (
    <Box sx={{ display: 'flex' }}>
      <Header open={open} setOpen={setOpen} />
      <Navbar open={open} setOpen={setOpen} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Box sx={{ minHeight: '2rem' }} />
        <Outlet />
        <h1>footer</h1>
      </Box>
    </Box>
  );
};
