import * as React from "react"
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, View } from 'react-native';
import IntroHello from "./screens/intro/IntroHello";
import IntroThankyou from "./screens/intro/IntroThankyou";
import Login from "./screens/login/Login";
import Register from "./screens/login/Register";

// Khởi tạo Stack
const Stack = createStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator>
          
              <Stack.Screen name="IntroHello" component={IntroHello} options={{headerShown:false}}/> 
              <Stack.Screen name="IntroThankyou" component={IntroThankyou} options={{headerShown:false}}/> 
              <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/> 
              <Stack.Screen name="Register" component={Register} options={{headerShown:false}}/> 
        </Stack.Navigator>
      </NavigationContainer>
  );
}


