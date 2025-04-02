import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { api } from '../../services/api';
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  materials: string[];
  inStock: boolean;
  rating: number;
  reviews: {
    id: string;
    userId: string;
    userName: string;
    rating: number;
    comment: string;
    date: string;
  }[];
}

interface ProductsState {
  items: Product[];
  filteredItems: Product[];
  selectedProduct: Product | null;
  loading: boolean;
  error: string | null;
  filters: {
    category: string | null;
    priceRange: { min: number; max: number } | null;
    sortBy: 'price-asc' | 'price-desc' | 'rating' | null;
  };
}

const initialState: ProductsState = {
  items: [],
  filteredItems: [],
  selectedProduct: null,
  loading: false,
  error: null,
  filters: {
    category: null,
    priceRange: null,
    sortBy: null,
  },
};

// Async thunks
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const products = await api.getProducts();
    return products.map(api.transformProduct);
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id: string) => {
    const product = await api.getProduct(parseInt(id));
    return api.transformProduct(product);
  }
);

export const fetchProductsByCategory = createAsyncThunk(
  'products/fetchProductsByCategory',
  async (category: string) => {
    const products = await api.getProductsByCategory(category);
    return products.map(api.transformProduct);
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSelectedProduct: (state, action: PayloadAction<Product>) => {
      state.selectedProduct = action.payload;
    },
    setFilters: (state, action: PayloadAction<Partial<ProductsState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
      // Apply filters
      let filtered = [...state.items];
      
      if (state.filters.category) {
        filtered = filtered.filter(item => item.category === state.filters.category);
      }
      
      if (state.filters.priceRange) {
        filtered = filtered.filter(item => 
          item.price >= state.filters.priceRange!.min && 
          item.price <= state.filters.priceRange!.max
        );
      }
      
      if (state.filters.sortBy) {
        switch (state.filters.sortBy) {
          case 'price-asc':
            filtered.sort((a, b) => a.price - b.price);
            break;
          case 'price-desc':
            filtered.sort((a, b) => b.price - a.price);
            break;
          case 'rating':
            filtered.sort((a, b) => b.rating - a.rating);
            break;
        }
      }
      
      state.filteredItems = filtered;
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
      state.filteredItems = state.items;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.filteredItems = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      })
      // Fetch Product by ID
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
        state.error = action.error.message || 'Failed to fetch product';
      })
      // Fetch Products by Category
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.filteredItems = action.payload;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products by category';
      });
  },
});

export const {
  setSelectedProduct,
  setFilters,
  clearFilters,
} = productsSlice.actions;

export default productsSlice.reducer;