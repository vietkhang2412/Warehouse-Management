import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import * as React from "react";
import st from "./style";
import env from "../../Env";

const ItemEmployee = (props) => {
  const { data } = props;

  return (
    <View style={st.container_item}>
      <TouchableOpacity>
        {data.anhNV != undefined ? (
          <Image
            source={{ uri: data.anhNV }}
            resizeMode={"cover"}
            style={st.image_item}
          />
        ) : (
          <Image
            source={require("../../assets/ImageE/User_scan_fill.png")}
            resizeMode={"cover"}
            style={st.image_item}
          />
        )}
      </TouchableOpacity>

      <View style={st.content_item}>
        <Text style={st.textName_item}>{data.tenNV}</Text>
        <Text style={st.textNumber_item}>{data.dienThoai}</Text>
      </View>
    </View>
  );
};
export default ItemEmployee;
