import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";

//Để lấy kích thước của cửa sổ hiện tại;
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function IntroHello({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Image
        source={require("../../assets/bg-intro0.png")}
        style={styles.image}
        resizeMode="stretch"
      />
      <View style={styles.centerContainer}>
        <Image
          source={require("../../assets/bg-img-intro.png")}
          style={styles.centerImage}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>Warehouse</Text>

        <Text style={styles.descriptionText}>
          Kho hàng là nơi lưu trữ hàng hoá vật lý.
        </Text>
        <Text style={styles.descriptionText}>
          Mục đích của kho hàng là lưu trữ tạm thời các sản phẩm số
        </Text>
        <Text style={styles.descriptionText}>
          lượng nhất định trước khi vận chuyển chúng ra ngoài
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.buttonText}>Bắt đầu</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: windowWidth,
    height: windowHeight,
    position: "absolute",
  },
  centerContainer: {
    marginTop: 110,
    justifyContent: "center",
    alignItems: "center",
  },
  centerImage: {
    resizeMode: "stretch",
  },
  textContainer: {
    marginHorizontal: 10,
    marginVertical: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontSize: 36,
    fontWeight: "600",
    marginBottom: 20,
  },
  descriptionText: {
    fontWeight: "300",
    fontSize:12
  },

  button: {
    backgroundColor: "#53FDFF",
    marginHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 80,
  },
  buttonText: {
    fontSize: 22,
    fontWeight: "400",
    textAlign: "center",
    color: "black",
  },
});
