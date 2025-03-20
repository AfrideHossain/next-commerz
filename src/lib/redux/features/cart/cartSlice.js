import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.items = action.payload;
    },
    add: (state, { payload }) => {
      const existingIndex = state.items.findIndex(
        (item) => item.productId === payload.productId
      );

      if (existingIndex >= 0) {
        // Item exists, update quantity
        state.items[existingIndex].quantity += payload.quantity;
      } else {
        state.items = [...state.items, payload];
      }
    },
    clear: (state) => {
      state.items = [];
    },
  },
});

export const { setCart, add, clear } = cartSlice.actions;
export default cartSlice.reducer;
