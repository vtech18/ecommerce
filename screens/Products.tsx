import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  FlatList,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  LogBox,
} from "react-native";
import { Permission } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import Voice from "@react-native-voice/voice";
import axios from "axios";
import {
  EvilIcons,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import Modal, { ReactNativeModal } from "react-native-modal";
import {
  categoryFilter1,
  categoryFilter2,
} from "../adminControlls/CategoryFilter";
import LogIn from "./LogIn";

export default function Products({ navigation }): JSX.Element {
  const [prod, setProd] = useState([]);
  const [isLoaded, setIsLoaded] = useState(true);
  const [showRecorder, setShowRecorder] = useState(false);
  const [filterCondition, setFilterCondition] = useState("all");
  const [searchInput, setSearchInput] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const searchRef = useRef();
  // voice
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState("");
  const [clipURI, setClipURI] = useState("");
  // const [isPlayable, setIsPlayable] = useState(false);

  const searchAction = async (text: string) => {
    if (text == "") {
      const res = await axios.get("https://fakestoreapi.com/products/");
      setProd(res.data);
    } else {
      const filteredProducts = prod.filter((item: { title: string }) =>
        item.title.toLowerCase().includes(text.toLowerCase())
      );
      setProd(filteredProducts);
    }
  };

  Voice.onSpeechResults = (res) => {
    console.log(res);
  };

  const toogleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const startRecording = async () => {
    setIsRecording(true);
    await Voice.start("en-US");
    console.log("voice started");
  };
  const stopRecording = async () => {
    setIsRecording(false);
    await Voice.stop();
  };

  const fetchProd = async (): Promise<void> => {
    const res = await axios.get("https://fakestoreapi.com/products/");
    if (filterCondition == "all") {
      setProd(res.data);
      setIsLoaded(false);
    } else {
      const k: {
        id: number;
        title: string;
        image: string;
        rating: { rate: number };
        price: number;
        category: string;
        description: string;
      }[] = res.data.filter(
        (ele: { category: string }) => ele.category == filterCondition
      );
      setProd(k);
      setIsLoaded(false);
    }
  };
  //filter consition method
  const applyFilter = (item: string) => {
    setFilterCondition(item);
  };

  //use effect to render the component
  useEffect(() => {
    fetchProd();
  }, [filterCondition]);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {isLoaded ? (
        <View style={styles.loadingButton}>
          <Image
            source={require("../assets/giphy2.gif")}
            style={{ width: 100, height: 70, resizeMode: "center" }}
          />
        </View>
      ) : (
        <>
          {/* nav bar starts here   */}
          <View style={styles.ToolsContainer}>
            <View style={styles.searchBar}>
              <TextInput
                onChangeText={(val) => searchAction(val)}
                placeholder="search"
                ref={searchRef}
                style={styles.searchBox}
              />
              <EvilIcons
                name="search"
                size={36}
                // onPress={() => searchAction(searchInput)}
                color="black"
              />
            </View>

            <MaterialCommunityIcons
              name={
                filterCondition == "all"
                  ? "filter-variant"
                  : "filter-variant-remove"
              }
              size={24}
              color="#fff"
              onPress={() => toogleModal()}
            />
            <MaterialIcons
              onPress={() => setShowRecorder(true)}
              name="mic"
              size={24}
              color="#fff"
            />
            <View style={styles.navBarLocation}>
              <MaterialIcons name="place" size={24} color="#fff" />
            </View>
          </View>

          {/* nav bar  ends  here   */}

          {/* filter modal */}
          <Modal
            isVisible={isModalVisible}
            style={{ margin: 0, padding: 0 }}
            onBackButtonPress={toogleModal}
            animationIn={"fadeInUp"}
            animationOut={"fadeOut"}
          >
            <View style={modalStyle.modalContainer}>
              <View style={modalStyle.childContainer1}>
                {/* 1st child of main modal */}
                <Text style={modalStyle.text}>categorie"s</Text>
                <View style={modalStyle.categoryContainer}>
                  {/* at the bottom of the text "category" to contal all categories i installed another view */}
                  <View>
                    {categoryFilter1.map(
                      (ele: { name: string; category: string }) => (
                        <Text
                          style={{ margin: 3 }}
                          onPress={() => applyFilter(ele.category)}
                        >
                          {ele.name}
                        </Text>
                      )
                    )}
                  </View>
                  <View>
                    {categoryFilter2.map(
                      (ele: { name: string; category: string }) => (
                        <Text
                          style={{ margin: 3 }}
                          onPress={() => applyFilter(ele.category)}
                        >
                          {ele.name}
                        </Text>
                      )
                    )}

                    <Button onPress={() => applyFilter("all")} title="clear " />
                  </View>
                </View>
                <View></View>
              </View>
              <View style={modalStyle.childContainer2}>
                <Text style={modalStyle.text}>filter</Text>
                <View style={modalStyle.sortContainer}>
                  <Text style={modalStyle.filterText}>price: low-high</Text>
                  <Text style={modalStyle.filterText}>price: high-low</Text>
                  <Text style={modalStyle.filterText}>by popularity </Text>
                  <Text style={modalStyle.filterText}> new arrivals</Text>
                  <Button title="cancel" onPress={toogleModal} />
                </View>
              </View>
            </View>
          </Modal>

          {/* filter modal ends ------------ */}

          {/* recorder filter starts */}

          <ReactNativeModal
            onBackdropPress={() => setShowRecorder(false)}
            animationOut={"bounceOut"}
            animationIn={"bounceIn"}
            isVisible={showRecorder}
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <View
              style={{
                width: "100%",
                height: "50%",
                backgroundColor: "#fff",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: "100%",
                  height: 100,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <FontAwesome5
                  onPress={() => {
                    setIsRecording(!isRecording);
                    {
                      !isRecording ? startRecording() : stopRecording();
                    }
                  }}
                  name={isRecording ? "microphone-alt-slash" : "microphone"}
                  size={30}
                  color="#0047AB"
                />
                <Text
                  style={{
                    fontSize: 17,
                    fontFamily: "sans",
                    paddingVertical: 30,
                  }}
                >
                  {isRecording
                    ? "tap on the mic to stop recording "
                    : "tap on the mic to Record"}
                </Text>
              </View>
            </View>
          </ReactNativeModal>
          {/* recorder filter ends */}

          {/* flat list ------------------- */}

          <FlatList
            numColumns={2}
            columnWrapperStyle={{ justifyContent: "space-around" }}
            data={prod}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  key={item.index}
                  activeOpacity={1}
                  style={{ width: "50%", height: 290, marginBottom: 10 }}
                  onPress={() => navigation.navigate("singleProduct", item)}
                >
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                      height: "70%",
                    }}
                  >
                    <Image
                      style={{
                        width: "80%",
                        height: "100%",
                        resizeMode: "center",
                      }}
                      source={{ uri: item.image }}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      height: "10%",
                    }}
                  >
                    <Text style={{ paddingHorizontal: 15 }}>₹{item.price}</Text>
                    <Text style={{ paddingHorizontal: 15 }}>⭐{item.id}</Text>
                  </View>
                  <View style={{ height: "15%" }}>
                    <Text style={{ padding: 5 }}>{item.title}</Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  ToolsContainer: {
    width: "100%",
    height: "10%",
    backgroundColor: "black",
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  searchBar: {
    width: 230,
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,

    height: 35,
    justifyContent: "center",
  },
  searchBox: {
    height: 27,
    width: 165,
    fontSize: 15,
    backgroundColor: "#fff",
  },
  filterList: {
    width: 200,
    height: 200,
    backgroundColor: "red",
    zIndex: 999,
  },
  loadingButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    flex: 1,
  },
  navBarLocation: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
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
    flexDirection: "row",
  },
  button: {
    width: "60%",
    height: 35,
    backgroundColor: "#157DEC",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "400",
    marginBottom: 5,
  },
  childContainer2: {
    width: "40%",
    height: "100%",
    // borderColor:"blue",
    // borderWidth:1,
  },
  childContainer1: {
    width: "60%",
    height: "100%",
    //  borderColor:"blue",
    //  borderWidth:1,
  },
  categoryContainer: {
    width: "100%",
    height: "86%",
    // borderColor:"red",
    // borderWidth:1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  filterText: {
    fontSize: 14,
    marginBottom: 18,
  },
  sortContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "80%",
  },
});
