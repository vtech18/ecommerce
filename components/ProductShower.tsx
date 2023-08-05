import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  Image,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import React, { useContext, useState } from "react";
import { userList } from "../Context/UserContex";
import { removeFromCart } from "../redux/Slices/cartSlice";
import { removeFromWishList } from "../redux/Slices/wishListSlice";
// if the cart want to perform delettion then passes the prop as true
//if wish list want to remove the passes it as false

export default function ProductShower({ item, isCart }) {
  const k: number = item.id;
  const { totalCartValue1, setTotalCartValue } = useContext(userList);
  const cartProducts = useSelector((state: any) => state.cart);
  var localCartValidate = false;
  const k1: { id: number }[] = cartProducts.filter(
    (e: { id: number }) => k == e.id
  );

  // const singleProduct:{id:number;
  //   category:string;
  //   description:string;
  // image:string;
  // rating:{rate:number;count:number};
  // title:string;
  // }=(cartProducts.filter((e:{id:number;
  //   category:string;
  //   description:string;
  // image:string;
  // rating:{rate:number;count:number};
  // title:string;})=>e.id==k
  // ))

  const dispatch = useDispatch();

  const removeAction = (id: number) => {
    //condition for cart and wish list

    if (isCart) {
      // if is cart ==true (the component is called from cart ) and
      //it will change the appeareb=nce of button at SingleProduct.tsx:81
      setTotalCartValue(totalCartValue1 - item.price);
      dispatch(removeFromCart(item)); //it will remove the item with id (which is extracted from product object passed by Cart.tsx)
    } else if (!isCart) {
      dispatch(removeFromWishList(id)); // it will remove the item with id (which is extracted from product object passed by WishList.tsx)
      //it will change the appeareb=nce of wishListIcon at SingleProduct.tsx:51
    }
  };
  return (
    <View style={styles.cartItemContainer}>
      <View style={styles.itemImageContainer}>
        <Image
          source={{ uri: item.image }}
          style={{ width: "70%", height: "91%", resizeMode: "center" }}
        />
      </View>
      <View style={styles.itemInfoContainer}>
        <Text style={{ fontSize: 16, textAlign: "center", paddingBottom: 10 }}>
          {item.title}
        </Text>
        <Text style={{ fontSize: 15 }}>₹ {item.price}</Text>
        <View style={{ justifyContent: "flex-end" }}>
          <View style={{ height: 30, flexDirection: "row", width: "100%" }}>
            <Button title="place Order" />
            <Button title="remove" />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cartItemContainer: {
    width: "100%",
    height: 150,
    marginRight: 4,
    marginVertical: 5,
    flexDirection: "row",
    paddingHorizontal: 5,
    justifyContent: "space-between",
  },
  itemImageContainer: {
    width: "35%",
    height: 130,
    justifyContent: "center",
    alignItems: "center",
  },
  itemInfoContainer: {
    width: "65%",
    height: 150,
  },
});
//in the cart.tsx && wishlist.Tsx
// i am displaying item with same styles
//insead of DRY i am reusing by passing props
