import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../features/store';
import {
  Box,
  Container,
  Typography,
  Paper,
  IconButton,
} from '@mui/material';
import { motion } from 'framer-motion';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { toggleLike } from '../features/likedProducts/likedProductsSlice';
import MotionWrapper from '../components/MotionWrapper';
import { useNavigate } from 'react-router-dom';
import { LikedProduct } from '../features/likedProducts/likedProductsSlice';

const LikedProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: likedProducts } = useSelector((state: RootState) => state.likedProducts);

  const handleLikeClick = (product: LikedProduct) => {
    dispatch(toggleLike(product));
  };

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  if (likedProducts.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <MotionWrapper>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom>
              No liked products yet
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Products you like will appear here
            </Typography>
          </Box>
        </MotionWrapper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <MotionWrapper>
        <Typography variant="h4" gutterBottom>
          Liked Products
        </Typography>
      </MotionWrapper>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 3, mt: 2 }}>
        {likedProducts.map((product: LikedProduct, index: number) => (
          <MotionWrapper key={product.id} delay={index * 0.1}>
            <Paper
              component={motion.div}
              whileHover={{ scale: 1.02 }}
              sx={{
                p: 2,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                cursor: 'pointer',
              }}
              onClick={() => handleProductClick(product.id)}
            >
              <Box sx={{ position: 'relative', mb: 2 }}>
                <img
                  src={product.image}
                  alt={product.title}
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'contain',
                  }}
                />
                <IconButton
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    bgcolor: 'background.paper',
                    '&:hover': {
                      bgcolor: 'background.paper',
                    },
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLikeClick(product);
                  }}
                >
                  <FavoriteIcon color="error" />
                </IconButton>
              </Box>
              <Typography variant="h6" gutterBottom>
                {product.title}
              </Typography>
              <Typography variant="h6" color="primary">
                ${product.price.toFixed(2)}
              </Typography>
            </Paper>
          </MotionWrapper>
        ))}
      </Box>
    </Container>
  );
};

export default LikedProducts; 