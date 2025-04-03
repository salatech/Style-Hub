import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Typography,
  Avatar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  CircularProgress,
  Alert,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CachedIcon from '@mui/icons-material/Cached';
import BuildIcon from '@mui/icons-material/Build';
import StarIcon from '@mui/icons-material/Star';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { api } from '../services/api';

const Home = () => {
  const navigate = useNavigate();
  const [newCollections, setNewCollections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const products = await api.getProducts();
        const transformedProducts = products.map((product: any) => ({
          id: product.id,
          name: product.title,
          price: product.price,
          image: product.image,
          label: getProductLabel(product.rating.rate),
          colors: getProductColors(),
          rating: product.rating.rate,
          description: product.description
        }));
        setNewCollections(transformedProducts.slice(0, 6));
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Helper function to determine product label based on rating
  const getProductLabel = (rating: number) => {
    if (rating >= 4.5) return 'Best Sale';
    if (rating >= 4.0) return 'Top Rated';
    return 'Best Price';
  };

  // Helper function to generate random color combinations
  const getProductColors = () => {
    const colorSets = [
      ['#1A1A1A', '#C4A86D', '#8B8B8B', '#D9D9D9'],
      ['#1A1A1A', '#8B8B8B', '#D9D9D9', '#FFFFFF'],
      ['#1A1A1A', '#8B8B8B', '#C4A86D', '#FFFFFF'],
      ['#1A1A1A', '#4CAF50', '#8B8B8B', '#FFFFFF']
    ];
    return colorSets[Math.floor(Math.random() * colorSets.length)];
  };

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  if (error) {
    return (
      <Box sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
        <Button variant="contained" onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ overflow: 'hidden' }}>
      {/* Hero Section */}
      <Box
        sx={{
          height: '90vh',
          width: '100%',
          position: 'relative',
          backgroundImage: 'url(https://images.unsplash.com/photo-1618220179428-22790b461013)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.4)',
          },
        }}
      >
        <Box sx={{ 
          position: 'relative', 
          zIndex: 1,
          width: '85%',
          maxWidth: '2000px',
          px: { xs: 2, sm: 4 }
        }}>
          <Typography 
            variant="h1" 
            color="white" 
            gutterBottom
            sx={{ 
              fontSize: { xs: '2.5rem', sm: '3rem', md: '4rem' },
              fontWeight: 500,
              lineHeight: 1.2,
              mb: 3
            }}
          >
            Find The Perfect Items To Complete You And Your Home
          </Typography>
          <Typography 
            variant="h6" 
            color="rgba(255,255,255,0.9)" 
            sx={{ 
              mb: 4,
              maxWidth: '800px',
              mx: 'auto',
              fontSize: { xs: '1rem', sm: '1.25rem' }
            }}
          >
            We specialize in buying and selling high-quality clothings, marketable furniture, each piece reflecting our unique aesthetic.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/products')}
            sx={{
              px: { xs: 3, sm: 4 },
              py: { xs: 1, sm: 1.5 },
              fontSize: { xs: '1rem', sm: '1.1rem' },
              borderRadius: '50px',
              textTransform: 'none'
            }}
          >
            Shop Now
          </Button>
        </Box>
        
        {/* Scroll Down Button */}
        <Box
          sx={{
            position: 'absolute',
            bottom: { xs: 20, sm: 40 },
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1,
            cursor: 'pointer',
            animation: 'bounce 2s infinite',
            '@keyframes bounce': {
              '0%, 20%, 50%, 80%, 100%': {
                transform: 'translateY(0) translateX(-50%)',
              },
              '40%': {
                transform: 'translateY(-20px) translateX(-50%)',
              },
              '60%': {
                transform: 'translateY(-10px) translateX(-50%)',
              },
            },
          }}
          onClick={scrollToContent}
        >
          <Box
            sx={{
              width: { xs: '32px', sm: '40px' },
              height: { xs: '32px', sm: '40px' },
              borderRadius: '50%',
              border: '2px solid white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.1)',
              },
            }}
          >
            <KeyboardArrowDownIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />
          </Box>
        </Box>
      </Box>

      {/* New Collections */}
      <Box sx={{ 
        py: { xs: 6, md: 8 },
        width: "85%",
        mx: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        <Typography variant="h2" align="center" gutterBottom sx={{ fontWeight: 500 }}>
          Our New Collections
        </Typography>
        <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 6 }}>
          These products are crafted using quality materials sourced from the best brands.
        </Typography>
        
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box sx={{ 
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
              lg: 'repeat(3, 1fr)',
              xl: 'repeat(4, 1fr)'
            },
            gap: 3,
            width: '100%',
            justifyContent: 'center'
          }}>
            {newCollections.map((product) => (
              <Box
                key={product.id}
                sx={{
                  flex: '0 0 calc(33.333% - 16px)',
                  minWidth: '300px',
                  maxWidth: '400px',
                  bgcolor: 'white',
                  borderRadius: 2,
                  overflow: 'hidden',
                  p: 3,
                  cursor: 'pointer',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  },
                }}
                onClick={() => navigate(`/products/${product.id}`)}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="subtitle1" fontWeight="500">
                    {product.label}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                    {product.colors.map((color: string, index: number) => (
                      <Box
                        key={index}
                        sx={{
                          width: 16,
                          height: 16,
                          borderRadius: '50%',
                          bgcolor: color,
                          border: color === '#FFFFFF' ? '1px solid #E0E0E0' : 'none'
                        }}
                      />
                    ))}
                  </Box>
                </Box>
                
                <Box
                  sx={{
                    width: '100%',
                    height: 250,
                    bgcolor: '#F8F8F8',
                    borderRadius: 2,
                    overflow: 'hidden',
                    mb: 2,
                    position: 'relative',
                    '&:hover .add-to-cart': {
                      opacity: 1,
                    }
                  }}
                >
                  <Box
                    component="img"
                    src={product.image}
                    alt={product.name}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      p: 2
                    }}
                  />
                  <Box
                    className="add-to-cart"
                    sx={{
                      position: 'absolute',
                      bottom: 16,
                      right: 16,
                      opacity: 0,
                      transition: 'opacity 0.2s',
                    }}
                  >
                    <IconButton
                      sx={{
                        bgcolor: 'white',
                        '&:hover': { bgcolor: 'white' },
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        // Add to cart logic here
                      }}
                    >
                      <ShoppingBagOutlinedIcon />
                    </IconButton>
                  </Box>
                </Box>
                
                <Typography variant="h6" gutterBottom noWrap>
                  {product.name}
                </Typography>
                <Typography variant="h6" color="primary" fontWeight="500">
                  ${product.price.toFixed(2)}
                </Typography>
              </Box>
            ))}
          </Box>
        )}
      </Box>

      {/* Features */}
      <Box sx={{ py: { xs: 6, md: 8 } }}>
        <Typography variant="h4" align="center" gutterBottom>
          What We Can Offer You
        </Typography>
        <Box sx={{ 
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)'
          },
          gap: 4,
          mt: 4
        }}>
          <Box sx={{ flex: '0 0 calc(33.333% - 21.333px)', textAlign: 'center' }}>
            <BuildIcon sx={{ fontSize: 48, color: 'primary.main' }} />
            <Typography variant="h6" sx={{ mt: 2 }}>
              Made Your Order
            </Typography>
            <Typography color="text.secondary">
              Customize your furniture to match your style
            </Typography>
          </Box>
          <Box sx={{ flex: '0 0 calc(33.333% - 21.333px)', textAlign: 'center' }}>
            <LocalShippingIcon sx={{ fontSize: 48, color: 'primary.main' }} />
            <Typography variant="h6" sx={{ mt: 2 }}>
              Free Delivery
            </Typography>
            <Typography color="text.secondary">
              Free shipping on orders over $500
            </Typography>
          </Box>
          <Box sx={{ flex: '0 0 calc(33.333% - 21.333px)', textAlign: 'center' }}>
            <CachedIcon sx={{ fontSize: 48, color: 'primary.main' }} />
            <Typography variant="h6" sx={{ mt: 2 }}>
              Free Exchange
            </Typography>
            <Typography color="text.secondary">
              30-day free exchange policy
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Testimonials */}
      <Box sx={{ bgcolor: '#f5f5f5', py: { xs: 6, md: 8 }, width:"85%", mx:"auto" }}>
        <Typography variant="h4" align="center" gutterBottom>
          Word From Our Happy Customers
        </Typography>
        <Box sx={{ 
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)'
          },
          gap: 3,
          mt: 4
        }}>
          {newCollections.map((product, index) => (
            <Box
              key={index}
              sx={{
                flex: '0 0 calc(33.333% - 16px)',
                minWidth: '300px',
                maxWidth: '400px',
                bgcolor: 'white',
                borderRadius: 2,
                overflow: 'hidden',
                boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
              }}
            >
              {/* Customer Info */}
              <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar
                  src={`https://i.pravatar.cc/150?img=${index + 1}`}
                  sx={{ width: 48, height: 48 }}
                />
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {[
                        'Esther Howard',
                        'Jenny Wilson',
                        'Ronald Richards',
                        'Leslie Alexander',
                        'Jane Cooper',
                        'Kristin Watson'
                      ][index]}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Typography variant="body2" color="primary">
                        {product.rating.toFixed(1)}
                      </Typography>
                      <StarIcon sx={{ color: '#FFB800', fontSize: 20 }} />
                    </Box>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {[
                      'CEO, Wells Fargo',
                      'CFO, Nielsen',
                      'CMO, Advanta Inc',
                      'CFO, Gillette',
                      'CMO, Batz Group',
                      'CEO, Metaful'
                    ][index]}
                  </Typography>
                </Box>
              </Box>

              {/* Product Image */}
              <Box
                sx={{
                  width: '100%',
                  height: 200,
                  bgcolor: '#f8f8f8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  p: 2
                }}
              >
                <Box
                  component="img"
                  src={product.image}
                  alt={product.name}
                  sx={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain'
                  }}
                />
              </Box>

              {/* Review Content */}
              <Box sx={{ p: 2 }}>
                <Typography variant="subtitle1" gutterBottom fontWeight="medium">
                  {[
                    'Stylish and durable furniture',
                    'Absolutely love my new sofa',
                    'Exceptional craftsmanship',
                    'Smooth shopping experience',
                    'Beautiful designs with comfort',
                    'Great value for the price'
                  ][index]}
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
                  {product.description}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      {/* FAQ Section */}
      <Box sx={{ py: { xs: 6, md: 8 }, width:"85%", mx:"auto" }}>
        {/* Title and Contact Section */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h2" gutterBottom sx={{ 
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            fontWeight: 500
          }}>
            You've Got Questions & We've Got Answers!
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            Still have a questions in mind?
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/contact')}
            sx={{
              py: 1.5,
              px: 4,
              fontSize: '1.1rem',
              textTransform: 'none',
              borderRadius: 50,
              bgcolor: '#1A1A1A',
              '&:hover': {
                bgcolor: '#333333'
              }
            }}
            endIcon={<span style={{ fontSize: '1.2rem' }}>↗</span>}
          >
            Contact Us
          </Button>
        </Box>

        {/* FAQs Grid */}
        <Box sx={{ 
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
          gap: 3
        }}>
          {[
            {
              question: 'What is the estimated delivery time for my order?',
              answer: 'Standard delivery typically takes 3-5 business days. For larger items, delivery may take 5-7 business days.'
            },
            {
              question: 'Do you offer customization options for furniture?',
              answer: 'Yes, many of our products can be customized in terms of color, material, and size. Please contact our customer service for details.'
            },
            {
              question: 'What is your return and exchange policy?',
              answer: 'We offer a hassle-free return and exchange policy within 14 days of delivery. The item must be in its original condition and packaging'
            },
            {
              question: 'Do you offer furniture assembly services?',
              answer: 'Yes, we provide professional assembly services for an additional fee in select areas.'
            },
            {
              question: 'What payment methods do you accept?',
              answer: 'We accept major credit/debit cards, PayPal, and other secure payment options. Financing plans may also be available at checkout.'
            },
            {
              question: 'How can I track my order status?',
              answer: 'You can track your order through your account dashboard or using the tracking number provided in your shipping confirmation email.'
            }
          ].map((faq, index) => (
            <Accordion 
              key={index}
              sx={{
                boxShadow: 'none',
                bgcolor: 'transparent',
                '&:before': {
                  display: 'none',
                },
                '& .MuiAccordionSummary-root': {
                  bgcolor: 'white',
                  border: '1px solid #E0E0E0',
                  borderRadius: '24px',
                  '&.Mui-expanded': {
                    borderBottomLeftRadius: '0',
                    borderBottomRightRadius: '0',
                  }
                },
                '& .MuiAccordionDetails-root': {
                  bgcolor: 'white',
                  border: '1px solid #E0E0E0',
                  borderTop: 'none',
                  borderBottomLeftRadius: '24px',
                  borderBottomRightRadius: '24px',
                  px: 3,
                  py: 2
                }
              }}
            >
              <AccordionSummary 
                expandIcon={<ExpandMoreIcon />}
                sx={{
                  px: 3,
                  '& .MuiAccordionSummary-content': {
                    my: 1.5
                  }
                }}
              >
                <Typography sx={{ 
                  fontSize: '1.1rem',
                  fontWeight: 500,
                  color: '#1A1A1A'
                }}>
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ 
                  color: 'text.secondary',
                  lineHeight: 1.6
                }}>
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Box>

  
    </Box>
  );
};

export default Home; 