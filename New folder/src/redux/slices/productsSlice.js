import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { productsAPI, categoriesAPI } from '../../services/api';

// Async thunks for API calls
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ limit = 20, offset = 0 } = {}) => {
    const response = await productsAPI.getAllProducts(limit, offset);
    return response.data;
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id) => {
    const response = await productsAPI.getProductById(id);
    return response.data;
  }
);

export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async () => {
    const response = await categoriesAPI.getAllCategories();
    return response.data;
  }
);

export const fetchProductsByCategory = createAsyncThunk(
  'products/fetchProductsByCategory',
  async ({ categoryId, limit = 20, offset = 0 }) => {
    const response = await productsAPI.getProductsByCategory(categoryId, limit, offset);
    return response.data;
  }
);

export const searchProducts = createAsyncThunk(
  'products/searchProducts',
  async (searchTerm) => {
    const response = await productsAPI.searchProducts(searchTerm);
    return response.data;
  }
);

const initialState = {
  products: [],
  categories: [],
  selectedProduct: null,
  filteredProducts: [],
  searchResults: [],
  loading: false,
  error: null,
  filters: {
    category: '',
    priceRange: { min: 0, max: 1000 },
    searchTerm: '',
  },
  pagination: {
    currentPage: 1,
    totalPages: 1,
    limit: 20,
    total: 0,
  },
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        category: '',
        priceRange: { min: 0, max: 1000 },
        searchTerm: '',
      };
      state.filteredProducts = state.products;
    },
    applyFilters: (state) => {
      let filtered = [...state.products];
      
      // Filter by category
      if (state.filters.category) {
        filtered = filtered.filter(product => 
          product.category?.id === parseInt(state.filters.category)
        );
      }
      
      // Filter by price range
      filtered = filtered.filter(product => 
        product.price >= state.filters.priceRange.min && 
        product.price <= state.filters.priceRange.max
      );
      
      // Filter by search term
      if (state.filters.searchTerm) {
        const searchTerm = state.filters.searchTerm.toLowerCase();
        filtered = filtered.filter(product =>
          product.title.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm)
        );
      }
      
      state.filteredProducts = filtered;
    },
    setPagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.filteredProducts = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      // Fetch product by ID
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      // Fetch categories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      // Fetch products by category
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.filteredProducts = action.payload;
      })
      
      // Search products
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
        state.filteredProducts = action.payload;
      });
  },
});

export const { 
  setFilters, 
  clearFilters, 
  applyFilters, 
  setPagination, 
  clearSelectedProduct 
} = productsSlice.actions;

export default productsSlice.reducer;
