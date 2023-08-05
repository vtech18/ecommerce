import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ImageBackground,
  Button,
  Alert,
} from "react-native";

import React, { useEffect, useState, useContext, useRef } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { StackActions } from "@react-navigation/native";

import Modal from "react-native-modal";
import axios from "axios";
import { deleteTheUser, theUser } from "../redux/Slices/fetchUser";

export default function EditUser({ navigation }) {
  const [modal, setModal] = useState(false);
  //camera belongings

  //user belongings
  const currentUser = useSelector((state: any) => state.fetch);
  const dispatch = useDispatch();
  const currentID = currentUser[0]?.id;
  const [updateUser, setUpdateUser] = useState({
    name: currentUser[currentUser.length - 1]?.name,
    mail: currentUser[currentUser.length - 1]?.mail,
    mobile: currentUser[currentUser.length - 1]?.mobile,
    place1: "",
  });

  const toogleModal = () => {
    setModal(!modal);
  };

  const handleUpdate = async () => {
    const name = updateUser.name;
    const mail = updateUser.mail;
    const mobile = updateUser.mobile;
    const password = currentUser[currentUser.length - 1].password;
    const id = currentID;
    const place = updateUser.place1;
    await axios.put(`http://192.168.1.153:4212/users/${id}`, {
      name,
      mail,
      mobile,
      password,
      id,
      place,
    });
    dispatch(deleteTheUser(id));
    dispatch(theUser({ name, mail, mobile, id, place }));
    navigation.navigate("profile");
  };

  return (
    <View style={styles.container}>
      {/* <--- camera ends  */}
      <View style={styles.imageContainer}>
        <TouchableOpacity activeOpacity={1} style={styles.imageView}>
          <ImageBackground
            style={styles.imageBackground}
            imageStyle={{ borderRadius: 100 }}
            source={require("../assets/userlogo2.png")}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.editingContainer}>
        <View style={styles.editBox}>
          <MaterialIcons
            name="person"
            size={20}
            style={{ paddingHorizontal: 5 }}
          />
          <TextInput
            style={styles.input}
            defaultValue={currentUser[currentUser.length - 1]?.name}
            onChangeText={(val) => setUpdateUser({ ...updateUser, name: val })}
          />
        </View>
        <View style={styles.editBox}>
          <MaterialIcons
            name="mail-outline"
            size={20}
            style={{ paddingHorizontal: 5 }}
          />
          <TextInput
            style={styles.input}
            defaultValue={currentUser[currentUser.length - 1]?.mail}
            onChangeText={(val) => setUpdateUser({ ...updateUser, mail: val })}
          />
        </View>
        <View style={styles.editBox}>
          <MaterialIcons
            name="phone"
            size={20}
            style={{ paddingHorizontal: 5 }}
          />
          <TextInput
            style={styles.input}
            defaultValue={currentUser[currentUser.length - 1]?.mobile}
            onChangeText={(val) =>
              setUpdateUser({ ...updateUser, mobile: val })
            }
          />
        </View>
        <View style={styles.editBox}>
          <MaterialIcons
            name="location-city"
            size={20}
            style={{ paddingHorizontal: 5 }}
          />
          <TextInput
            style={styles.input}
            placeholder="place"
            onChangeText={(val) =>
              setUpdateUser({ ...updateUser, place1: val })
            }
          />
        </View>

        {/*  modal starts -->  */}

        <Modal
          isVisible={modal}
          style={{ margin: 0, padding: 0 }}
          onBackButtonPress={toogleModal}
          animationIn={"fadeInUp"}
          animationOut={"fadeOut"}
        >
          <View style={modalStyle.modalContainer}>
            <TouchableOpacity
              activeOpacity={1}
              style={modalStyle.button}
              onPress={() => {
                setModal(!modal), navigation.navigate("takePicture");
              }}
            >
              <Text style={modalStyle.text}>Use Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              style={modalStyle.button}
              onPress={() => setModal(!modal)}
            >
              <Text style={modalStyle.text}>choose from gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              style={modalStyle.button}
              onPress={() => setModal(!modal)}
            >
              <Text style={modalStyle.text}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
      <Button title="update" onPress={handleUpdate} />
      <Button title="modal" onPress={toogleModal} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  imageContainer: {
    width: "100%",
    height: 110,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  imageView: {
    width: 105,
    height: 105,
    borderColor: "#D3D3D3",
    borderWidth: 1,
    borderRadius: 100,
  },
  imageBackground: {
    width: "100%",
    height: "100%",
  },
  editingContainer: {
    width: "100%",
    height: 250,
    justifyContent: "center",
    alignItems: "center",
  },
  editBox: {
    width: "90%",
    height: 45,
    flexDirection: "row",
    borderColor: "blue",
    borderWidth: 1,
    alignItems: "center",
    paddingVertical: 5,
    marginBottom: 10,
    borderRadius: 50,
  },
  input: {
    padding: 5,
    width: "80%",
    height: "100%",
  },
});
const modalStyle = StyleSheet.create({
  modalContainer: {
    width: "100%",
    height: "35%",
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: "90%",
    height: 55,
    backgroundColor: "#157DEC",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  text: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "bold",
  },
});
