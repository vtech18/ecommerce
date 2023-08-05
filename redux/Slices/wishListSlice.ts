import { createSlice } from "@reduxjs/toolkit";

const name ='wishList1'
const initialState:any[]=[]

const wishListSlice=createSlice({
          name,
          initialState,
          reducers:{
            removeFromWishList:(state,action):{}[]=>{return state.filter(ele=> ele.id !==action.payload)},
            addToWishList:(state,action):void=>{
             state.push(action.payload); console.log(state);},
          },

});
export const{removeFromWishList,addToWishList}=wishListSlice.actions;
export default wishListSlice.reducer;