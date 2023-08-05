import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  Pressable,
} from "react-native";
import { categoryFilter } from "./CategoryFilter";
import React, { useState, useRef, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Picker } from "@react-native-picker/picker";
import { addProduct } from "../redux/Slices/productSlice";

export default function UploadProducts() {
  //console.log(categoryFilter);
  var category = "";
  //const [categoryOption,setCategoryOption]=useState('category')
  const [productDetails, setProductDetails] = useState({
    id: "",
    name: "",
    price: "",
    description: "",
    url: "https://m.media-amazon.com/images/I/61ZWfbRjP0L._SY741_.jpg",
    category: "category",
  });
  const dispatch = useDispatch();

  const handleAddProduct = () => {
    dispatch(addProduct(productDetails));
    console.log(productDetails.category);
  };

  return (
    <ScrollView style={{ backgroundColor: "#fff" }}>
      <View style={styles.footer}>
        <Text
          style={{
            fontSize: 25,
            fontWeight: "bold",
            textAlign: "left",
            marginVertical: 15,
          }}
        >
          hello new user!
        </Text>

        {/* name */}

        <TextInput
          style={styles.inputBox}
          placeholder="product id"
          keyboardType="default"
          onChangeText={(val): void => {
            setProductDetails({ ...productDetails, id: val });
          }}
        />

        {/* password */}

        <TextInput
          style={styles.inputBox}
          placeholder="name "
          autoCorrect={false}
          autoComplete="off"
          onChangeText={(val): void => {
            setProductDetails({ ...productDetails, name: val });
          }}
        />

        {/* confirm  password */}

        <TextInput
          autoCapitalize="none"
          style={styles.inputBox}
          placeholder="url"
          autoCorrect={false}
          autoComplete="off"
          onChangeText={(val): void => {
            setProductDetails({ ...productDetails, url: val });
          }}
        />

        {/* mobile */}

        <TextInput
          multiline
          keyboardType="default"
          style={[styles.inputBox, styles.multilineTextBox]}
          placeholder="description"
          onChangeText={(val): void => {
            setProductDetails({ ...productDetails, description: val });
          }}
        />

        {/* email  */}

        <TextInput
          style={styles.inputBox}
          placeholder="price"
          autoCapitalize="none"
          keyboardType="number-pad"
          onChangeText={(val): void => {
            setProductDetails({ ...productDetails, price: val });
          }}
        />

        <Picker
          selectedValue={productDetails.category}
          style={styles.inputBox}
          onValueChange={(val) =>
            setProductDetails({ ...productDetails, category: val })
          }
        >
          <Picker.Item label="category" value="category" />
          {categoryFilter.map((ele) => (
            <Picker.Item label={ele.name} value={ele.category} />
          ))}
        </Picker>

        <Pressable
          onPress={handleAddProduct}
          style={({ pressed }) => [
            styles.presable,
            pressed && { backgroundColor: "#000" },
          ]}
        >
          {({ pressed }) => {
            return (
              <Text
                style={[
                  { textAlign: "center", fontSize: 18, fontWeight: "bold" },
                  pressed && { color: "#fff" },
                ]}
              >
                create
              </Text>
            );
          }}
        </Pressable>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  footer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
  },

  inputBox: {
    width: "85%",
    height: 45,
    paddingHorizontal: 5,
    fontSize: 18,
    marginBottom: 15,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 25,
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
  multilineTextBox: {
    flexWrap: "wrap",
    fontSize: 14,
    height: 70,
  },
  presable: {
    width: 100,
    height: 35,
    backgroundColor: "#fff",
    color: "#000",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 25,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

// <TextInput
//             style={styles.inputBox}
//             placeholder="category"
//             autoCapitalize="none"
//             keyboardType="default"
//             onChangeText={(val): void => {
//               setProductDetails({ ...productDetails, category: val });
//             }}
//           />
