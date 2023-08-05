import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import globalStyle from "../GlobalStyles";
import { StackActions } from "@react-navigation/native";
import { nextNavigation } from "../components/ReplaceFunction";
import { Dimensions } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { Linking } from "react-native"; //Linking is used as Anchor tag
const { height, width } = Dimensions.get("window");
import { userList } from "../Context/UserContex";
import { useContext } from "react";
import { deleteTheUser } from "../redux/Slices/fetchUser";
export default function Profile({ navigation }) {
  const dispatch = useDispatch();
  const { setIsAdminLogged } = useContext(userList);
  const currentUser = useSelector((state: any) => state.fetch);
  const currentID = currentUser[0]?.id;
  const handleLogOut = () => {
    Alert.alert("confirm Log out ", "do you want to log out ?", [
      {
        text: "yes",
        onPress: () => {
          navigation.popToTop();
          navigation.pop();
          dispatch(deleteTheUser(currentUser[0]?.id));
          setIsAdminLogged(false);
        },
      },
      { text: "no" },
    ]);
  };

  console.log(currentUser[0], "current user from profile");

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.imageContainer}
        onPress={() => navigation.navigate("editUser")}
      >
        <Image
          style={styles.userImage}
          source={require("../assets/userLogo.png")}
        />

        <View style={{ paddingLeft: 10 }}>
          <Text style={styles.title}>{currentUser[0]?.name}</Text>
          <Text style={styles.captions}></Text>
        </View>
      </TouchableOpacity>

      <View style={styles.address}>
        <View style={styles.info}>
          <Ionicons name="location" size={18} color="gray" />
          <Text style={styles.captions}>{currentUser[0]?.place}</Text>
        </View>

        <View style={styles.info}>
          <Ionicons name="mail" size={18} color="gray" />
          <Text style={styles.captions}>{currentUser[0]?.mail}</Text>
        </View>

        <View style={styles.info}>
          <Ionicons name="call-sharp" size={18} color="gray" />
          <Text style={styles.captions}>+91-{currentUser[0]?.mobile}</Text>
        </View>
      </View>

      <View style={styles.options}>
        <View style={styles.optionElements}>
          <Ionicons name="heart-outline" size={18} color="blue" />
          <Text style={styles.h4}> Your Wish List</Text>
        </View>

        <View style={styles.optionElements}>
          <Ionicons name="card" size={18} color="blue" />
          <Text style={styles.h4}>Payment GateWay</Text>
        </View>

        <View style={styles.optionElements}>
          <Ionicons name="cart" size={18} color="blue" />
          <Text style={styles.h4}>Your Order</Text>
        </View>

        <View style={styles.optionElements}>
          <Ionicons name="log-out" size={18} color="blue" />
          <Text style={styles.h4} onPress={handleLogOut}>
            logOut
          </Text>
        </View>

        <View style={styles.optionElements}>
          <Ionicons name="share-social" size={18} color="blue" />
          <Text style={styles.h4}>Refferal Bonus</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <View style={styles.socialLinks}>
          <Ionicons
            name="logo-facebook"
            size={15}
            color="white"
            onPress={() =>
              Linking.openURL("https://www.facebook.com/AmazonIN/")
            }
          />
          <Ionicons
            name="logo-instagram"
            size={15}
            color="white"
            onPress={() =>
              Linking.openURL("https://www.instagram.com/amazon/?hl=en")
            }
          />
          <Ionicons
            name="logo-twitter"
            size={15}
            color="white"
            onPress={() => Linking.openURL("https://www.twitter.com")}
          />
          <Ionicons
            name="logo-linkedin"
            size={15}
            color="white"
            onPress={() =>
              Linking.openURL("https://www.linkedin.com/company/amazon")
            }
          />
          <Ionicons
            name="logo-google"
            size={15}
            color="white"
            onPress={() => Linking.openURL("https:www.google.com/amazon")}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: "100%",
    height: 150,
    alignItems: "center",
    justifyContent: "flex-start",
    // borderColor:'red',
    // borderWidth:1,
    marginVertical: 10,
    flexDirection: "row",
  },
  userImage: {
    width: "35%",
    height: "80%",
    borderRadius: 100,
    // borderColor:'red',
    // borderWidth:1,
  },
  title: {
    fontSize: 30,
    paddingHorizontal: 5,
    fontWeight: "bold",
  },
  captions: {
    fontSize: 12,
    lineHeight: 15,
    paddingHorizontal: 5,
  },
  address: {
    width: "100%",
    height: "20%",
    // borderColor:'green',
    // borderWidth:1,
    marginBottom: "2%",
  },
  info: {
    width: "100%",
    height: "28%",
    // borderColor:'pink',
    // borderWidth:1,
    marginBottom: "0.3%",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
  },
  options: {
    width: "100%",
    height: "39%",
    // borderColor:'pink',
    // borderWidth:1,
  },
  optionElements: {
    width: "100%",
    height: "18%",
    //  borderColor:'green',
    //  borderWidth:1,
    marginBottom: "1%",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
  },
  h4: {
    fontSize: 14,
    paddingRight: 15,
  },
  footer: {
    width: "100%",
    height: "14%",
    backgroundColor: "#1B1212",
  },
  socialLinks: {
    width: "100%",
    borderColor: "pink",
    borderWidth: 1,
    height: "50%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});
//   <Button title='log out ' onPress={handleLogOut} />
//   <Button title='add product' onPress={()=>navigation.navigate('addProducts')} />
