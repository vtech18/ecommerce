import React, { useState, useRef, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  StatusBar,
  TextInput,
  ScrollView,
  Alert,
  Image,
  Dimensions,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native";

import * as Animatable from "react-native-animatable";
import { Feather } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { nextNavigation } from "../components/ReplaceFunction";
import { userList } from "../Context/UserContex";
import axios from "axios";
import { theUser } from "../redux/Slices/fetchUser";

const { height, width } = Dimensions.get("screen");

export default function LogIn({ navigation }) {
  var mail33 = "";
  const [showPassword, SetShowPassword] = useState(false);
  const [userDetails, setUserDetails] = useState({ email: "", password: "" });
  const [AllUsers, setAllUsers] = useState([]);
  const { setIsAdminLogged } = useContext(userList);
  // const userMail1 = userDetails.email;
  const dispatch = useDispatch();

  const fetchingUser = async () => {
    try {
      const res = await axios.get("http://192.168.1.153:4212/users/");
      setAllUsers(res.data);
    } catch (error) {}
  };
  useEffect(() => {
    fetchingUser();
  }, []);

  //console.log("all users",AllUsers);
  const LoggedUser: {
    mail: string;
    password: string;
    name: string;
    mobile: string;
  }[] = AllUsers.filter((e: { mail: string }) => e.mail == userDetails.email);
  console.log(LoggedUser);

  const validateUser = () => {
    nextNavigation("tabs", navigation);
    if (
      LoggedUser.length > 0 &&
      userDetails.password == LoggedUser[0]?.password
    ) {
      //    every time when we use the navigation.navigate() ,if we click on the back button then
      //  it bring back to log in form  in order to avoid that i am using replace function
      //  so after log in ==>it replace my log in with

      LoggedUser[0].mail == "venu@gmail.com" && setIsAdminLogged(true);

      dispatch(theUser(LoggedUser[0])); //another redux to store current logged in user Info
    } else {
    }
  };

  return (
    <KeyboardAvoidingView>
      <View
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#fff",
          alignItems: "center",
        }}
      >
        <View style={styles.header}>
          <Animatable.Image
            animation="zoomIn"
            duration={2000}
            style={styles.logo}
            source={{
              uri: "https://img.freepik.com/free-icon/pins-shopping_318-27153.jpg?size=626&ext=jpg&ga=GA1.2.27160808.1686887302&semt=ais",
            }}
          />
          <Animatable.Text
            animation="fadeInUp"
            duration={4000}
            style={{ fontWeight: "bold" }}
          >
            Single Cart
          </Animatable.Text>
        </View>
        <View style={styles.footer}>
          <Animatable.Text
            style={{
              fontSize: 30,
              fontWeight: "bold",
              textAlign: "left",
              marginVertical: 15,
            }}
            animation="fadeInLeft"
            duration={2000}
          >
            Welcome Back
          </Animatable.Text>
          <Animatable.View
            animation="zoomIn"
            duration={2000}
            style={styles.textBoxContainer}
          >
            <Feather name="user" size={24} color="black" style={styles.icon} />

            <TextInput
              autoCapitalize="none"
              style={styles.inputBox}
              placeholder="Mail"
              keyboardType="email-address"
              onChangeText={(val): void => {
                setUserDetails({ ...userDetails, email: val });
              }}
            />
            <Feather
              name="check-circle"
              size={20}
              color="white"
              style={styles.icon}
            />
          </Animatable.View>
          <Animatable.Text></Animatable.Text>
          <Animatable.View
            animation="zoomIn"
            duration={2000}
            style={styles.textBoxContainer}
          >
            <Feather style={styles.icon} name="lock" size={24} color="black" />

            <TextInput
              secureTextEntry={!showPassword ? true : false}
              autoCapitalize="none"
              style={styles.inputBox}
              placeholder="passsword"
              autoCorrect={false}
              autoComplete="off"
              onChangeText={(val): void =>
                setUserDetails({ ...userDetails, password: val })
              }
            />
            <Feather
              style={styles.icon}
              name={showPassword ? "eye" : "eye-off"}
              size={20}
              color="black"
              onPress={(): void => SetShowPassword(!showPassword)}
            />
          </Animatable.View>

          <Button title="logIn" color="black" onPress={validateUser} />

          <View style={styles.createAccountContainer}>
            <Text
              onPress={() => {
                navigation.navigate("fp", AllUsers);
              }}
            >
              forgot password?
            </Text>
            <Text
              onPress={() => {
                nextNavigation("rp", navigation);
              }}
            >
              reset{" "}
            </Text>
            <Text
              onPress={() => {
                nextNavigation("register", navigation);
              }}
            >
              createAccount
            </Text>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  footer: {
    flex: 2,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  header: {
    width: "100%",
    height: 180,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  logo: {
    width: width * 0.25,
    height: height * 0.13,
  },
  textBoxContainer: {
    borderColor: "black",
    borderWidth: 1,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    padding: 5,
  },
  inputBox: {
    width: "75%",
    height: 50,
    paddingHorizontal: 5,
    fontSize: 18,
  },
  createAccountContainer: {
    justifyContent: "space-around",
    width: "100%",
    flexDirection: "row",
    height: 90,
    alignItems: "center",
  },
  icon: {
    paddingHorizontal: 5,
  },
});
