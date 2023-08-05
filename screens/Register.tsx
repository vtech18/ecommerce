import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  StatusBar,
  TextInput,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Dimensions,
} from "react-native";

import * as Animatable from "react-native-animatable";
import { Feather } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form"; // for easy form validation
import { nextNavigation } from "../components/ReplaceFunction";
import { createAccount } from "../redux/Slices/userSlice";
const { height, width } = Dimensions.get("screen");

export default function Register({ navigation }) {
  const dispatch = useDispatch();
  const [showPassword, SetShowPassword] = useState(false);
  const [password2, setPassword2] = useState("");

  const [userDetails, setUserDetails] = useState({
    mail: "",
    password: "",
    id: "",
    mobile: "",
    name: "",
    place: "",
  });
  const Error = {
    passwordInvalid: "the pass word you entered is invalid ",
    paswordMismatch: "passwords are not same ",
    nameIsInvalid: "the name must not contain any spl charecters ",
    mobileIsInvalid: "mobile number shold not exceed or fall 10digits",
    notEmpty: "fill every field",
  };
  var errrorMessage = "hi";
  const validateUser = () => {
    dispatch(createAccount(userDetails));
  };

  return (
    <ScrollView
      style={{ backgroundColor: "#fff" }}
      bounces={false}
      endFillColor="#fff"
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
          marginTop: 30,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={styles.header}>
          <View
            style={{
              borderRadius: 100,
              borderColor: "red",
              borderWidth: 1,
              width: 100,
              height: 100,
            }}
          ></View>
        </View>

        <View style={styles.footer}>
          <Animatable.Text
            style={{
              fontSize: 25,
              fontWeight: "bold",
              textAlign: "left",
              marginVertical: 15,
            }}
            animation="fadeInLeft"
            duration={2000}
          >
            hello new user!
          </Animatable.Text>
          <Text style={{ color: "red", fontSize: 15, marginBottom: 10 }}>
            {errrorMessage}
          </Text>
          {/* name */}
          <Animatable.View
            animation="fadeInLeft"
            duration={2000}
            style={styles.textBoxContainer}
          >
            <Feather name="user" size={18} color="black" />
            <TextInput
              style={styles.inputBox}
              placeholder="name"
              keyboardType="default"
              onChangeText={(val): void => {
                setUserDetails({ ...userDetails, name: val });
              }}
            />
            <Feather
              name="check-circle"
              size={16}
              color="white"
              style={{ padding: 5 }}
            />
          </Animatable.View>

          {/* password */}
          <Animatable.View
            animation="fadeInLeft"
            duration={2000}
            style={styles.textBoxContainer}
          >
            <Feather name="lock" size={18} color="black" />
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
              name={showPassword ? "eye" : "eye-off"}
              size={16}
              color="black"
              style={{ padding: 5 }}
              onPress={(): void => SetShowPassword(!showPassword)}
            />
          </Animatable.View>
          {/* confirm  password */}
          <Animatable.View
            animation="fadeInLeft"
            duration={2000}
            style={styles.textBoxContainer}
          >
            <Feather name="lock" size={18} color="black" />
            <TextInput
              secureTextEntry={!showPassword ? true : false}
              autoCapitalize="none"
              style={styles.inputBox}
              placeholder="conform passsword"
              autoCorrect={false}
              autoComplete="off"
              onChangeText={(val): void => setPassword2(val)}
            />
            <Feather
              name={showPassword ? "eye" : "eye-off"}
              size={16}
              style={{ padding: 5 }}
              color="white"
            />
          </Animatable.View>
          {/* mobile */}
          <Animatable.View
            animation="fadeInLeft"
            duration={2000}
            style={styles.textBoxContainer}
          >
            <Feather name="phone" size={18} color="black" />
            <TextInput
              keyboardType="number-pad"
              style={styles.inputBox}
              placeholder="mobile"
              onChangeText={(val): void =>
                setUserDetails({ ...userDetails, mobile: val })
              }
            />
            <Feather
              name="eye-off"
              size={16}
              color="white"
              style={{ padding: 5 }}
            />
          </Animatable.View>
          {/* email  */}
          <Animatable.View
            animation="fadeInLeft"
            duration={2000}
            style={styles.textBoxContainer}
          >
            <Feather name="mail" size={18} color="black" />
            <TextInput
              style={styles.inputBox}
              placeholder="mail"
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={(val): void =>
                setUserDetails({ ...userDetails, mail: val })
              }
            />
            <Feather
              name="eye-off"
              size={16}
              color="white"
              style={{ padding: 5 }}
            />
          </Animatable.View>
          <Animatable.View
            animation="fadeInLeft"
            duration={2000}
            style={styles.textBoxContainer}
          >
            <Feather name="map" size={18} color="black" />
            <TextInput
              style={styles.inputBox}
              placeholder="place"
              autoCapitalize="none"
              onChangeText={(val): void =>
                setUserDetails({ ...userDetails, place: val })
              }
            />
            <Feather
              name="eye-off"
              size={16}
              color="white"
              style={{ padding: 5 }}
            />
          </Animatable.View>

          <Button title="register" color="black" onPress={validateUser} />
          <Text></Text>
          <Button
            title="Back"
            color="black"
            onPress={() => nextNavigation("login", navigation)}
          />
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  footer: {
    flex: 3,
    alignItems: "center",
    backgroundColor: "#fff",
  },

  textBoxContainer: {
    borderColor: "black",
    borderWidth: 1,
    marginBottom: 5,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    padding: 2,
  },
  inputBox: {
    width: "80%",
    height: 45,
    paddingHorizontal: 8,
    fontSize: 18,
  },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    marginVertical: 20,
  },
  logo: {
    width: "100%",
    height: "100%",
  },
});
