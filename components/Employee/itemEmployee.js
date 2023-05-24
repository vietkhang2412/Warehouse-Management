import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import st from "./style";

const ItemEmployee = (props) => {
  // const { data } = props;
  // const { objUser } = props;
  // console.log(objUser.id);
  const goDetailEmployee = () => {
    props.nav.navigate("AddEmployee", { item: props });
  };

  const goUpdateEmployee = () => {
    props.nav.navigate("UpdateEmployee", { item: props });
  };

  // const deleteNews = () => {
  //   let url_api_delete = "http://192.168.1.9:3000/news/" + props.data.id;
  //   Alert.alert("Thông Báo!", "Bạn có chắc muốn xóa?", [
  //     {
  //       text: "OK",
  //       onPress: () => {
  //         fetch(url_api_delete, {
  //           method: "DELETE",
  //           headers: {
  //             Accept: "application/json",
  //             "Content-Type": "application/json",
  //           },
  //         })
  //           .then((res) => {
  //             if (res.status == 200) {
  //               alert("Xóa thành công!");
  //             }
  //           })
  //           .catch((ex) => {
  //             console.log(ex);
  //           });
  //       },
  //     },
  //     { text: "Cancel", onPress: () => {} },
  //   ]);
  // };

  return (
    <View style={st.container_item}>
      <TouchableOpacity>
        <Image
          source={require("./assets/ImageE/User_scan_fill.png")}
          resizeMode={"cover"}
          style={st.image_item}
        />
      </TouchableOpacity>

      <View style={st.content_item}>
        <Text style={st.textName}>Đinh Viết Khang</Text>
        <Text style={st.textNumber}>0338269641</Text>
      </View>
    </View>
  );
};
export default ItemEmployee;
