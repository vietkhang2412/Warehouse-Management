import { StyleSheet, View, Image, Dimensions } from "react-native";
import React, { useEffect } from "react";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function IntroThankyou({ navigation }) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.replace("Login");
    }, 1500);
    return () => clearTimeout(timeout);   
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/bg-intro1.png")}
        style={styles.image}
        resizeMode="stretch"
      />
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
  },
});
