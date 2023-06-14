import { StyleSheet, Dimensions } from "react-native";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const st = StyleSheet.create({
  container_item: {
    width: screenWidth - 20,
    flexDirection: "row",
    marginVertical: 10,
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

  // activity add employee empty
  container_add: {
    flex: 1,
    height: screenHeight,
    // backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },

  btn_add: {
    marginTop: 50,
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderRadius: 5,
    fontWeight: "bold",
    backgroundColor: "#53FDFF",
  },

  //activity add emloyee have data
  container_content_add: {},
  title_field: {
    fontSize: 20,
    fontWeight: "500",
  },
  textInput: {
    width: screenWidth - 100,
    height: 50,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
  },
  img_bg: {
    height: 350,
    width: 350,
    justifyContent: "center",
    alignItems: "center",
  },
  btn_add2: {
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderRadius: 5,
    fontWeight: "bold",
    backgroundColor: "#53FDFF",
    zIndex: 1,
  },

  drop: {
    height: 30,
    backgroundColor: "red",
    zIndex: 1,
  },

  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "#ffffff",
    paddingTop: 12,
    paddingHorizontal: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    minHeight: 200,
    paddingBottom: 20,
  },
  center: {
    display: "flex",
    justifyContent: "center",
    // paddingHorizontal: 20,
  },
  barIcon: {
    width: 60,
    height: 5,
    backgroundColor: "black",
    borderRadius: 3,
  },
  textTitle: {
    color: "black",
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 25,
    marginBottom: 15,
  },
  textContent: {
    color: "grey",
    fontSize: 16,
    marginTop: 5,
  },
  btnContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 500,
  },
  btn_update: {
    marginTop: 10,
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderRadius: 5,
    fontWeight: "bold",
    backgroundColor: "#53FDFF",
  },
  btn_delete: {
    marginTop: 10,
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderRadius: 5,
    fontWeight: "bold",
    backgroundColor: "#53FDFF",
    color: "red",
  },

  button: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },

  toolbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#03DAC6",
    paddingHorizontal: 16,
    height: 56,
    width: "100%",
  },

  toolbar2: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },

  searchWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  textInput: {
    marginLeft: 8,
    flex: 1,
  },
});

export default st;
