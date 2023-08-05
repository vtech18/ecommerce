import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./Slices/userSlice";
import wishListSlice from "./Slices/wishListSlice";
import cartSlice from "./Slices/cartSlice";
import productSlice from "./Slices/productSlice";
import fetchUser from "./Slices/fetchUser";
import totalCartSlice from "./Slices/totalCartSlice";
import reviewSlice from "./Slices/reviewSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
export const store = configureStore({
  reducer: {
    user: userSlice,
    wishList1: wishListSlice,
    cart: cartSlice,
    product: productSlice,
    fetch: fetchUser,
    reviews: reviewSlice,
  },
});

export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
