import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Box,
  Container,
} from '@mui/material';
import {
  ShoppingCart as CartIcon,
  Person as PersonIcon,
  Menu as MenuIcon,
  Favorite as FavoriteIcon,
} from '@mui/icons-material';
import { RootState } from '../../features/store';

const Header = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const likedProducts = useSelector((state: RootState) => state.likedProducts.items);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="sticky" color="default" elevation={1}>
      <Box sx={{ width:"90%", mx:"auto" }}>
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'primary.main',
              fontWeight: 700,
            }}
          >
           STYLEHUB
          </Typography>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            <Button color="inherit" component={RouterLink} to="/products">
              Products
            </Button>
            <Button color="inherit" component={RouterLink} to="/about">
              About
            </Button>
            
            <IconButton
              color="inherit"
              onClick={() => navigate('/liked-products')}
              sx={{ ml: 1 }}
            >
              <Badge badgeContent={likedProducts.length} color="error">
                <FavoriteIcon />
              </Badge>
            </IconButton>

            <IconButton
              color="inherit"
              onClick={() => navigate('/cart')}
              sx={{ ml: 1 }}
            >
              <Badge badgeContent={cartItems.length} color="secondary">
                <CartIcon />
              </Badge>
            </IconButton>

            {isAuthenticated ? (
              <IconButton
                color="inherit"
                onClick={() => navigate('/dashboard')}
              >
                <PersonIcon />
              </IconButton>
            ) : (
              <Button color="inherit" component={RouterLink} to="/login">
                Login
              </Button>
            )}
          </Box>

          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              color="inherit"
              aria-label="menu"
              onClick={handleMenuOpen}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem
                onClick={() => {
                  navigate('/products');
                  handleMenuClose();
                }}
              >
                Products
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate('/about');
                  handleMenuClose();
                }}
              >
                About
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate('/liked-products');
                  handleMenuClose();
                }}
              >
                Liked Products ({likedProducts.length})
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate('/cart');
                  handleMenuClose();
                }}
              >
                Cart ({cartItems.length})
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate(isAuthenticated ? '/dashboard' : '/login');
                  handleMenuClose();
                }}
              >
                {isAuthenticated ? 'Dashboard' : 'Login'}
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Box>
    </AppBar>
  );
};

export default Header; 