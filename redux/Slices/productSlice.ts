import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const name: string = "product";
import axios from "axios";
import { getDecorators } from "typescript";
export const getProduct: any = createAsyncThunk(
  "getProduct",
  async (): Promise<any> => {
    const res = await axios.get("http://192.168.1.153:4212/products/");
    return res.data;
  }
);
const initialState = { data: [], pending: false, error: "" };
const productSlice = createSlice({
  name,
  initialState,
  reducers: {
    addProduct: (state, action) => {
      CreateProduct(action.payload);
    },
    removeProduct: (state, action) => {
      DestroyProduct(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProduct.pending, (state) => {
      state.pending = true;
    }),
      builder.addCase(getProduct.fulfilled, (state, action) => {
        state.pending = false;
        state.data = action.payload;
      }),
      builder.addCase(getProduct.rejected, (state) => {
        state.pending = false;
        state.error = "falied to rerach server,please check after some time ";
      });
  },
});

const CreateProduct = async (item: {}) => {
  try {
    console.log(item, "the item at CRUD");
    const res = await axios.post("http://192.168.1.153:4212/products", item);
    console.log("product created");
  } catch (error) {
    console.log(error);
  }
};
const DestroyProduct = async (item: string) => {
  try {
    console.log(item, "the item at CRUD");
    const res = await axios.delete(
      `http://192.168.1.153:4212/products/${item}`
    );
    console.log(res.data, "destroyed item");
  } catch (error) {
    console.log(error);
  }
};

export const { addProduct, removeProduct } = productSlice.actions;
export default productSlice.reducer;
