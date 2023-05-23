import { Text, View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import Product from './screens/Product';
import Bill from './screens/Bill';
import Staff from './screens/Staff';
import Statistical from './screens/Statistical';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Thanks for watching
const Tab = createBottomTabNavigator();
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
    background: "#fff"
  }
}
export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Tab.Navigator screenOptions={screenOptions}
          tabBarOptions={{ keyboardHidesTabBar: true }}
        >
          <Tab.Screen
            name="Product"
            component={Product}
            options={{
              tabBarIcon: ({ focused }) => {
                return (
                  <View style={{ alignItems: "center", justifyContent: "center" }}>
                    <MaterialIcons name="storefront" size={24} color={focused ? "#00A8AA" : "#6C6C6C"} />
                    <Text style={{ fonSize: 12, color: focused ? "#00A8AA" : "#6C6C6C" }}>SẢN PHẨM</Text>
                  </View>
                )
              }
            }}
          />
          <Tab.Screen
            name="Bill"
            component={Bill}
            options={{
              tabBarIcon: ({ focused }) => {
                return (
                  <View style={{ alignItems: "center", justifyContent: "center" }}>
                    <MaterialIcons name="receipt-long" size={24} color={focused ? "#00A8AA" : "#6C6C6C"} />
                    <Text style={{ fonSize: 12, color: focused ? "#00A8AA" : "#6C6C6C" }}>HÓA ĐƠN</Text>
                  </View>
                )
              }
            }}
          />
          <Tab.Screen
            name="Staff"
            component={Staff}
            options={{
              tabBarIcon: ({ focused }) => {
                return (
                  <View style={{ alignItems: "center", justifyContent: "center" }}>
                    <MaterialIcons name="people-outline" size={24} color={focused ? "#00A8AA" : "#6C6C6C"} />
                    <Text style={{ fonSize: 12, color: focused ? "#00A8AA" : "#6C6C6C" }}>NHÂN VIÊN</Text>
                  </View>
                )
              }
            }}
          />
          <Tab.Screen
            name="Statistical"
            component={Statistical}
            options={{
              tabBarIcon: ({ focused }) => {
                return (
                  <View style={{ alignItems: "center", justifyContent: "center" }}>
                    <MaterialIcons name="date-range" size={24} color={focused ? "#00A8AA" : "#6C6C6C"} />
                    <Text style={{ fonSize: 12, color: focused ? "#00A8AA" : "#6C6C6C" }}>THỐNG KÊ</Text>
                  </View>
                )
              }
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}
