import { Box, useMediaQuery } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Navbar } from './Narbar';
import { useEffect } from 'react';
import useNavbarStore from '@/store/useGlobalStore';

export const BasicLayout = () => {
  const toggleMenu = useNavbarStore((state) => state.toggleMenu);
  const matches = useMediaQuery('(max-width:600px)');
  useEffect(() => {
    if (matches) {
      toggleMenu(false);
    } else {
      toggleMenu(true);
    }
  }, [toggleMenu, matches]);

  return (
    <Box sx={{ display: 'flex' }}>
      <Header />
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Box sx={{ minHeight: '2rem' }} />
        <Outlet />
      </Box>
    </Box>
  );
};
