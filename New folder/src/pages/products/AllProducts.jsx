import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Grid,
  Typography,
  Box,
  CircularProgress,
  Alert,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Paper,
  Button,
  Chip,
  Pagination,
} from '@mui/material';
import { Search, FilterList, Clear } from '@mui/icons-material';
import {
  fetchProducts,
  fetchCategories,
  setFilters,
  clearFilters,
  applyFilters,
} from '../../redux/slices/productsSlice';
import ProductCard from '../../components/products/ProductCard';

const AllProducts = () => {
  const dispatch = useDispatch();
  const {
    products,
    filteredProducts,
    categories,
    loading,
    error,
    filters,
  } = useSelector((state) => state.products);

  const [localFilters, setLocalFilters] = useState({
    searchTerm: '',
    category: '',
    priceRange: [0, 1000],
  });
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  useEffect(() => {
    dispatch(fetchProducts({ limit: 50 }));
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(applyFilters());
  }, [filters, dispatch]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setLocalFilters(prev => ({ ...prev, searchTerm: value }));
    dispatch(setFilters({ searchTerm: value }));
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setLocalFilters(prev => ({ ...prev, category: value }));
    dispatch(setFilters({ category: value }));
  };

  const handlePriceRangeChange = (event, newValue) => {
    setLocalFilters(prev => ({ ...prev, priceRange: newValue }));
    dispatch(setFilters({ 
      priceRange: { min: newValue[0], max: newValue[1] } 
    }));
  };

  const handleClearFilters = () => {
    setLocalFilters({
      searchTerm: '',
      category: '',
      priceRange: [0, 1000],
    });
    dispatch(clearFilters());
  };

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading && products.length === 0) {
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
          Error loading products: {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          All Products
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Discover our amazing collection of products
        </Typography>
      </Box>

      {/* Search and Filter Bar */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={3} alignItems="center">
          {/* Search */}
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Search products..."
              value={localFilters.searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
            />
          </Grid>

          {/* Category Filter */}
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={localFilters.category}
                label="Category"
                onChange={handleCategoryChange}
              >
                <MenuItem value="">All Categories</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Price Range */}
          <Grid item xs={12} md={3}>
            <Typography gutterBottom>Price Range</Typography>
            <Slider
              value={localFilters.priceRange}
              onChange={handlePriceRangeChange}
              valueLabelDisplay="auto"
              min={0}
              max={1000}
              valueLabelFormat={(value) => `$${value}`}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption">
                ${localFilters.priceRange[0]}
              </Typography>
              <Typography variant="caption">
                ${localFilters.priceRange[1]}
              </Typography>
            </Box>
          </Grid>

          {/* Clear Filters */}
          <Grid item xs={12} md={2}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<Clear />}
              onClick={handleClearFilters}
            >
              Clear
            </Button>
          </Grid>
        </Grid>

        {/* Active Filters */}
        {(filters.searchTerm || filters.category || 
          filters.priceRange.min > 0 || filters.priceRange.max < 1000) && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Active Filters:
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {filters.searchTerm && (
                <Chip
                  label={`Search: "${filters.searchTerm}"`}
                  onDelete={() => {
                    setLocalFilters(prev => ({ ...prev, searchTerm: '' }));
                    dispatch(setFilters({ searchTerm: '' }));
                  }}
                />
              )}
              {filters.category && (
                <Chip
                  label={`Category: ${categories.find(c => c.id === parseInt(filters.category))?.name}`}
                  onDelete={() => {
                    setLocalFilters(prev => ({ ...prev, category: '' }));
                    dispatch(setFilters({ category: '' }));
                  }}
                />
              )}
              {(filters.priceRange.min > 0 || filters.priceRange.max < 1000) && (
                <Chip
                  label={`Price: $${filters.priceRange.min} - $${filters.priceRange.max}`}
                  onDelete={() => {
                    setLocalFilters(prev => ({ ...prev, priceRange: [0, 1000] }));
                    dispatch(setFilters({ priceRange: { min: 0, max: 1000 } }));
                  }}
                />
              )}
            </Box>
          </Box>
        )}
      </Paper>

      {/* Results Count */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="body1">
          Showing {currentProducts.length} of {filteredProducts.length} products
          {currentPage > 1 && ` (Page ${currentPage} of ${totalPages})`}
        </Typography>
      </Box>

      {/* Products Grid */}
      {currentProducts.length === 0 ? (
        <Box textAlign="center" sx={{ py: 8 }}>
          <Typography variant="h6" gutterBottom>
            No products found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your filters or search terms
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {currentProducts.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            size="large"
          />
        </Box>
      )}
    </Container>
  );
};

export default AllProducts;
