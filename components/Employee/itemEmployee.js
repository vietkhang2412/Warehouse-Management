import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import * as React from "react";
import st from "./style";

const ItemEmployee = (props) => {
  const { data } = props;
  // const { objUser } = props;
  // console.log(objUser.id);
  const goDetailEmployee = () => {
    props.nav.navigate("AddEmployee", { item: props });
  };

  const goUpdateEmployee = () => {
    props.nav.navigate("UpdateEmployee", { item: props });
  };

  const deleteEmployee = () => {
    let url_api_delete = "http://192.168.1.7:3000/employee/" + props.data.maNV;
    Alert.alert("Thông Báo!", "Bạn có chắc muốn xóa?", [
      {
        text: "OK",
        onPress: () => {
          fetch(url_api_delete, {
            method: "DELETE",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          })
            .then((res) => {
              if (res.status == 200) {
                alert("Xóa thành công!");
              }
            })
            .catch((ex) => {
              console.log(ex);
            });
        },
      },
      { text: "Cancel", onPress: () => {} },
    ]);
  };

  return (
    <View style={st.container_item}>
      <TouchableOpacity>
        <Image
          source={{ uri: data.anhNV }}
          resizeMode={"cover"}
          style={st.image_item}
        />
      </TouchableOpacity>

      <View style={st.content_item}>
        <Text style={st.textName_item}>{data.tenNV}</Text>
        <Text style={st.textNumber_item}>{data.dienThoai}</Text>
      </View>
    </View>
  );
};
export default ItemEmployee;
