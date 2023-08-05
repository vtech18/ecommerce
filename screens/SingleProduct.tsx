import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Button,
  TouchableOpacity,
  Alert,
  TextInput,
  FlatList,
} from "react-native";
import React, { useRef, useContext, useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

import { useDispatch, useSelector } from "react-redux";
import { userList } from "../Context/UserContex";
import Modal from "react-native-modal";
import { Label } from "reactstrap";
import axios from "axios";
import { current } from "@reduxjs/toolkit";
import { addReview } from "../redux/Slices/reviewSlice";
import {
  addToWishList,
  removeFromWishList,
} from "../redux/Slices/wishListSlice";
import { addToCart, removeFromCart } from "../redux/Slices/cartSlice";

export default function SingleProduct({ route }) {
  const k = route.params;
  const currentUser = useSelector((state: any) => state.fetch);
  console.log(currentUser[0]?.id, "present user id");

  const cartProducts = useSelector((state: any) => state.cart);
  const wishListProducts = useSelector((state: any) => state.wishList1);
  var localCartValidate = false;
  var localWishListValidate = false;
  const k1: { id: number }[] = cartProducts.filter(
    (e: { id: number }) => k?.id == e.id
  );
  const k2: { id: number }[] = wishListProducts.filter(
    (e: { id: number }) => k?.id == e.id
  );

  k1.length > 0 ? (localCartValidate = true) : "";
  k2.length > 0 ? (localWishListValidate = true) : "";

  var filtered = [];
  const dispatch = useDispatch();
  const { totalCartValue1, setTotalCartValue } = useContext(userList);
  const [addReviewModal, setAddReviewModal] = useState(false);
  const [readReviewModal, setReadReviewModal] = useState(false);
  const [isReviewValid, setIsReviewValid] = useState(false);

  //used to check wether review submitted is valid or in valid
  const [reviews, setReviews] = useState([]);
  const [reviewForm, setReviewForm] = useState({
    productID: k?.id,
    userID: currentUser[0]?.id,
    userName: currentUser[0]?.name,
    rating: 0,
    review: "",
    userLocation: currentUser[0]?.place,
  });

  const fetchReviews = async () => {
    const res = await axios.get("http://192.168.1.153:4212/reviews");

    filtered = res.data.filter(
      (ele: { productID: number }) => ele.productID == k.id
    );
    setReviews(filtered);
  };
  console.log(reviews, "filtered");
  useEffect(() => {
    fetchReviews();
  }, []);

  const submitReview = () => {
    if (
      reviewForm.rating > 0.0 &&
      reviewForm.rating < 5.0 &&
      reviewForm.review != ""
    ) {
      dispatch(addReview(reviewForm));
      toogleAddReviewModal();
    } else setIsReviewValid(true);
  };

  const toogleAddReviewModal = () => {
    setAddReviewModal(!addReviewModal);
  };
  const toogleReadReviewModal = () => {
    setReadReviewModal(!readReviewModal);
  };

  const wishlistMessage = (k: any) => {
    // i dont know why but when ever i am changing state of {click} out side it is perfect but in the
    // function it is showing revsere case so i am going with flow
    // i am reveseing my condition

    if (!localWishListValidate) {
      dispatch(addToWishList(k));
      Alert.alert("congratulations", "your item added to wish list", [
        { text: "ok" },
      ]);
    } else {
      dispatch(removeFromWishList(k.id));
      Alert.alert("", "your item removed from wish list", [{ text: "ok" }]);
    }
  };
  //cart actions logic
  const cartActions = (k: any) => {
    //setIsAddedtoCart(!isAddedtoCart);
    if (!localCartValidate) {
      setTotalCartValue(totalCartValue1 + k?.price);
      dispatch(addToCart(k));
    } else {
      dispatch(removeFromCart(k?.id));
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView>
        {/* add review modal  */}

        <Modal
          animationIn={"fadeIn"}
          animationOut={"fadeOut"}
          animationInTiming={1000}
          animationOutTiming={1000}
          isVisible={addReviewModal}
        >
          <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <View style={addReviewStyles.modalContainer}>
              <TextInput
                style={addReviewStyles.inputBox}
                editable={false}
                defaultValue={k.title}
              />
              <TextInput
                style={addReviewStyles.inputBox}
                editable={false}
                value={"name: " + currentUser[0]?.name}
              />

              {isReviewValid && (
                <Text style={{ color: "red" }}>please enter valid info </Text>
              )}

              <TextInput
                onFocus={() => setIsReviewValid(false)}
                style={{
                  width: "80%",
                  height: 40,
                  borderRadius: 25,
                  borderWidth: 1,
                  borderColor: "black",
                  marginVertical: 10,
                  padding: 5,
                }}
                placeholder="rating(1-5)"
                onChangeText={(val: string) =>
                  setReviewForm({ ...reviewForm, rating: parseFloat(val) })
                }
              />

              <Text>write your review:</Text>
              <TextInput
                multiline
                style={{
                  width: "80%",
                  height: 180,
                  borderWidth: 1,
                  borderColor: "#000",
                  marginVertical: 10,
                }}
                onChangeText={(val: string) =>
                  setReviewForm({ ...reviewForm, review: val })
                }
              />
              <View
                style={{
                  width: "70%",
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <Button title="Submit " onPress={submitReview} />
                <Button title="Go Back" onPress={toogleAddReviewModal} />
              </View>
            </View>
          </View>
        </Modal>

        {/* read review Modal -------------- */}

        {/* <Modal
          isVisible={readReviewModal}
          animationIn={"fadeIn"}
          animationOut={"fadeOut"}
          animationInTiming={1000}
          animationOutTiming={1000}
        >
          <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <FlatList
              data={reviews}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                return (
                  <View style={{ width: "100%", marginBottom: 10 }}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        marginBottom: 5,
                      }}
                    >
                      {item.userName},{item.userLocation}
                    </Text>
                    <Text
                      style={{
                        marginBottom: 5,
                        textAlign: "left",
                        fontSize: 20,
                      }}
                    >
                      rating: <Entypo name="star" size={20} color="gold" />
                      {item.rating}
                    </Text>
                    <Text style={{ fontSize: 16, lineHeight: 21 }}>
                      {item.review}
                    </Text>
                  </View>
                );
              }}
            />

            {reviews.length == 0 && (
              <Text style={{ marginBottom: 10 }}>No reviews</Text>
            )}

            <Button title="back" onPress={toogleReadReviewModal} />
          </View>
        </Modal> */}

        {/* read review Modal -------------- */}

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fff",
          }}
        >
          <Entypo
            style={{
              position: "absolute",
              zIndex: 2,
              right: 10,
              backgroundColor: "white",
              top: 30,
              borderRadius: 100,
              padding: 5,
            }}
            name={localWishListValidate ? "heart" : "heart-outlined"}
            size={25}
            color={localWishListValidate ? "red" : "black"}
            onPress={() => {
              wishlistMessage(k);
            }}
          />

          <Image
            source={{ uri: k.image }}
            style={{
              height: 350,
              width: "70%",
              marginBottom: 5,
              resizeMode: "center",
            }}
          />
        </View>

        <Text style={{ fontSize: 20, textAlign: "center", marginBottom: 10 }}>
          {k.title}
        </Text>
        <Text
          style={{
            fontSize: 11,
            lineHeight: 17,
            marginBottom: 10,
            textAlign: "center",
          }}
        >
          {k.description}
        </Text>
        <View>
          <View
            style={{
              width: "100%",
              height: 40,
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 10,
            }}
          >
            <Text style={{ fontSize: 17 }}>
              <Entypo name="star" size={24} color="gold" />
              {k.rating.rate}
            </Text>
            <Text style={{ fontSize: 17 }}>price:₹ {k.price}</Text>
          </View>

          <Button
            color={localCartValidate ? "red" : "#0096FF"}
            title={localCartValidate ? "remove" : "add to cart"}
            onPress={() => cartActions(k)}
          />

          <View style={styles.reviewCompartment}>
            <TouchableOpacity
              style={styles.reviewButtons}
              activeOpacity={1}
              onPress={toogleAddReviewModal}
            >
              <Text style={styles.reviewButtonText}>add Review</Text>
            </TouchableOpacity>

            {/* <TouchableOpacity
              style={styles.reviewButtons}
              activeOpacity={1}
              // onPress={toogleReadReviewModal}
              onPress={()=>dispatch(fetchAllReviews( ))}
            // > */}
            {/* //   <Text style={styles.reviewButtonText}> read all Reviews</Text>
            // </TouchableOpacity> */}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  reviewCompartment: {
    width: "100%",
    height: 100,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  reviewButtons: {
    width: "45%",
    height: "35%",
    backgroundColor: "blue",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  reviewButtonText: {
    fontSize: 18,
    textAlign: "center",
    color: "#fff",
    fontWeight: "500",
  },
});
const addReviewStyles = StyleSheet.create({
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "90%",
  },
  inputBox: {
    width: "80%",
    height: 40,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "gray",
    marginVertical: 10,
    padding: 5,
  },
});
