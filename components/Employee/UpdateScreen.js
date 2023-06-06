import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ImageBackground,
} from "react-native";
import React from "react";
import { useState } from "react";
import Dropdown from "../Dropdown";
import env from "../../Env";
import st from "./style";

const UpdateEmployee = (props) => {
  //khai báo state
  const [maNV, setMaNV] = useState(props.route.params.item.maNV);
  const [tenNV, setTenNV] = useState(props.route.params.item.tenNV);
  const [dienThoai, setDienthoai] = useState(props.route.params.item.dienThoai);
  const [taiKhoan, setTaiKhoan] = useState(props.route.params.item.taiKhoan);
  const [matKhau, setMatKhau] = useState(props.route.params.item.matKhau);

  const [selectedItem, setSelectedItem] = useState({
    id: 1,
    name: props.route.params.item.chucVu,
  });

  console.log(props.route.params.item.maNV);

  const data_NV = [
    { id: 1, name: "Nhân Viên" },
    { id: 2, name: "Quản Lý" },
  ];

  const onSelect = (item) => {
    setSelectedItem(item);
  };

  const updateE = () => {
    let objE = {
      maNV: maNV,
      tenNV: tenNV,
      taiKhoan: taiKhoan,
      dienThoai: dienThoai,
      chucVu: selectedItem.name,
      matKhau: matKhau,
    };

    // console.log(objE);

    fetch(env.url_Employ_del + props.route.params.item.id, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objE),
    })
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          alert("Sửa thành công");
          props.navigation.goBack();
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
            <Text style={st.title_field}>Mã Nhân Viên</Text>
            <TextInput
              style={st.textInput}
              multiline={true}
              placeholder="Nhập tên nhân viên"
              onChangeText={(txt) => {
                setMaNV(txt);
              }}
              value={maNV}
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
              value={tenNV}
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
              value={taiKhoan}
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
              value={dienThoai}
            />
          </View>
        </View>

        {/* <View style={st.containerDropdown}> */}
        <View style={{ marginBottom: 20 }}>
          <Text style={st.title_field}>Chức Vụ</Text>
          <Dropdown data={data_NV} onSelect={onSelect} value={selectedItem} />
        </View>

        <TouchableOpacity onPress={updateE} style={{ marginTop: 50 }}>
          <Text style={st.btn_add2}>CẬP NHÂT</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default UpdateEmployee;
