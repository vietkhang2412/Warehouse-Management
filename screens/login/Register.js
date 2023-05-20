import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  Dimensions,
} from "react-native";
import React from "react";
import LoginForm from "../../components/LoginForm";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Register({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Image
        source={require("../../assets/bg-register.png")}
        style={styles.image}
        resizeMode="stretch"
      />
      <View style={styles.textContainer}>
        <Text style={styles.loginText}>Đăng ký</Text>
      </View>
      <View style={styles.formContainer}>
        <LoginForm isSignUp={true} />
      </View>
      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>
          Bạn đã có tài khoản?
          <Text
            style={styles.registerLinkText}
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            Đăng nhập
          </Text>
        </Text>
      </View>
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
  textContainer: {
    marginStart: 32,
    marginTop: 71,
  },
  loginText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  formContainer: {
    marginHorizontal: 20,
    marginTop: 100,
  },
  registerContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  registerText: {
    fontSize: 16,
    color: "black",
  },
  registerLinkText: {
    color: "#1E5890",
    fontWeight: "bold",
  },
});
