import React, { useState } from "react";
import "../assets/watch.jpg";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  StatusBar,
  FlatList,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
  Modal,
  SafeAreaView,
} from "react-native";
import {
  AntDesign,
  Entypo,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import globalStyles, { TextStyles } from "../GlobalStyles";
import ImageCarousel from "./ImageCarousel";
import { categoryArray } from "./../constants/constants";
import DealsOfTheDay from "./homeComponents/DealsOfTheDay";

export default function Home({ navigation }): JSX.Element {
  setTimeout(() => setModalVisible(false), 3000);
  const { height, width } = Dimensions.get("window");
  const [modalVisible, setModalVisible] = useState(true);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={Styles.homeNavContainer}>
        <SimpleLineIcons
          name="handbag"
          size={25}
          color="black"
          onPress={() => navigation.replace("products")}
          style={{ padding: 5, paddingHorizontal: 10 }}
        />
        <Text style={TextStyles.h3}>Single's Cart</Text>
        <Image
          source={{
            uri: "https://imgv3.fotor.com/images/gallery/Realistic-Male-Profile-Picture.jpg",
          }}
          style={{
            width: 40,
            height: 40,
            borderRadius: 100,
            // borderColor: "#000",
            // borderWidth: 1,
            margin: 5,
          }}
        />
      </View>
      <ScrollView style={Styles.homeContent}>
        {/* image carousel starts======  */}
        <ImageCarousel />
        {/*===== image carousel ends  */}

        <FlatList
          style={{
            marginVertical: 10,
          }}
          nestedScrollEnabled
          numColumns={4}
          columnWrapperStyle={{ justifyContent: "space-around" }}
          data={categoryArray}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity activeOpacity={1}>
                <Image
                  source={item.url}
                  resizeMode="center"
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 100,
                    // borderColor: "#000",
                    // borderWidth: 1,
                    marginVertical: 5,
                  }}
                />
              </TouchableOpacity>
            );
          }}
        />
        <View
          style={{
            width: "100%",
            height: 100,
            marginVertical: 10,
            paddingHorizontal: "2%",
          }}
        >
          {/* if you have any flash sales you can show here  */}
          <Image
            style={{ width: "100%", height: "100%" }}
            resizeMode="stretch"
            source={require("../assets/pumaFlashAdvert.jpg")}
          />
        </View>
        <Text style={[TextStyles.h4]}>Deals Of The Day</Text>

        <DealsOfTheDay />
      </ScrollView>
    </View>
  );
}
const Styles = StyleSheet.create({
  homeNavContainer: {
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  homeContent: {
    width: "100%",
    backgroundColor: "#fff",
  },
  homeCategoryContainer: {
    width: "100%",
    backgroundColor: "red",
  },
});
