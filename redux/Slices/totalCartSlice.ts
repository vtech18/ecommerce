import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../DBOperations/API";

const name: string = "totalCart";
var initialState = { data: [], pending: false, rejected: false };
const totalCartSlice = createSlice({
  name,
  initialState,
  reducers: {
    totalCartValue: (state, action) => {
      console.log(action.payload, "pay load");
    },
  },
});
export const { totalCartValue } = totalCartSlice.actions;
export default totalCartSlice.reducer;
