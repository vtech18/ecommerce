import { createSlice } from "@reduxjs/toolkit";

const name: string = "cart";
const initialState = [];
const cartSlice = createSlice({
  name,
  initialState,
  reducers: {
    removeFromCart: (state, action) => {
      return state.filter((ele) => action.payload.id != ele.id);
    },
    addToCart: (state, action) => {
      state.push(action.payload);

      //console.log(action.payload.price);
    },
  },
});
export const { removeFromCart, addToCart } = cartSlice.actions;
export default cartSlice.reducer;
