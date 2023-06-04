import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";

const Dropdown = (props) => {
  const [showOption, setShowOption] = useState(false);
  const onSelectItem = (val) => {
    setShowOption(false);
    props.onSelect(val);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.dropDownStyle}
        activeOpacity={0.8}
        onPress={() => setShowOption(!showOption)}
      >
        <Text>{!!props.value ? props.value?.name : "Nhập"}</Text>
        <MaterialIcons
          name="arrow-drop-down"
          size={24}
          color={"black"}
          style={{ transform: [{ rotate: showOption ? "180deg" : "0deg" }] }}
        />
      </TouchableOpacity>
      {showOption && (
        <View
          style={{
            backgroundColor: "#eee",
            padding: 8,
            borderRadius: 6,
            paddingBottom: 4,
            maxHeight: 150,
          }}
        >
          <ScrollView>
            {props.data.map((val, i) => {
              return (
                <TouchableOpacity
                  key={String(i)}
                  onPress={() => onSelectItem(val)}
                  style={{
                    ...styles.selectedItemStyle,
                    backgroundColor:
                      props.value.id == val.id ? "rgba(0,0,0,0.1)" : "white",
                  }}
                >
                  <Text>{val.name}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      )}
    </View>
  );
};
const screenWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  container: {
    width: screenWidth - 100,
    backgroundColor: "#fff",
    marginTop: 10,
  },
  dropDownStyle: {
    backgroundColor: "rgba(0,0,0,0.1)",
    padding: 8,
    borderRadius: 6,
    Height: 41,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 0,
  },
  selectedItemStyle: {
    paddingVertical: 8,
    borderRadius: 4,
    paddingHorizontal: 6,
    marginBottom: 4,
  },
});

export default Dropdown;
