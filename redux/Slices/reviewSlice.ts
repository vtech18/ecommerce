import { useEffect } from "react";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { get } from "react-hook-form";
import { api } from "../../DBOperations/API";

// export const fetchAllReviews = createAsyncThunk(
//   "fetchAllReviews",
//   async (productID: number) => {
//     const response = await api.get<any[]>("/reviews/");
//     const productReveiws = response.data.filter(
//       (ele: { productID: number }) => ele.productID == productID
//     );
//     console.log(productReveiws);
//   }
// );

const name = "reviews";
var initialState = { data: [], pending: false, rejected: false };
const createReview = async (item: {}) => {
  console.log(item);
  const res = await axios.post("http://192.168.1.153:4212/reviews", item);
};
const getReviews = async (item: {}) => {
  console.log(item);

  const res = await axios.get("http://192.168.1.153:4212/reviews/");
  return res.data;
};

var initialState = { data: [], pending: false, rejected: false };
const reviewSlice = createSlice({
  name,
  initialState,
  reducers: {
    addReview: (state, action) => {
      createReview(action.payload), state.data.push(action.payload);
    },
    allReviews: (state, action) => {
      getReviews(action.payload);
    },
  },
});
export const { addReview, allReviews } = reviewSlice.actions;
export default reviewSlice.reducer;
