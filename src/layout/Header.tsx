import useAuthStore, { initialAuthState } from '@/auth/useAuthStore';
import { useLogout } from '@/pages/Login/api/login';
import useNavbarStore from '@/store/useGlobalStore';
import {
  AccountCircle,
  Menu as MenuIcon,
  Notifications,
} from '@mui/icons-material';
import {
  Badge,
  Box,
  IconButton,
  Menu,
  MenuItem,
  AppBar as MuiAppBar,
  AppBarProps as MuiAppBarProps,
  Toolbar,
  styled,
} from '@mui/material';
import { useState } from 'react';

export const Header = () => {
  const isMenuOpen = useNavbarStore((state) => state.isMenuOpen);
  const toggleMenu = useNavbarStore((state) => state.toggleMenu);
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);

  function handleProfileMenuOpen(event: React.MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget);
  }
  function handleMenuClose() {
    setAnchorEl(null);
  }
  function handleDrawerOpen() {
    toggleMenu(true);
  }
  const { mutate: logoutAction, isLoading: isLogoutLoading } = useLogout();
  function handleLogout() {
    logoutAction(undefined, {
      onSuccess: () => {
        setAuthenticated(initialAuthState);
      },
    });
  }
  return (
    <Box>
      <AppBar position="fixed" sx={{ height: '3rem' }} open={isMenuOpen}>
        <Toolbar sx={{ minHeight: '3rem !important' }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            sx={{ mr: 2, ...(isMenuOpen && { display: 'none' }) }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Box>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <Notifications fontSize="small" />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle fontSize="small" />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        keepMounted
        open={isOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        <MenuItem onClick={handleLogout} disabled={isLogoutLoading}>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
};
const drawerWidth = 240;
interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
