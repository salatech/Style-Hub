import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Slider,
  CardActionArea,
  SelectChangeEvent,
  CircularProgress,
  Alert,
  Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { RootState, AppDispatch } from '../features/store';
import { setFilters, fetchProducts, fetchProductsByCategory } from '../features/products/productsSlice';
import { api } from '../services/api';

const Products = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [searchParams] = useSearchParams();
  const { filteredItems, loading, error } = useSelector((state: RootState) => state.products);
  const [categories, setCategories] = useState<string[]>([]);

  const [category, setCategory] = useState<string>(searchParams.get('category') || 'all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [sortBy, setSortBy] = useState<string>('');
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    // Fetch categories
    const fetchCategories = async () => {
      try {
        const data = await api.getCategories();
        setCategories(data);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    // Fetch products based on category
    if (category === 'all') {
      dispatch(fetchProducts());
    } else {
      dispatch(fetchProductsByCategory(category));
    }
  }, [category, dispatch]);

  useEffect(() => {
    dispatch(setFilters({
      category: category === 'all' ? null : category,
      priceRange: { min: priceRange[0], max: priceRange[1] },
      sortBy: sortBy === '' ? null : sortBy as 'price-asc' | 'price-desc' | 'rating',
    }));
  }, [category, priceRange, sortBy, dispatch]);

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };

  const handleSortChange = (event: SelectChangeEvent) => {
    setSortBy(event.target.value);
  };

  const handlePriceChange = (_event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as [number, number]);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  if (error) {
    return (
      <Box sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{width: '85%', margin: 'auto' }}>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', md: 'row' },
        gap: { xs: 3, md: 4 }
      }}>
        {/* Filters Section */}
        <Box sx={{ 
          width: { xs: '100%', md: '280px' },
          flexShrink: 0,
          position: { md: 'sticky' },
          top: { md: 24 },
          height: { md: 'fit-content' }
        }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 2,
              bgcolor: 'grey.50'
            }}
          >
            <Typography 
              variant="h6" 
              gutterBottom
              sx={{ 
                fontWeight: 600,
                mb: 3
              }}
            >
              Filters
            </Typography>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <TextField
                label="Search Products"
                value={search}
                onChange={handleSearchChange}
                size="small"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    bgcolor: 'background.paper'
                  }
                }}
              />
            </FormControl>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Category</InputLabel>
              <Select 
                value={category} 
                label="Category" 
                onChange={handleCategoryChange}
                sx={{
                  borderRadius: 2,
                  bgcolor: 'background.paper'
                }}
              >
                <MenuItem value="all">All Categories</MenuItem>
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Sort By</InputLabel>
              <Select 
                value={sortBy} 
                label="Sort By" 
                onChange={handleSortChange}
                sx={{
                  borderRadius: 2,
                  bgcolor: 'background.paper'
                }}
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value="price-asc">Price: Low to High</MenuItem>
                <MenuItem value="price-desc">Price: High to Low</MenuItem>
                <MenuItem value="rating">Rating</MenuItem>
              </Select>
            </FormControl>
            <Box>
              <Typography 
                gutterBottom 
                sx={{ 
                  fontWeight: 500,
                  mb: 2
                }}
              >
                Price Range
              </Typography>
              <Slider
                value={priceRange}
                onChange={handlePriceChange}
                valueLabelDisplay="auto"
                min={0}
                max={5000}
                step={100}
                sx={{
                  color: 'primary.main',
                  '& .MuiSlider-valueLabel': {
                    bgcolor: 'primary.main'
                  }
                }}
              />
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                mt: 1
              }}>
                <Typography variant="body2" color="text.secondary">
                  ${priceRange[0]}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ${priceRange[1]}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Box>

        {/* Products Grid */}
        <Box sx={{ flex: 1 }}>
          {loading ? (
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: 400
            }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 4
              }}>
                <Typography 
                  variant="h5" 
                  sx={{ fontWeight: 600 }}
                >
                  All Products
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                >
                  {filteredItems.length} products found
                </Typography>
              </Box>

              <Box sx={{ 
                display: 'grid',
                gridTemplateColumns: {
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(2, 1fr)',
                  md: 'repeat(2, 1fr)',
                  lg: 'repeat(3, 1fr)',
                  xl: 'repeat(4, 1fr)'
                },
                gap: 3
              }}>
                {filteredItems
                  .filter((product) =>
                    product.name.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((product) => (
                    <Card
                      key={product.id}
                      elevation={0}
                      sx={{
                        bgcolor: 'grey.50',
                        borderRadius: 3,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                        }
                      }}
                    >
                      <CardActionArea
                        onClick={() => navigate(`/products/${product.id}`)}
                      >
                        <Box sx={{ 
                          position: 'relative',
                          pt: '100%', // Creates a square aspect ratio
                          bgcolor: 'background.paper'
                        }}>
                          <CardMedia
                            component="img"
                            image={product.images[0]}
                            alt={product.name}
                            sx={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              width: '100%',
                              height: '100%',
                              objectFit: 'contain',
                              p: 2
                            }}
                          />
                        </Box>
                        <CardContent sx={{ p: 3 }}>
                          <Typography 
                            gutterBottom 
                            variant="h6" 
                            component="div"
                            sx={{
                              fontSize: '1.1rem',
                              fontWeight: 500,
                              mb: 1,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              height: '3.3em',
                              lineHeight: '1.65em'
                            }}
                          >
                            {product.name}
                          </Typography>
                          <Typography 
                            variant="body2" 
                            color="text.secondary"
                            sx={{ mb: 2 }}
                          >
                            {product.category}
                          </Typography>
                          <Typography 
                            variant="h6" 
                            color="primary"
                            sx={{ 
                              fontWeight: 600,
                              fontSize: '1.2rem'
                            }}
                          >
                            ${product.price.toFixed(2)}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  ))}
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Products; 