import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Typography,
  Button,
  Rating,
  Tabs,
  Tab,
  Paper,
  Divider,
  TextField,
  Alert,
  CircularProgress,
  Chip,
  Container,
  Grid,
  IconButton,
  useTheme,
  useMediaQuery,
  Skeleton,
  Avatar,
  Snackbar,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { RootState, AppDispatch } from '../features/store';
import { addItem } from '../features/cart/cartSlice';
import { fetchProductById } from '../features/products/productsSlice';
import ProductImageSkeleton from '../components/skeletons/ProductImageSkeleton';
import ProductSpecsSkeleton from '../components/skeletons/ProductSpecsSkeleton';
import ProductReviewsSkeleton from '../components/skeletons/ProductReviewsSkeleton';
import MotionWrapper from '../components/MotionWrapper';
import { generateSpecifications, generateReviews } from '../utils/productData';
import { toggleLike } from '../features/likedProducts/likedProductsSlice';
import { fadeIn, slideUp, scaleIn, cardHover, buttonHover, staggerContainer } from '../utils/animationVariants';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`product-tabpanel-${index}`}
      aria-labelledby={`product-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState(0);
  const [showAddedToCart, setShowAddedToCart] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [specifications, setSpecifications] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const { items: likedProducts } = useSelector((state: RootState) => state.likedProducts);
  const [showShareSuccess, setShowShareSuccess] = useState(false);
  const [shareMessage, setShareMessage] = useState('');

  const { selectedProduct: productState, loading: productLoading, error } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await response.json();
        setProduct(data);
        
        // Generate specifications and reviews
        setSpecifications(generateSpecifications(data.category));
        setReviews(generateReviews(5));
        
        // Fetch related products (same category)
        const categoryResponse = await fetch(`https://fakestoreapi.com/products/category/${data.category}`);
        const categoryData = await categoryResponse.json();
        setRelatedProducts(categoryData.filter((p: any) => p.id !== data.id).slice(0, 4));
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      dispatch(
        addItem({
          id: product.id,
          name: product.title,
          price: product.price,
          image: product.image,
          quantity,
        })
      );
      setShowAddedToCart(true);
      setTimeout(() => setShowAddedToCart(false), 3000);
    }
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleLikeClick = () => {
    if (product) {
      dispatch(toggleLike({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
      }));
    }
  };

  const handleShare = async () => {
    if (!product) return;

    const shareData = {
      title: product.title,
      text: `Check out ${product.title} on StyleHub!`,
      url: window.location.href,
    };

    try {
      // Try to use the Web Share API if available
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback to copying to clipboard
        await navigator.clipboard.writeText(window.location.href);
        setShareMessage('Link copied to clipboard!');
        setShowShareSuccess(true);
      }
    } catch (error) {
      console.error('Error sharing:', error);
      // Fallback to copying to clipboard if Web Share API fails
      try {
        await navigator.clipboard.writeText(window.location.href);
        setShareMessage('Link copied to clipboard!');
        setShowShareSuccess(true);
      } catch (clipboardError) {
        console.error('Error copying to clipboard:', clipboardError);
        setShareMessage('Failed to share product');
        setShowShareSuccess(true);
      }
    }
  };

  const renderSpecifications = () => (
    <Paper sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>
        Product Specifications
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {specifications.map((spec, index) => (
          <Box key={index} sx={{ display: 'flex', gap: 2 }}>
            <Typography variant="subtitle2" color="text.secondary" sx={{ minWidth: 150 }}>
              {spec.category}
            </Typography>
            <Typography>{spec.value}</Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  );

  const renderReviews = () => (
    <Paper sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>
        Customer Reviews
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {reviews.map((review) => (
          <Box key={review.id}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
              <Avatar>{review.userName[0].toUpperCase()}</Avatar>
              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle1">{review.userName}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Rating value={review.rating} readOnly size="small" />
                  <Typography variant="body2" color="text.secondary">
                    {review.date}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <ThumbUpIcon fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary">
                  {review.helpful}
                </Typography>
              </Box>
            </Box>
            <Typography variant="body1" sx={{ ml: 7 }}>
              {review.comment}
            </Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  );

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' },
          gap: 4
        }}>
          <Box sx={{ 
            flex: { xs: '1 1 100%', md: '0 0 50%' }
          }}>
            <MotionWrapper>
              <ProductImageSkeleton height={400} />
            </MotionWrapper>
          </Box>
          <Box sx={{ 
            flex: { xs: '1 1 100%', md: '0 0 50%' }
          }}>
            <MotionWrapper delay={0.1}>
              <Box sx={{ mb: 3 }}>
                <Skeleton variant="text" width="80%" height={40} sx={{ mb: 2 }} />
                <Skeleton variant="text" width="40%" height={24} sx={{ mb: 2 }} />
                <Skeleton variant="text" width="30%" height={24} />
              </Box>
              <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <Skeleton variant="rectangular" width={120} height={40} sx={{ borderRadius: 1 }} />
              </Box>
              <Skeleton variant="text" width="100%" height={100} />
            </MotionWrapper>
          </Box>
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Box  sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button variant="contained" onClick={() => navigate('/products')}>
          Back to Products
        </Button>
      </Box>
    );
  }

  if (!product) {
    return (
      <Box sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          Product not found
        </Alert>
        <Button variant="contained" onClick={() => navigate('/products')}>
          Back to Products
        </Button>
      </Box>
    );
  }

  const isLiked = likedProducts.some(item => item.id === product.id);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <MotionWrapper variant="page">
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' },
          gap: 4
        }}>
          {/* Main Product Section */}
          <Box sx={{ 
            flex: { xs: '1 1 100%', md: '0 0 50%' }
          }}>
            <MotionWrapper variant="fade" delay={0.2}>
              <Box 
                component={motion.div}
                variants={cardHover}
                sx={{ position: 'relative', mb: 2 }}
              >
                <ProductImageSkeleton height={400} />
                <img
                  src={product.image}
                  alt={product.title}
                  style={{
                    width: '100%',
                    height: '400px',
                    objectFit: 'contain',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                  }}
                />
              </Box>
              {relatedProducts.length > 0 && (
                <Box sx={{ mt: 4 }}>
                  <Typography variant="h6" gutterBottom>
                    Related Products
                  </Typography>
                  <Box 
                    component={motion.div}
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                    sx={{ 
                      display: 'grid',
                      gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' },
                      gap: 2
                    }}
                  >
                    {relatedProducts.map((relatedProduct, index) => (
                      <Paper
                        key={relatedProduct.id}
                        component={motion.div}
                        variants={cardHover}
                        whileHover="hover"
                        sx={{ p: 1, cursor: 'pointer' }}
                        onClick={() => setSelectedImage(relatedProduct.id)}
                      >
                        <img
                          src={relatedProduct.image}
                          alt={relatedProduct.title}
                          style={{
                            width: '100%',
                            height: '100px',
                            objectFit: 'contain',
                          }}
                        />
                      </Paper>
                    ))}
                  </Box>
                </Box>
              )}
            </MotionWrapper>
          </Box>

          {/* Product Info Section */}
          <Box sx={{ 
            flex: { xs: '1 1 100%', md: '0 0 50%' }
          }}>
            <MotionWrapper variant="slideUp" delay={0.3}>
              <Typography variant="h4" gutterBottom>
                {product.title}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Rating value={product.rating?.rate || 0} precision={0.5} readOnly />
                <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                  ({product.rating?.count || 0} reviews)
                </Typography>
              </Box>
              <Typography variant="h5" color="primary" gutterBottom>
                ${product.price.toFixed(2)}
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <Button
                  component={motion.button}
                  variants={buttonHover}
                  whileHover="hover"
                  variant="contained"
                  startIcon={<ShoppingCartIcon />}
                  onClick={handleAddToCart}
                  sx={{ borderRadius: 2 }}
                >
                  Add to Cart
                </Button>
                <IconButton
                  component={motion.button}
                  variants={buttonHover}
                  whileHover="hover"
                  onClick={handleLikeClick}
                  sx={{
                    bgcolor: 'background.paper',
                    '&:hover': { bgcolor: 'background.paper' },
                  }}
                >
                  <FavoriteIcon color={isLiked ? 'error' : 'inherit'} />
                </IconButton>
                <IconButton
                  component={motion.button}
                  variants={buttonHover}
                  whileHover="hover"
                  onClick={handleShare}
                  sx={{
                    bgcolor: 'background.paper',
                    '&:hover': { bgcolor: 'background.paper' },
                  }}
                >
                  <ShareIcon />
                </IconButton>
              </Box>
              <Typography variant="body1" paragraph>
                {product.description}
              </Typography>

              {/* Tabs Section */}
              <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 4 }}>
                <Tabs value={activeTab} onChange={handleTabChange}>
                  <Tab label="Specifications" />
                  <Tab label="Reviews" />
                  <Tab label="Shipping" />
                </Tabs>
              </Box>

              <AnimatePresence mode="wait">
                <TabPanel value={activeTab} index={0}>
                  {loading ? <ProductSpecsSkeleton /> : renderSpecifications()}
                </TabPanel>
                <TabPanel value={activeTab} index={1}>
                  {loading ? <ProductReviewsSkeleton /> : renderReviews()}
                </TabPanel>
                <TabPanel value={activeTab} index={2}>
                  <Typography variant="body1">
                    Free shipping on orders over $50. Standard delivery takes 3-5 business days.
                  </Typography>
                </TabPanel>
              </AnimatePresence>
            </MotionWrapper>
          </Box>
        </Box>
      </MotionWrapper>

      <Snackbar
        open={showShareSuccess}
        autoHideDuration={3000}
        onClose={() => setShowShareSuccess(false)}
        message={shareMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Container>
  );
};

export default ProductDetails; 