import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      // set cart state
      state.items = action.payload;
    },
    add: (state, { payload }) => {
      // Add a item in cart state
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
      // clear entire cart state
      state.items = [];
    },
    removeItem: (state, { payload }) => {
      //remove an item from cart state
      const newItems = state.items.filter(
        (item) => item.productId !== payload.productId
      );
      state.items = newItems;
    },
    updateItem: (state, { payload }) => {
      //update an existing cart item
      const existingIndex = state.items.findIndex(
        (item) => item.productId === payload.productId
      );
      if (existingIndex >= 0) {
        // Item exists, update quantity
        state.items[existingIndex].quantity = payload.quantity;
      }
    },
  },
});

export const { setCart, add, clear, removeItem, updateItem } =
  cartSlice.actions;
export default cartSlice.reducer;
