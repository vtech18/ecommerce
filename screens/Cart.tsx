import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  Image,
  TouchableHighlightBase,
} from "react-native";
import React, { useState, useContext } from "react";
import { userList } from "../Context/UserContex";
import { useDispatch, useSelector } from "react-redux";
import globalStyles from "../GlobalStyles";
import { Entypo } from "@expo/vector-icons";
import ProductShower from "../components/ProductShower";
import { set } from "react-hook-form";

export default function Cart({ navigation }): JSX.Element {
  const { totalCartValue1, setTotalCartValue } = useContext(userList);
  const products = useSelector((state: any) => state.cart);

  //console.log(k);

  //console.log(k)
  //setTotalCost(k);
  console.log(totalCartValue1);

  return (
    <View style={{ flex: 1 }}>
      <View style={globalStyles.navBar}>
        <View style={globalStyles.logo}>
          <Text style={{ fontSize: 35, fontWeight: "bold" }}>Cart</Text>
        </View>

        <View style={globalStyles.NaviagteSymbol}></View>
      </View>
      <FlatList
        data={products}
        renderItem={({ item }) => {
          return <ProductShower item={item} isCart={true} />;
        }}
      />
      <View
        style={{ zIndex: 5, width: "100%", height: 40, backgroundColor: "" }}
      ></View>
    </View>
  );
}

const styles = StyleSheet.create({
  cartItemContainer: {
    width: "100%",
    height: 150,
    backgroundColor: "red",
    marginRight: 4,
    marginVertical: 5,
    flexDirection: "row",
    paddingHorizontal: 5,
  },
  itemImageContainer: {
    width: "35%",
    height: 150,
    backgroundColor: "blue",
    justifyContent: "center",
    margin: 5,
  },
  itemInfoContainer: {
    width: "65%",
    height: 150,
    backgroundColor: "green",
  },
});
