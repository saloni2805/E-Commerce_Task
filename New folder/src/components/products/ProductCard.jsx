import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Rating,
  Chip,
  IconButton,
} from '@mui/material';
import { 
  AddShoppingCart, 
  Favorite, 
  FavoriteBorder,
  Visibility 
} from '@mui/icons-material';
import { addToCart } from '../../redux/slices/cartSlice';

const ProductCard = ({ product, onAddToWishlist, isInWishlist = false }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(addToCart(product));
  };

  const handleViewProduct = () => {
    navigate(`/products/${product.id}`);
  };

  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    if (onAddToWishlist) {
      onAddToWishlist(product);
    }
  };

  // Handle image error
  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/300x300?text=No+Image';
  };

  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        cursor: 'pointer',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        }
      }}
      onClick={handleViewProduct}
    >
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="200"
          image={product.images?.[0] || product.image || 'https://via.placeholder.com/300x300?text=No+Image'}
          alt={product.title}
          onError={handleImageError}
          sx={{ objectFit: 'cover' }}
        />
        
        {/* Category chip */}
        {product.category && (
          <Chip
            label={product.category.name || product.category}
            size="small"
            sx={{
              position: 'absolute',
              top: 8,
              left: 8,
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
            }}
          />
        )}

        {/* Wishlist button */}
        <IconButton
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 1)',
            }
          }}
          onClick={handleWishlistToggle}
        >
          {isInWishlist ? (
            <Favorite color="error" />
          ) : (
            <FavoriteBorder />
          )}
        </IconButton>
      </Box>

      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        <Typography 
          gutterBottom 
          variant="h6" 
          component="h2"
          sx={{
            fontSize: '1rem',
            fontWeight: 600,
            lineHeight: 1.2,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            minHeight: '2.4em',
          }}
        >
          {product.title}
        </Typography>
        
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            minHeight: '2.5em',
            mb: 1,
          }}
        >
          {product.description}
        </Typography>

        {/* Rating */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Rating 
            value={4.2} 
            precision={0.1} 
            size="small" 
            readOnly 
          />
          <Typography variant="caption" sx={{ ml: 1 }}>
            (4.2)
          </Typography>
        </Box>

        {/* Price */}
        <Typography 
          variant="h6" 
          color="primary" 
          sx={{ fontWeight: 700 }}
        >
          ${product.price}
        </Typography>
      </CardContent>

      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          fullWidth
          variant="contained"
          startIcon={<AddShoppingCart />}
          onClick={handleAddToCart}
          sx={{ mr: 1 }}
        >
          Add to Cart
        </Button>
        <Button
          variant="outlined"
          startIcon={<Visibility />}
          onClick={handleViewProduct}
          size="small"
        >
          View
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
