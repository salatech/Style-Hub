import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface LikedProduct {
  id: string;
  title: string;
  price: number;
  image: string;
}

interface LikedProductsState {
  items: LikedProduct[];
}

const initialState: LikedProductsState = {
  items: [],
};

const likedProductsSlice = createSlice({
  name: 'likedProducts',
  initialState,
  reducers: {
    toggleLike: (state, action: PayloadAction<LikedProduct>) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index === -1) {
        state.items.push(action.payload);
      } else {
        state.items.splice(index, 1);
      }
    },
    clearLikedProducts: (state) => {
      state.items = [];
    },
  },
});

export const { toggleLike, clearLikedProducts } = likedProductsSlice.actions;
export default likedProductsSlice.reducer; 