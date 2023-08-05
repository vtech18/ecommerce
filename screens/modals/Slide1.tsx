import React from 'react';

import { StyleSheet, Text, View,StatusBar,Image } from 'react-native'



export default function Slide1()
 {
  return (
    <>
    
    <View style={style1.container}>
    <StatusBar barStyle='light-content' />
    <View style={style1.container2}>
         <Image source={{uri:''}} />
    </View>
        <View style={style1.container3}>
         <View style={{height:'60%',width:'65%',justifyContent:"center",alignItems:'center'}}>
         <Text style={{fontSize:21,fontWeight:'bold',color:'white'}}>
              1000+ fashion brands 
        </Text>
         </View>
    </View>
    </View>
    
    </>
)
}
const style1=StyleSheet.create({
container:{
  flex:1,
  justifyContent:"center",
    alignItems:"center",
   
},
container3:{
     width:'100%',
     height:'10%',
    backgroundColor:'blue',
    color:'#fff',
    justifyContent:"center",
    alignItems:"center",
     borderRadius:10,
    
},
container2:{
    width:'100%',
    height:'90%',
   backgroundColor:'#fff',
}
})