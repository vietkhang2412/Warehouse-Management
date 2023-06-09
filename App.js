import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListEmployee from "./components/Employee/ListEmployee";
import AddEmployee2 from "./components/Employee/AddEmployee2";

import List_Prod from "./components/Products/List_Prod";
import Add_Prod from "./components/Products/Add_Prod";
import Update_Prod from "./components/Products/Update_Prod";

const StackDemo = createNativeStackNavigator();
import { Text, View, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";


import Product from "./screens/Product";
import Bill from "./screens/Bill";
import Staff from "./screens/Staff";
import Statistical from "./screens/Statistical";
import IntroHello from "./screens/intro/IntroHello";
import IntroThankyou from "./screens/intro/IntroThankyou";
import Login from "./screens/login/Login";
import Register from "./screens/login/Register";
import UpdateEmployee from "./components/Employee/UpdateScreen";
import DetailHD from "./components/Bill/DetailHD";
const Tab = createBottomTabNavigator();


const TabBottom = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="SẢN PHẨM"
        component={List_Prod}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <MaterialIcons
                  name="storefront"
                  size={24}
                  color={focused ? "#00A8AA" : "#6C6C6C"}
                />
                <Text
                  style={{
                    fontSize: 12,
                    color: focused ? "#00A8AA" : "#6C6C6C",
                  }}
                >
                  SẢN PHẨM
                </Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="HÓA ĐƠN"
        component={Bill}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <MaterialIcons
                  name="receipt-long"
                  size={24}
                  color={focused ? "#00A8AA" : "#6C6C6C"}
                />
                <Text
                  style={{
                    fontSize: 12,
                    color: focused ? "#00A8AA" : "#6C6C6C",
                  }}
                >
                  HÓA ĐƠN
                </Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="NHÂN VIÊN"
        component={ListEmployee}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <MaterialIcons
                  name="people-outline"
                  size={24}
                  color={focused ? "#00A8AA" : "#6C6C6C"}
                />
                <Text
                  style={{
                    fontSize: 12,
                    color: focused ? "#00A8AA" : "#6C6C6C",
                  }}
                >
                  NHÂN VIÊN
                </Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="THỐNG KÊ"
        component={Statistical}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <MaterialIcons
                  name="date-range"
                  size={24}
                  color={focused ? "#00A8AA" : "#6C6C6C"}
                />
                <Text
                  style={{
                    fontSize: 12,
                    color: focused ? "#00A8AA" : "#6C6C6C",
                  }}
                >
                  THỐNG KÊ
                </Text>
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarStyle: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 60,
    background: "#fff",
  },
};

export default function App() {
  return (
    <NavigationContainer>
      <StackDemo.Navigator
        //initialRouteName="TabBottom"
        // initialRouteName="ListEmployee"
        initialRouteName="IntroHello"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#03DAC6",
          },
          headerBackVisible: false,
          headerShown: false,
        }}
      >
        <StackDemo.Screen
          name="TabBottom"
          component={TabBottom}
          options={{ headerShown: false }}
        />
        <StackDemo.Screen
          name="ListEmployee"
          component={ListEmployee}
          options={{
            headerShown: true,
            headerTitle: "Nhân Viên",
            // headerSearchBarOptions:
          }}
        />
        <StackDemo.Screen
          name="AddEmployee2"
          component={AddEmployee2}
          options={{
            headerShown: true,
            headerBackVisible: true,
            title: "Thêm nhân viên",
          }}
        />
        <StackDemo.Screen
          name="UpdateEmployee"
          component={UpdateEmployee}
          options={{
            headerShown: true,
            headerTitle: "Chỉnh sửa",
            headerBackVisible: true,
            // headerSearchBarOptions:
          }}
        />
        <StackDemo.Screen name="IntroHello" component={IntroHello} />
        <StackDemo.Screen name="Login" component={Login} />
        <StackDemo.Screen name="Register" component={Register} />
        <StackDemo.Screen name="Detail" component={DetailHD} />
        <StackDemo.Screen
          name="Add_Prod"
          component={Add_Prod}
          options={{ headerShown: false }}
        />
        <StackDemo.Screen
          name="List_Prod"
          component={List_Prod}
          options={{ headerShown: false }}
        />
        <StackDemo.Screen
          name="Update_Prod"
          component={Update_Prod}
          options={{ headerShown: false }}
        />
      </StackDemo.Navigator>
    </NavigationContainer>
  );
}
