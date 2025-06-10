import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;
      const existingItem = state.find(
        (cartItem) => cartItem.card.info.id === item.card.info.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.push({ ...item, quantity: 1 });
      }
    },

    removeItem: (state, action) => {
      const itemId = action.payload;
      const existingItem = state.find(
        (cartItem) => cartItem.card.info.id === itemId
      );

      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          // Remove item completely if quantity becomes 0
          return state.filter((cartItem) => cartItem.card.info.id !== itemId);
        }
      }
    },

    clearCart: () => {
      return [];
    },
    //we can write like this also....
    // clearCart: (state) => {
    //   state.length = 0;
    // },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
