import axios from 'axios';

const API_BASE_URL = 'https://fakestoreapi.com';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export const api = {
  // Get all products
  getProducts: async (): Promise<Product[]> => {
    const response = await axios.get(`${API_BASE_URL}/products`);
    return response.data;
  },

  // Get products by category
  getProductsByCategory: async (category: string): Promise<Product[]> => {
    const response = await axios.get(`${API_BASE_URL}/products/category/${category}`);
    return response.data;
  },

  // Get a single product
  getProduct: async (id: number): Promise<Product> => {
    const response = await axios.get(`${API_BASE_URL}/products/${id}`);
    return response.data;
  },

  // Get all categories
  getCategories: async (): Promise<string[]> => {
    const response = await axios.get(`${API_BASE_URL}/products/categories`);
    return response.data;
  },

  // Transform Fake Store API data to match our app's data structure
  transformProduct: (product: Product) => ({
    id: product.id.toString(),
    name: product.title,
    description: product.description,
    price: product.price,
    category: product.category,
    images: [product.image],
    dimensions: {
      width: 0, // These would come from your actual furniture data
      height: 0,
      depth: 0,
    },
    materials: ['Material information not available'], // This would come from your actual furniture data
    inStock: true,
    rating: product.rating.rate,
    reviews: [], // This would come from your actual furniture data
  }),
}; 