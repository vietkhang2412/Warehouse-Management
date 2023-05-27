import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import IntroHello from "./screens/intro/IntroHello";
import IntroThankyou from "./screens/intro/IntroThankyou";
import Login from "./screens/login/Login";
import Register from "./screens/login/Register";
import Product from "./screens/home/Product";
import Order from "./screens/home/Order";
import Employee from "./screens/home/Employee";
import Statistic from "./screens/home/Statistic";

import { Image } from "react-native";
// Khởi tạo Stack
const Stack = createStackNavigator();

//Khởi tại Tab;
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="IntroHello" component={IntroHello} />

        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="HomeTab" component={HomeTab} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function CustomIcon({ source, focused, size, color }) {
  return (
    <Image
      source={source}
      style={{
        width: size,
        height: size,
        tintColor: focused ? color : "gray",
      }}
    />
  );
}

function HomeTab() {
  return (
    <Tab.Navigator
      initialRouteName="SẢN PHẨM"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let source;
          if (route.name === "SẢN PHẨM") {
            source = focused
              ? require("./assets/icons/shop.png")
              : require("./assets/icons/shop-outline.png");
            size = focused ? size + 8 : size + 5;
          } else if (route.name === "ĐƠN HÀNG") {
            source = focused
              ? require("./assets/icons/paper.png")
              : require("./assets/icons/paper-outline.png");
            size = focused ? size + 8 : size + 5;
          } else if (route.name === "NHÂN VIÊN") {
            source = focused
              ? require("./assets/icons/group.png")
              : require("./assets/icons/group-outline.png");
            size = focused ? size + 8 : size + 5;
          } else if (route.name === "THỐNG KÊ") {
            source = focused
              ? require("./assets/icons/desk.png")
              : require("./assets/icons/desk-outline.png");
          }
          return (
            <CustomIcon
              source={source}
              focused={focused}
              size={size}
              color={color}
            />
          );
        },
        tabBarActiveTintColor: "white",
        tabBarStyle: [
          {
           backgroundColor: "#00A8AA",
            height: 55,
            justifyContent: "center",
            alignItems: "center",
          },
        ],
      })}
    >
      <Tab.Screen name="SẢN PHẨM" component={Product} />
      <Tab.Screen name="ĐƠN HÀNG" component={Order} />
      <Tab.Screen name="NHÂN VIÊN" component={Employee} />
      <Tab.Screen name="THỐNG KÊ" component={Statistic} />
    </Tab.Navigator>
  );
}
