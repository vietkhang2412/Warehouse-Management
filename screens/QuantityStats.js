import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";


var items = [
  { name: "Xúc xích", quantity: 10 },
  { name: "Bánh mỳ", quantity: 5 },
  { name: "Sữa tươi", quantity: 8 },
  { name: "Trứng gà", quantity: 12 },
  { name: "Trứng gà", quantity: 12 },
  { name: "Trứng gà", quantity: 12 },
  { name: "Trứng gà", quantity: 12 },
];

function NhapKhoScreen() {


  return (
    <View style={styles.pageContainer}>
      <ScrollView contentContainerStyle={styles.listContainer}>
        {items.map((item, index) => (
          <View key={index} style={styles.item}>
            <Text style={styles.itemName}>{item.name}</Text>
            
            <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
              <Text style ={{color:"gray"}}>Số lượng: </Text>
            <Text style={styles.itemQuantity}>{item.quantity}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

function XuatKhoScreen() {
  return <View style={styles.pageContainer}>
        <ScrollView contentContainerStyle={styles.listContainer}>
        {items.map((item, index) => (
          <View key={index} style={styles.item}>
            <Text style={styles.itemName}>{item.name}</Text>
            <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
              <Text style ={{color:"gray"}}>Số lượng: </Text>
            <Text style={styles.itemQuantity}>{item.quantity}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
  </View>;
}

const Tab = createMaterialTopTabNavigator();

export default function QuantityStats() {
  const [selectedWeek, setSelectedWeek] = useState("Tuần này");
  const [showPicker, setShowPicker] = useState(false);

  const totalNhapKho = 100; // Giá trị tổng nhập kho tĩnh
  const totalXuatKho = 50; // Giá trị tổng xuất kho tĩnh

  const handleTogglePicker = () => {
    setShowPicker(!showPicker);
  };

  const handleWeekChange = (value) => {
    setSelectedWeek(value);
    setShowPicker(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleTogglePicker}>
        <View style={styles.pickerContainer}>
          <Image source={require("../assets/date.png")} style={styles.icon} />
          <Text style={styles.selectedValue}>{selectedWeek}</Text>
          <Image source={require("../assets/arrow.png")} style={styles.icon1} />
        </View>
      </TouchableOpacity>

      {showPicker && (
        <View style={[styles.dropdown, showPicker && styles.dropdownVisible]}>
          <TouchableOpacity onPress={() => handleWeekChange("Tuần này")}>
            <Text style={styles.dropdownItem}>Tuần này</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleWeekChange("Tuần trước")}>
            <Text style={styles.dropdownItem}>Tuần trước</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleWeekChange("Tuần sau")}>
            <Text style={styles.dropdownItem}>Tuần sau</Text>
          </TouchableOpacity>
        </View>
      )}

      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarStyle: { backgroundColor: "#FFFFFF", marginHorizontal: 20 },
          tabBarLabelStyle: { fontSize: 16, fontWeight: "bold" },
          tabBarTabStyle: { width: "auto" },
          tabBarIndicatorStyle: { backgroundColor: "#03DAC6" },
          tabBarLabel: ({ focused, color }) => {
            let label = route.name;
            let totalValue = "";
            if (route.name === "Nhập kho") {
              // Hiển thị tổng nhập kho trong label
              totalValue = `${totalNhapKho}`;
            } else if (route.name === "Xuất kho") {
              // Hiển thị tổng xuất kho trong label
              totalValue = `${totalXuatKho}`;
            }
            return (
              <View style={{ alignItems: "center" }}>
                <Text style={{ color, fontWeight: "bold", fontSize: 18 }}>
                  {label}
                </Text>
                <Text
                  style={{
                    color,
                    fontSize: 14,
                    marginTop: 10,
                    fontWeight: "bold",
                  }}
                >
                  {totalValue}
                </Text>
              </View>
            );
          },
        })}
      >
        <Tab.Screen
          name="Nhập kho"
          component={NhapKhoScreen}
          options={{ title: "Nhập kho" }}
        />
        <Tab.Screen
          name="Xuất kho"
          component={XuatKhoScreen}
          options={{ title: "Xuất kho" }}
        />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
  },
  pickerContainer: {
    marginTop: 20,
    borderBottomWidth: 1,
    borderColor: "#D9D9D9",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 20,
  },

  selectedValue: {
    fontSize: 16,
  },
  icon: {
    marginEnd: 15,
  },
  icon1: {
    marginStart: 15,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#D9D9D9",
    borderRadius: 4,
    backgroundColor: "#FFFFFF",
    elevation: 10, // Thêm thuộc tính elevation
    position: "absolute",
    top: 70, // Đặt vị trí top ở giữa màn hình
    left: 130, // Đặt vị trí left ở giữa màn hình
    zIndex: 9999, // Thêm thuộc tính zIndex
  },

  dropdownVisible: {
    zIndex: 9999, // Đảm bảo dropdown luôn nằm trên các màn hình con
  },
  dropdownItem: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    marginHorizontal: 20,
    borderColor: "#D9D9D9",
    fontSize: 16,
  },
  pageContainer: {
    flex: 1,
    marginHorizontal: 20,
  },

  listContainer: {
   marginVertical:20,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    marginVertical:10,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
    marginStart:20,
  },
  itemQuantity: {
    fontSize: 14,
    color: "red",
    fontWeight:'bold',
    marginEnd:20,
  },
});
