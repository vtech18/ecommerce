import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function ResetPassword() {
  const arr=[{id:1,price:200,name:'venu'},{id:2,price:230,name:'venu2'},
  {id:3,price:20,name:'venu'},{id:4,price:1200,name:'svenu'},
  {id:5,price:240,name:'vvenu'},{id:6,price:205,name:'venu'},]
  for(let i=0;i<arr.length;i++)
  {
     const temp:{id:number,name:string,price:number}=arr[i];
     if(arr[i].price<arr[i+1].price)
     {
        arr[i]=arr[i+1];
        arr[i+1]=temp;
         
        
     }
  }
  console.log(arr);
  
  return (
    <View>
         
    </View>
  )
}

const styles = StyleSheet.create({})