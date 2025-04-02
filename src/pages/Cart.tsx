import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  Paper,
  Skeleton,
} from '@mui/material';
import { RootState } from '../features/store';
import { updateQuantity, removeItem } from '../features/cart/cartSlice';
import { Link } from 'react-router-dom';
import CartItemSkeleton from '../components/skeletons/CartItemSkeleton';
import MotionWrapper from '../components/MotionWrapper';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, total } = useSelector((state: RootState) => state.cart);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  const handleRemoveItem = (id: string) => {
    dispatch(removeItem(id));
  };

  if (items.length === 0) {
    return (
      <Box sx={{ p: 0, width: '85%', margin: 'auto' }}>
        <MotionWrapper>
          <Box sx={{ 
            py: 8, 
            textAlign: 'center', 
            width: '100%',
            bgcolor: '#F5F5F5',
            minHeight: '60vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Typography variant="h5" gutterBottom>
              Your cart is empty
            </Typography>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/products"
              sx={{ mt: 2 }}
            >
              Continue Shopping
            </Button>
          </Box>
        </MotionWrapper>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 0, width: '85%', margin: 'auto' }}>
      <Box sx={{ 
        py: { xs: 4, md: 6 },
        px: { xs: 2, sm: 4, md: 6 },
        bgcolor: '#F5F5F5',
        minHeight: '60vh'
      }}>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' },
          gap: { xs: 4, md: 6 }
        }}>
          {/* Cart Items Section */}
          <Box sx={{ flex: { xs: '1', md: '2' } }}>
            <MotionWrapper>
              <Typography variant="h5" sx={{ mb: 3 }}>Shopping Cart</Typography>
            </MotionWrapper>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {isLoading ? (
                [...Array(2)].map((_, index) => (
                  <MotionWrapper key={index} delay={index * 0.1}>
                    <CartItemSkeleton />
                  </MotionWrapper>
                ))
              ) : (
                items.map((item, index) => (
                  <MotionWrapper key={item.id} delay={index * 0.1}>
                    <Paper 
                      component={motion.div}
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "tween" }}
                      sx={{ 
                        p: { xs: 2, md: 3 },
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        gap: { xs: 2, sm: 3 },
                        alignItems: { sm: 'center' }
                      }}
                    >
                      <Box sx={{ 
                        width: { xs: '100%', sm: '180px' },
                        height: { xs: '200px', sm: '180px' },
                        position: 'relative'
                      }}>
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{ 
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: '8px'
                          }}
                        />
                      </Box>
                      <Box sx={{ 
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1
                      }}>
                        <Typography variant="h6">{item.name}</Typography>
                        <Typography variant="h6" color="primary">
                          ${item.price.toFixed(2)}
                        </Typography>
                        <Box sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: 2,
                          mt: { xs: 1, md: 2 }
                        }}>
                          <TextField
                            type="number"
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                            size="small"
                            sx={{ 
                              width: { xs: '100px', md: '120px' },
                              '& .MuiOutlinedInput-root': {
                                borderRadius: '8px'
                              }
                            }}
                          />
                          <Button
                            color="error"
                            variant="outlined"
                            onClick={() => handleRemoveItem(item.id)}
                            sx={{ 
                              borderRadius: '8px',
                              minWidth: '100px'
                            }}
                          >
                            Remove
                          </Button>
                        </Box>
                      </Box>
                    </Paper>
                  </MotionWrapper>
                ))
              )}
            </Box>
          </Box>

          {/* Order Summary Section */}
          <Box sx={{ 
            flex: { xs: '1', md: '1' },
            height: 'fit-content'
          }}>
            <MotionWrapper delay={0.2}>
              <Paper sx={{ p: 3, borderRadius: '12px' }}>
                <Typography variant="h5" gutterBottom>
                  Order Summary
                </Typography>
                <Box sx={{ mt: 3 }}>
                  {isLoading ? (
                    <>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Skeleton width={80} height={24} />
                        <Skeleton width={60} height={24} />
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Skeleton width={80} height={24} />
                        <Skeleton width={60} height={24} />
                      </Box>
                      <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        mt: 3,
                        pt: 3,
                        borderTop: 1,
                        borderColor: 'divider'
                      }}>
                        <Skeleton width={80} height={28} />
                        <Skeleton width={80} height={28} />
                      </Box>
                    </>
                  ) : (
                    <>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography color="text.secondary">Subtotal</Typography>
                        <Typography>${total.toFixed(2)}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography color="text.secondary">Shipping</Typography>
                        <Typography>Free</Typography>
                      </Box>
                      <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        mt: 3,
                        pt: 3,
                        borderTop: 1,
                        borderColor: 'divider'
                      }}>
                        <Typography variant="h6">Total</Typography>
                        <Typography variant="h6">${total.toFixed(2)}</Typography>
                      </Box>
                    </>
                  )}
                </Box>
                <Button
                  variant="contained"
                  fullWidth
                  component={Link}
                  to="/checkout"
                  disabled={isLoading}
                  sx={{ 
                    mt: 4,
                    py: 1.5,
                    borderRadius: '8px'
                  }}
                >
                  Proceed to Checkout
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  component={Link}
                  to="/products"
                  disabled={isLoading}
                  sx={{ 
                    mt: 2,
                    py: 1.5,
                    borderRadius: '8px'
                  }}
                >
                  Continue Shopping
                </Button>
              </Paper>
            </MotionWrapper>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Cart; 