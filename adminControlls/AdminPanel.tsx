import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import UploadProducts from "./UploadProducts";
export default function AdminPanel({ navigation }) {
  return (
    <View>
      <Button
        title="add product"
        onPress={() => navigation.navigate("uploadProducts")}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
