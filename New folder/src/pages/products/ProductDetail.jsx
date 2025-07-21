import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  Paper,
  Chip,
  Rating,
  Divider,
  IconButton,
  CircularProgress,
  Alert,
  Card,
  CardMedia,
  Breadcrumbs,
  Link,
  TextField,
} from '@mui/material';
import {
  AddShoppingCart,
  Favorite,
  FavoriteBorder,
  Share,
  ArrowBack,
  Add,
  Remove,
} from '@mui/icons-material';
import { fetchProductById, clearSelectedProduct } from '../../redux/slices/productsSlice';
import { addToCart } from '../../redux/slices/cartSlice';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { selectedProduct, loading, error } = useSelector(state => state.products);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
    
    return () => {
      dispatch(clearSelectedProduct());
    };
  }, [id, dispatch]);

  useEffect(() => {
    if (selectedProduct?.images?.length > 0) {
      setSelectedImage(0);
    }
  }, [selectedProduct]);

  const handleAddToCart = () => {
    if (selectedProduct) {
      for (let i = 0; i < quantity; i++) {
        dispatch(addToCart(selectedProduct));
      }
      // Show success message or navigate to cart
    }
  };

  const handleQuantityChange = (change) => {
    setQuantity(prev => Math.max(1, prev + change));
  };

  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted);
    // Add wishlist logic here
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: selectedProduct?.title,
          text: selectedProduct?.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/400x400?text=No+Image';
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error">
          Error loading product: {error}
        </Alert>
      </Container>
    );
  }

  if (!selectedProduct) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="info">
          Product not found
        </Alert>
      </Container>
    );
  }

  const images = selectedProduct.images || [selectedProduct.image] || [];
  const mainImage = images[selectedImage] || 'https://via.placeholder.com/400x400?text=No+Image';

  return (
    <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link
          component="button"
          variant="body2"
          onClick={() => navigate('/')}
          sx={{ textDecoration: 'none' }}
        >
          Home
        </Link>
        <Link
          component="button"
          variant="body2"
          onClick={() => navigate('/products')}
          sx={{ textDecoration: 'none' }}
        >
          Products
        </Link>
        <Typography color="text.primary" variant="body2">
          {selectedProduct.title}
        </Typography>
      </Breadcrumbs>

      {/* Back Button */}
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate(-1)}
        sx={{ mb: 3 }}
      >
        Back
      </Button>

      <Grid container spacing={4}>
        {/* Product Images */}
        <Grid item xs={12} md={6}>
          <Box>
            {/* Main Image */}
            <Card sx={{ mb: 2 }}>
              <CardMedia
                component="img"
                height="400"
                image={mainImage}
                alt={selectedProduct.title}
                onError={handleImageError}
                sx={{ objectFit: 'cover' }}
              />
            </Card>

            {/* Thumbnail Images */}
            {images.length > 1 && (
              <Grid container spacing={1}>
                {images.slice(0, 4).map((image, index) => (
                  <Grid item xs={3} key={index}>
                    <Card
                      sx={{
                        cursor: 'pointer',
                        border: selectedImage === index ? 2 : 0,
                        borderColor: 'primary.main',
                      }}
                      onClick={() => setSelectedImage(index)}
                    >
                      <CardMedia
                        component="img"
                        height="80"
                        image={image}
                        alt={`${selectedProduct.title} ${index + 1}`}
                        onError={handleImageError}
                        sx={{ objectFit: 'cover' }}
                      />
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        </Grid>

        {/* Product Info */}
        <Grid item xs={12} md={6}>
          <Box>
            {/* Category */}
            {selectedProduct.category && (
              <Chip
                label={selectedProduct.category.name || selectedProduct.category}
                color="primary"
                variant="outlined"
                sx={{ mb: 2 }}
              />
            )}

            {/* Title */}
            <Typography variant="h4" component="h1" gutterBottom>
              {selectedProduct.title}
            </Typography>

            {/* Rating */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Rating value={4.2} precision={0.1} readOnly />
              <Typography variant="body2" sx={{ ml: 1 }}>
                (4.2) • 127 reviews
              </Typography>
            </Box>

            {/* Price */}
            <Typography
              variant="h3"
              color="primary"
              sx={{ fontWeight: 700, mb: 3 }}
            >
              ${selectedProduct.price}
            </Typography>

            {/* Description */}
            <Typography variant="body1" paragraph>
              {selectedProduct.description}
            </Typography>

            <Divider sx={{ my: 3 }} />

            {/* Quantity Selector */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                Quantity
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <IconButton
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  <Remove />
                </IconButton>
                <TextField
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  type="number"
                  inputProps={{ min: 1, style: { textAlign: 'center' } }}
                  sx={{ width: 80 }}
                />
                <IconButton onClick={() => handleQuantityChange(1)}>
                  <Add />
                </IconButton>
              </Box>
            </Box>

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <Button
                variant="contained"
                size="large"
                startIcon={<AddShoppingCart />}
                onClick={handleAddToCart}
                sx={{ flex: 1 }}
              >
                Add to Cart
              </Button>
              <IconButton
                onClick={handleWishlistToggle}
                color={isWishlisted ? 'error' : 'default'}
                sx={{ border: 1, borderColor: 'divider' }}
              >
                {isWishlisted ? <Favorite /> : <FavoriteBorder />}
              </IconButton>
              <IconButton
                onClick={handleShare}
                sx={{ border: 1, borderColor: 'divider' }}
              >
                <Share />
              </IconButton>
            </Box>

            {/* Product Features */}
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Product Features
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography variant="body2">✓ Free shipping on orders over $50</Typography>
                <Typography variant="body2">✓ 30-day return policy</Typography>
                <Typography variant="body2">✓ 1-year warranty</Typography>
                <Typography variant="body2">✓ Secure payment</Typography>
              </Box>
            </Paper>
          </Box>
        </Grid>
      </Grid>

      {/* Additional Product Info */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" gutterBottom>
          Product Details
        </Typography>
        <Paper sx={{ p: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom>
                Specifications
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography variant="body2">
                  <strong>Category:</strong> {selectedProduct.category?.name || 'N/A'}
                </Typography>
                <Typography variant="body2">
                  <strong>Product ID:</strong> {selectedProduct.id}
                </Typography>
                <Typography variant="body2">
                  <strong>Availability:</strong> In Stock
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom>
                Shipping & Returns
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography variant="body2">
                  Free standard shipping on orders over $50
                </Typography>
                <Typography variant="body2">
                  Express shipping available
                </Typography>
                <Typography variant="body2">
                  30-day return policy
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

export default ProductDetail;
