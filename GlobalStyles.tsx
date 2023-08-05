import { StyleSheet } from "react-native";
const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputBox: {
    height: 45,
    width: "90%",
    fontSize: 20,
    backgroundColor: "#fff",
    borderRadius: 1,
    borderWidth: 0.3,
    borderColor: "gray",
  },

  //this is common nav bar code used in Cart and home
  navBar: {
    width: "100%",
    height: 65,
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 5,
  },
  logo: {
    height: "100%",
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
  },
  NaviagteSymbol: {
    height: "100%",
    width: "15%",
    justifyContent: "center",
    alignItems: "center",
  },
  //this is common nav bar code used in Cart and home
});
export default globalStyles;

export const TextStyles = StyleSheet.create({
  h1: {
    fontSize: 32,
    marginVertical: 10,
    fontWeight: "bold",
    padding: 5,
  },
  h2: {
    fontSize: 24,
    marginVertical: 13,
    fontWeight: "bold",
    padding: 5,
  },
  h3: {
    fontSize: 18,
    marginVertical: 16,
    fontWeight: "bold",
    padding: 5,
  },
  h4: {
    fontSize: 16,
    marginVertical: 21,
    fontWeight: "bold",
    padding: 5,
  },
  h5: {
    fontSize: 14,
    marginVertical: 27,
    fontWeight: "bold",
    padding: 5,
  },
  h6: {
    fontSize: 12,
    marginVertical: 29.28,
    fontWeight: "bold",
    padding: 5,
  },
});
