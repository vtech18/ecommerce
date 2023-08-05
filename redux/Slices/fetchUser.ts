import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../DBOperations/API";

const getAllUsers = createAsyncThunk(
  "getAllUsers",

  async () => {
    const res = await api.get("/users/");
    console.log(res.data);
  }
);

const name = "fetch";
const initialState = [];
const fetchUser = createSlice({
  name,
  initialState,
  reducers: {
    theUser: (state, action) => {
      console.log(action.payload);
      state.push(action.payload);
      console.log(state, "fetch user");
    },
    deleteTheUser: (state, action) => {
      return state.filter((ele) => ele.id != action.payload);
      console.log(state, "fetch user state after deleting");
    },
  },
});
export const { theUser, deleteTheUser } = fetchUser.actions;
export default fetchUser.reducer;
