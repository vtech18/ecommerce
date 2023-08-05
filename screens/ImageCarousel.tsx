import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Image,
  FlatList,
} from "react-native";
import React, { useRef } from "react";
import { current } from "@reduxjs/toolkit";
import Index from "./../index";

const Width = Dimensions.get("screen").width;
const Height = Dimensions.get("screen").height;

export default function ImageCarousel(): JSX.Element {
  const imgRef = useRef([]);
  const scrollImage = (nativeEvent: any) => {};

  const image1 = [
    { id: 1, url: require("../assets/hm.jpg"), category: "clothing" },
    { id: 2, url: require("../assets/blackShoe.jpg"), category: "fashion" },
    { id: 3, url: require("../assets/ethos.jpg"), category: "fashion" },
  ];
  return (
    <View style={styles.carouselContainer}>
      {/* <ScrollView
        showsHorizontalScrollIndicator={false}
        onScroll={({ nativeEvent }) => scrollImage(nativeEvent)}
        bounces={false}
        horizontal
      >
        {image1.map(
          (item: { id: number; url: any; category: string }, index) => {
            return (
              <Image
                resizeMode="stretch"
                key={index}
                source={item.url}
                style={styles.carouselContainer}
                ref={imgRef.current[item.id]}
              />
            );
          }
        )}
      </ScrollView> */}
      <FlatList
        horizontal
        data={image1}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        pagingEnabled
        renderItem={({ item }) => {
          return (
            <Image
              resizeMode="stretch"
              key={item.id}
              source={item.url}
              style={styles.image}
            />
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  carouselContainer: {
    width: Width,
    height: Height * 0.25,
  },
  image: {
    width: Width,
    height: Height * 0.25,
    padding: 5,
  },
});
