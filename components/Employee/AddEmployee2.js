import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  ScrollView,
} from "react-native";
import st from "./style";
import React from "react";
import { useState } from "react";
import Dropdown from "../Dropdown";
import env from "../../Env";

const AddEmployee2 = (props) => {
  //khai báo state
  const [selectedItem, setSelectedItem] = useState({
    id: 1,
    name: "Nhân Viên",
  });
  const [maNV, setMaNV] = useState("");
  const [tenNV, setTenNV] = useState("");
  const [dienThoai, setDienthoai] = useState("");
  const [taiKhoan, setTaiKhoan] = useState("");
  const [matKhau, setMatKhau] = useState("");
  // const [chucVu, setChucVu] = useState("");

  const data_NV = [
    { id: 1, name: "Nhân Viên" },
    { id: 2, name: "Quản Lý" },
  ];

  const onSelect = (item) => {
    setSelectedItem(item);
  };

  const addE = () => {
    let objE = {
      maNV: maNV,
      tenNV: tenNV,
      taiKhoan: taiKhoan,
      matKhau: matKhau,
      dienThoai: dienThoai,
      chucVu: selectedItem.name,
    };

    fetch(env.url_Employ, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objE),
    })
      .then((res) => {
        console.log(res);
        if (res.status == 201) {
          alert("Thêm thành công");
          props.navigation.goBack();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <ScrollView>
      <View style={st.container_add}>
        <ImageBackground
          source={require("../../assets/ImageE/logo1.png")}
          resizeMode="cover"
          style={st.img_bg}
        >
          <View style={st.container_content_add}>
            <View style={{ marginBottom: 20 }}>
              <Text style={st.title_field}>Mã Nhân Viên</Text>
              <TextInput
                style={st.textInput}
                multiline={true}
                placeholder="Nhập mã nhân viên"
                onChangeText={(txt) => {
                  setMaNV(txt);
                }}
              />
            </View>

            <View style={{ marginBottom: 20 }}>
              <Text style={st.title_field}>Tên Nhân Viên</Text>
              <TextInput
                style={st.textInput}
                multiline={true}
                placeholder="Nhập tên nhân viên"
                onChangeText={(txt) => {
                  setTenNV(txt);
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
                  setTaiKhoan(txt);
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
                onChangeText={(txt) => {
                  setMatKhau(txt);
                }}
              />
            </View>

            <View style={{ marginBottom: 20 }}>
              <Text style={st.title_field}>Số Điện Thoại</Text>
              <TextInput
                style={st.textInput}
                multiline={true}
                placeholder="Nhập số điện thoại"
                onChangeText={(txt) => {
                  setDienthoai(txt);
                }}
              />
            </View>
          </View>

          <View style={{ marginBottom: 20 }}>
            <Text style={st.title_field}>Chức Vụ</Text>
            <Dropdown data={data_NV} onSelect={onSelect} value={selectedItem} />
          </View>

          <TouchableOpacity onPress={addE} style={{ marginTop: 40 }}>
            <Text style={st.btn_add2}>XÁC NHẬN</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    </ScrollView>
  );
};

export default AddEmployee2;
