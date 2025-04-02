import { AppBar, Toolbar, Typography, Button, IconButton, Badge, Box } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useSelector } from 'react-redux';
import { RootState } from '../../features/store';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { items: cartItems } = useSelector((state: RootState) => state.cart);
  const { items: likedProducts } = useSelector((state: RootState) => state.likedProducts);
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={() => navigate('/')}>
          HomeDeco
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton color="inherit" onClick={() => navigate('/liked-products')}>
            <Badge badgeContent={likedProducts.length} color="error">
              <FavoriteIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit" onClick={() => navigate('/cart')}>
            <Badge badgeContent={cartItems.length} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 