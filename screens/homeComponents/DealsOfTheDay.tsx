import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import React from "react";
import { Card, CardProps } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { Product } from "../../constants/constants";
import { getProduct } from "../../redux/Slices/productSlice";
import { log } from "react-native-reanimated";
import globalStyles, { TextStyles } from "../../GlobalStyles";

export default function DealsOfTheDay() {
  const allProducts: { data: Product[]; pending: boolean; error: string } =
    useSelector((state: any) => state.product);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getProduct());
  }, []);

  return (
    <FlatList
      nestedScrollEnabled
      horizontal
      showsHorizontalScrollIndicator={false}
      bounces={false}
      style={{ width: "100%", height: 300 }}
      data={allProducts.data}
      renderItem={({ item }) => {
        return (
          <View style={styles.container}>
            <View
              style={{
                width: "100%",
                height: "60%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                style={{ width: "100%", height: "100%" }}
                resizeMode="center"
                source={{
                  uri: allProducts.pending
                    ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw_HeSzHfBorKS4muw4IIeVvvRgnhyO8Gn8w&usqp=CAU"
                    : item.url,
                }}
              />
            </View>

            <Text style={[TextStyles.h3, { fontWeight: "600" }]}>
              {item?.name}
            </Text>
            <Text style={{ textDecorationLine: "line-through" }}>
              {parseInt(item.price) + 3000}
            </Text>
            <Text>just at {item.price}</Text>
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: "100%",
    borderColor: "#0d0d0d0d",
    borderWidth: 1,
    marginHorizontal: 3,
    padding: 10,
  },
});
