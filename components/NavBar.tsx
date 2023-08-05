import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import globalStyles from '../GlobalStyles'
import { Entypo } from '@expo/vector-icons'
export default function NavBar({header,name}) {
  return (
    
    <View style={globalStyles.navBar}>
         <View style={globalStyles.logo}>
          <Text style={{fontSize:35,fontWeight:'bold'}} >{header}</Text>
         </View>
         <View style={globalStyles.NaviagteSymbol}>
         <Entypo name={name} size={24} color="black"   />
         </View>
      </View >
      
  )
}

const styles = StyleSheet.create({})