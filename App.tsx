import LogIn from "./screens/LogIn";
import Cart from "./screens/Cart";
import Home from "./screens/Home";
import Products from "./screens/Products";
import Profile from "./screens/Profile";
import SingleProduct from "./screens/SingleProduct";
import { UserContex, userList } from "./Context/UserContex";
import WishList from "./screens/WishList";

import UploadProducts from "./adminControlls/UploadProducts";
import AdminPanel from "./adminControlls/AdminPanel";
import { StyleSheet, Keyboard, StatusBar } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Register from "./screens/Register";
import ForgotPassword from "./screens/ForgotPassword";
import ResetPassword from "./screens/ResetPassword";
import ViewProducts from "./adminControlls/ViewProducts";
import ManageUsers from "./adminControlls/ManageUsers";
import EditUser from "./screens/EditUser";
import React from "react";
import TakePicture from "./screens/TakePicture";
import { store } from "./redux/store";
import Slide1 from "./screens/modals/Slide1";
import DealsOfTheDay from "./screens/homeComponents/DealsOfTheDay";

const Stack: any = createNativeStackNavigator();
const Tab: any = createBottomTabNavigator();
export function Tab1() {
  const { isAdminLogged } = React.useContext(userList);
  console.log(isAdminLogged);
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="hometab"
        component={HomeTab}
        options={{
          tabBarActiveTintColor: "blue",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={focused ? 30 : 24}
              color="black"
            />
          ),
          tabBarShowLabel: false,
        }}
      />

      <Tab.Screen
        name="carttab"
        component={Cart}
        options={{
          tabBarActiveTintColor: "blue",
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              d
              name={focused ? "cart" : "cart-outline"}
              size={focused ? 30 : 24}
              color="black"
            />
          ),
        }}
      />

      <Tab.Screen
        name="settings"
        component={SettingTab}
        options={{
          tabBarActiveTintColor: "blue",
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "settings" : "settings-outline"}
              size={focused ? 30 : 24}
              color="black"
            />
          ),
        }}
      />

      <Tab.Screen
        name="wishlist"
        component={WishList}
        options={{
          tabBarActiveTintColor: "blue",
          headerShown: true,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "heart" : "heart-outline"}
              size={focused ? 30 : 24}
              color="black"
            />
          ),
          headerStyle: { backgroundColor: "#1e90ff" },
        }}
      />
      {isAdminLogged && (
        <Tab.Screen
          name="admin"
          component={AdminTab}
          options={{
            tabBarActiveTintColor: "blue",
            headerShown: true,
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }) => (
              <MaterialIcons
                name={focused ? "admin-panel-settings" : "admin-panel-settings"}
                size={focused ? 30 : 24}
                color="black"
              />
            ),
            headerStyle: { backgroundColor: "#1e90ff" },
          }}
        />
      )}
    </Tab.Navigator>
  );
}
export function AdminTab() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="adminPanne" component={AdminPanel} />
      <Stack.Screen name="uploadProducts" component={UploadProducts} />
      <Stack.Screen name=" manageUsers" component={ManageUsers} />
    </Stack.Navigator>
  );
}
export function SettingTab() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="editUser" component={EditUser} />
      <Stack.Screen name="takePicture" component={TakePicture} />
      <Stack.Screen name="profile" component={Profile} />
    </Stack.Navigator>
  );
}

export function HomeTab() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home  " component={Home} />
      <Stack.Screen name="products" component={Products} />
      <Stack.Screen
        name="singleProduct"
        component={SingleProduct}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
}

export default function App(): JSX.Element {
  return (
    <UserContex>
      <Provider store={store}>
        <StatusBar backgroundColor={"#fff"} barStyle="dark-content" />
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="login" component={LogIn} />
            <Stack.Screen name="register" component={Register} />
            <Stack.Screen name="fp" component={ForgotPassword} />
            <Stack.Screen name="rp" component={ResetPassword} />

            <Stack.Screen name="tabs" component={Tab1} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </UserContex>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
