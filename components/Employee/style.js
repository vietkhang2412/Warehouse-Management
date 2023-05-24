import { StyleSheet, Dimensions } from "react-native";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const st = StyleSheet.create({
  container_item: {
    width: screenWidth - 20,
    flexDirection: "row",
    marginBottom: 20,
    marginTop: 60,
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#d1e0e0",
    elevation: 3,
  },
  image_item: {
    width: 66,
    height: 66,
    borderRadius: 5,
  },
  content_item: {
    marginLeft: 15,
    width: Dimensions.get("window").width - 100 - 40,
    // justifyContent: "space-around"
  },
  textName_item: {
    fontWeight: "bold",
    fontSize: 17,
    marginBottom: 10,
    marginTop: 5,
  },
  textNumber_item: {
    fontWeight: "bold",
    fontSize: 17,
    color: "#53FDFF",
  },
  imageLogo_item: {
    width: 40,
    height: 40,
    marginLeft: 0,
    borderRadius: 100,
  },

  // add employee
  container_add: {
    flex: 1,
    height: screenHeight,
    // backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },

  btn_add: {
    // width: 50,
    // height: 50,
    marginTop: 50,
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderRadius: 5,
    fontWeight: "bold",
    backgroundColor: "#53FDFF",
  },
});

export default st;
