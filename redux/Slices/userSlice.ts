 import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
 import axios from "axios";
 
const name ='user'
var  initialState:{name:string,id:number,mail:string,mobile:string,password:string}[]=[]
const allUsers= async()=>
{
   const res=await axios.get("http://192.168.1.153:4212/users");
   initialState=res.data;
   
}
 
  
const userSlice=createSlice({
          name,
          initialState,
          reducers:{
             createAccount:(state,action)=>{ createUser(action.payload)},
             deleteAccount:(state,action)=>{deleteUser(action.payload)},
             updateAccount:(state,action)=>{ updateUser(action.payload,action.payload.id)}
               
          },

});

const createUser =async (item:{}) =>
{
  
   console.log(item ,'item');
   try {
       await axios.post('http://192.168.1.153:4212/users',item)
       console.log('added successfully');
       
   } catch (error) {
     console.log(error.message);
      
   }
}
const  updateUser =async (item:{},id:number) =>
{
   try {
       await axios.put(`http://192.168.1.153:4212/users/${id}`,item);
   } catch (error) {
     console.log(error.message);
      
   }
}

const  deleteUser =async (item:string) =>
{
   try {
       await axios.delete(`http://192.168.1.153:4212/users/${item}`);
   } catch (error) {
     console.log(error.message);
      
   }
}




export const{createAccount,deleteAccount,updateAccount}=userSlice.actions;
export default userSlice.reducer;
