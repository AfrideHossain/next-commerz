import { createSlice } from "@reduxjs/toolkit";
// get data from db
// export
const initialState = {
  items: [],
};
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add: (state, { payload }) => {
      state.items.push(payload);
    },
  },
});

export const { add } = cartSlice.actions;
export default cartSlice.reducer;
