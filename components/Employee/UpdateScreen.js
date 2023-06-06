import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ImageBackground,
} from "react-native";
import st from "./style";
import React from "react";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import Dropdown from "../Dropdown";

const UpdateEmployee = (props) => {
  const { data } = props;
  //khai báo state
  const [selectedItem, setSelectedItem] = useState({
    id: "Nhân Viên",
    name: "Nhân Viên",
  });
  console.log(selectedItem.id);

  const data_NV = [
    { id: "Nhân Viên", name: "Nhân Viên" },
    { id: "Quản Lý", name: "Quản Lý" },
  ];

  const onSelect = (item) => {
    setSelectedItem(item);
  };

  return (
    <View style={st.container_add}>
      <ImageBackground
        source={require("../../assets/ImageE/logo1.png")}
        resizeMode="cover"
        style={st.img_bg}
      >
        <View style={st.container_content_add}>
          <View style={{ marginBottom: 20 }}>
            <Text style={st.title_field}>Tên Nhân Viên</Text>
            <TextInput
              style={st.textInput}
              multiline={true}
              placeholder="Nhập tên nhân viên"
              onChangeText={(txt) => {
                settitle(txt);
              }}
            />
          </View>

          <View style={{ marginBottom: 20 }}>
            <Text style={st.title_field}>Tài Khoản</Text>
            <TextInput
              style={st.textInput}
              multiline={true}
              placeholder="Nhập tài khoản"
              onChangeText={(txt) => {
                settitle(txt);
              }}
            />
          </View>

          <View style={{ marginBottom: 20 }}>
            <Text style={st.title_field}>Mật Khẩu</Text>
            <TextInput
              style={st.textInput}
              placeholder="Nhập mật khẩu"
              returnKeyType="go"
              secureTextEntry
              autoCorrect={false}
              // onChangeText={(txt) => {
              //   settitle(txt);
              // }}
            />
          </View>

          <View style={{ marginBottom: 20 }}>
            <Text style={st.title_field}>Số Điện Thoại</Text>
            <TextInput
              style={st.textInput}
              multiline={true}
              placeholder="Nhập số điện thoại"
              onChangeText={(txt) => {
                settitle(txt);
              }}
            />
          </View>
        </View>

        {/* <View style={st.containerDropdown}> */}
        <View style={{ marginBottom: 20 }}>
          <Text style={st.title_field}>Chức Vụ</Text>
          <Dropdown data={data_NV} onSelect={onSelect} value={selectedItem} />
        </View>

        <TouchableOpacity style={{ marginTop: 50 }}>
          <Text style={st.btn_add2}>CẬP NHÂT</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default UpdateEmployee;
