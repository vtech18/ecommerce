import { Button, StyleSheet, Text, View, TextInput, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { nextNavigation } from "../components/ReplaceFunction";
import { AntDesign } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { updateAccount } from "../redux/Slices/userSlice";
export default function ForgotPassword({ navigation, route }) {
  const allUsers = route.params;
  const [retrival, setRetrival] = useState({
    mail: "",
    otpSent: false,
    newPassword: "",
    confirmNewPassword: "",
    isValidUser: false,
  });
  const dispatch = useDispatch();
  const umail = retrival.mail;
  const userList: {
    id: string;
    mail: string;
    password: string;
    name: string;
    mobile: string;
  }[] = useSelector((state: any) => state.user);
  const singleUser: {
    id: number;
    mail: string;
    password: string;
    name: string;
    mobile: string;
  }[] = allUsers.filter((e: { mail: string }) => e.mail == umail);

  const updatePassword = () => {
    if (retrival.newPassword == retrival.confirmNewPassword) {
      singleUser[0].password = retrival.confirmNewPassword;
      dispatch(updateAccount(singleUser[0]));
      nextNavigation("login", navigation);
    } else Alert.alert("≠", "passwords are not matching ", [{ text: "ok" }]);
  };
  const validateUser = () => {
    //console.log(userList,'user');
    singleUser.length > 0
      ? (setRetrival({ ...retrival, isValidUser: true }),
        console.log("requested user ============="),
        console.log(singleUser))
      : umail.length > 0
      ? Alert.alert("OOPs", "it seems you entered a invalid mail ", [
          { text: "understood" },
        ])
      : Alert.alert("OOPs", "input can not be empty", [{ text: "ok" }]);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="registered mail id "
        style={styles.inputBox}
        keyboardType="email-address"
        autoCorrect={false}
        autoComplete="off"
        autoCapitalize="none"
        onChangeText={(val) => setRetrival({ ...retrival, mail: val })}
      />

      {/* <TextInput
          placeholder={retrival.otpSent?'enter OTP':''} 
          editable={(retrival.otpSent)?true:false}  
          style={styles.inputBox }
           /> */}
      {retrival.isValidUser ? (
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TextInput
            placeholder="new password"
            style={styles.inputBox}
            onChangeText={(val) =>
              setRetrival({ ...retrival, newPassword: val })
            }
          />
          <TextInput
            placeholder="confirm Password"
            onChangeText={(val) =>
              setRetrival({ ...retrival, confirmNewPassword: val })
            }
            style={styles.inputBox}
          />
        </View>
      ) : (
        ""
      )}

      <Button
        title={retrival.isValidUser ? "submit" : "validate"}
        onPress={retrival.isValidUser ? updatePassword : validateUser}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },

  inputBox: {
    width: "85%",
    height: 55,
    paddingHorizontal: 5,
    fontSize: 18,
    borderColor: "black",
    borderWidth: 1,
    marginVertical: 10,
    borderRadius: 30,
  },
});
{
  /* <Button title='submit' onPress={()=>nextNavigation('login',navigation)} />   */
}
