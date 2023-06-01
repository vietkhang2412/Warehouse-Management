import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddEmployee from "./components/Employee/AddEmployee";
import AddEmployee2 from "./components/Employee/AddEmployee2";
import { Text, View, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import Product from "./screens/Product";
import Bill from "./screens/Bill";
import Staff from "./screens/Staff";
import Statistical from "./screens/Statistical";
import { SafeAreaProvider } from "react-native-safe-area-context";
import IntroHello from "./screens/intro/IntroHello";
import IntroThankyou from "./screens/intro/IntroThankyou";
import Login from "./screens/login/Login";
import Register from "./screens/login/Register";
const StackDemo = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabBottom = () => {
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen
          name="Product"
          component={Product}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
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
          name="Bill"
          component={Bill}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
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
          name="AddEmployee"
          component={AddEmployee}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
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
          name="Statistical"
          component={Statistical}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
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
    </SafeAreaProvider>
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
        // initialRouteName="TabBottom"
        // initialRouteName="AddEmployee"
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
          options={{ headerShown: true }}
        />
        <StackDemo.Screen
          name="AddEmployee"
          component={AddEmployee}
          options={{
            headerShown: true,
            headerTitle: "Nhân Viên",
            // headerSearchBarOptions:
          }}
        />
        <StackDemo.Screen
          name="AddEmployee2"
          component={AddEmployee2}
          // options={{ headerShown: false }}
        />
        <StackDemo.Screen name="IntroHello" component={IntroHello} />
        <StackDemo.Screen name="Login" component={Login} />
        <StackDemo.Screen name="Register" component={Register} />
      </StackDemo.Navigator>
    </NavigationContainer>
  );
}
