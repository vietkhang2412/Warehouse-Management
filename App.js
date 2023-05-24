import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState } from "react";

import AddEmployee from "./components/Employee/AddEmployee";
import AddEmployee2 from "./components/Employee/AddEmployee2";

const StackDemo = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StackDemo.Navigator
        initialRouteName="AddEmployee"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#03DAC6",
          },
          headerBackVisible: true,
        }}
      >
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
        {/* <StackDemo.Screen
          name="UpdateEmployee"
          component={AddEmployee}
          options={{ headerShown: false }}
        /> */}
      </StackDemo.Navigator>
    </NavigationContainer>
  );
}
