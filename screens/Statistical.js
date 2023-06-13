import React from "react";
import { View, Text, SafeAreaView, StyleSheet, Toolbar } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import QuantityStats from "./QuantityStats";
import AmountStats from "./AmountStats";

const Tab = createMaterialTopTabNavigator();

export default function Statistical() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.toolbarContainer}>
        <Text style={{ color: "white", fontSize: 17, fontWeight: "bold" }}>
          THỐNG KÊ
        </Text>
      </View>

      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: {
            textTransform: "none",
            fontWeight: "bold",
            fontSize: 16,
          },
          tabBarTabStyle: { width: "auto" },
          tabBarIndicatorStyle: { backgroundColor: "#03DAC6" },
        }}
      >
        <Tab.Screen name="Thông kê số lượng" component={QuantityStats} />
        <Tab.Screen name="Thông kê lượng tiền" component={AmountStats} />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screenContainer: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  toolbarContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#03DAC6",
    paddingHorizontal: 16,
    height: 56,
    width: "100%",
  },
});
