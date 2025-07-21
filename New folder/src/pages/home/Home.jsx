import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Paper,
  Chip,
  Rating,
  CircularProgress,
} from '@mui/material';
import {
  ShoppingCart,
  TrendingUp,
  LocalOffer,
  Security,
  LocalShipping,
  Support,
} from '@mui/icons-material';
import { fetchProducts, fetchCategories } from '../../redux/slices/productsSlice';
import { addToCart } from '../../redux/slices/cartSlice';
import ProductCard from '../../components/products/ProductCard';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products, categories, loading } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchProducts({ limit: 8 }));
    dispatch(fetchCategories());
  }, [dispatch]);

  const featuredProducts = products.slice(0, 4);
  const featuredCategories = categories.slice(0, 6);

  const features = [
    {
      icon: <LocalShipping />,
      title: 'Free Shipping',
      description: 'Free shipping on orders over $50'
    },
    {
      icon: <Security />,
      title: 'Secure Payment',
      description: '100% secure payment processing'
    },
    {
      icon: <Support />,
      title: '24/7 Support',
      description: 'Round the clock customer support'
    },
    {
      icon: <LocalOffer />,
      title: 'Best Deals',
      description: 'Amazing deals and discounts'
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: 8,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
            Welcome to ShopHub
          </Typography>
          <Typography variant="h5" paragraph sx={{ mb: 4, opacity: 0.9 }}>
            Discover amazing products at unbeatable prices
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/products')}
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                '&:hover': { bgcolor: 'grey.100' },
                px: 4,
                py: 1.5,
              }}
            >
              Shop Now
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/categories')}
              sx={{
                borderColor: 'white',
                color: 'white',
                '&:hover': {
                  borderColor: 'white',
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                },
                px: 4,
                py: 1.5,
              }}
            >
              Browse Categories
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                sx={{
                  p: 3,
                  textAlign: 'center',
                  height: '100%',
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'translateY(-4px)' },
                }}
                elevation={2}
              >
                <Box sx={{ color: 'primary.main', mb: 2 }}>
                  {React.cloneElement(feature.icon, { sx: { fontSize: 48 } })}
                </Box>
                <Typography variant="h6" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Featured Categories */}
      <Box sx={{ bgcolor: 'grey.50', py: 6 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h2" textAlign="center" gutterBottom>
            Shop by Category
          </Typography>
          <Typography
            variant="subtitle1"
            textAlign="center"
            color="text.secondary"
            paragraph
            sx={{ mb: 4 }}
          >
            Explore our wide range of product categories
          </Typography>
          
          {loading ? (
            <Box display="flex" justifyContent="center">
              <CircularProgress />
            </Box>
          ) : (
            <Grid container spacing={3}>
              {featuredCategories.map((category) => (
                <Grid item xs={12} sm={6} md={4} lg={2} key={category.id}>
                  <Card
                    sx={{
                      cursor: 'pointer',
                      transition: 'transform 0.2s',
                      '&:hover': { transform: 'scale(1.05)' },
                    }}
                    onClick={() => navigate(`/products?category=${category.id}`)}
                  >
                    <CardMedia
                      component="img"
                      height="120"
                      image={category.image || 'https://via.placeholder.com/200x120?text=Category'}
                      alt={category.name}
                      sx={{ objectFit: 'cover' }}
                    />
                    <CardContent sx={{ textAlign: 'center', py: 2 }}>
                      <Typography variant="subtitle1" fontWeight="medium">
                        {category.name}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
          
          <Box textAlign="center" sx={{ mt: 4 }}>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/categories')}
            >
              View All Categories
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Featured Products */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <TrendingUp sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h3" component="h2">
            Featured Products
          </Typography>
        </Box>
        
        {loading ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress size={60} />
          </Box>
        ) : (
          <>
            <Grid container spacing={3}>
              {featuredProducts.map((product) => (
                <Grid item xs={12} sm={6} md={3} key={product.id}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
            
            <Box textAlign="center" sx={{ mt: 4 }}>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/products')}
              >
                View All Products
              </Button>
            </Box>
          </>
        )}
      </Container>

      {/* Call to Action */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 6,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h4" component="h2" gutterBottom>
            Ready to Start Shopping?
          </Typography>
          <Typography variant="h6" paragraph sx={{ opacity: 0.9 }}>
            Join thousands of satisfied customers and discover amazing deals today!
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/products')}
            sx={{
              bgcolor: 'white',
              color: 'primary.main',
              '&:hover': { bgcolor: 'grey.100' },
              px: 4,
              py: 1.5,
            }}
          >
            Start Shopping Now
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
