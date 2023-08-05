import { View, Text, Image, FlatList, Button, Alert } from "react-native";
import React, { useContext } from "react";

import globalStyles from "../GlobalStyles";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesome5 } from "@expo/vector-icons";

import ProductShower from "../components/ProductShower";

export default function WishList() {
  const products = useSelector((state: any) => state.wishList1);
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={products}
        renderItem={({ item }) => {
          return <ProductShower item={item} isCart={false} />;
        }}
      />
    </View>
  );
}
