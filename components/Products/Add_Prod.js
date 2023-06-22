import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  Image,
} from "react-native";
import React, { useState } from "react";
import styles from "./style";
import env from "../../Env";
import { MaterialIcons } from "@expo/vector-icons";

import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

//npm install @rneui/themed @rneui/base

const Add_Prod = (props) => {
  const [prod_code, setprod_code] = useState("");
  const [prod_name, setprod_name] = useState("");
  const [prod_costprice, setprod_costprice] = useState("");
  const [prod_price, setprod_price] = useState("");
  const [prod_qty, setprod_qty] = useState(1);
  const [image, setimage] = useState("");


  const pickImage = async () => {
    // Đọc ảnh từ thư viện thì không cần khai báo quyền
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3], // khung view cắt ảnh 
      quality: 1,
    });

    // console.log(result);

    if (!result.canceled) {
      // setimg_source(result.assets[0].uri);
      // chuyển ảnh thành base64 để upload lên json
      let _uri = result.assets[0].uri;  // địa chỉ file ảnh đã chọn
      let file_ext = _uri.substring(_uri.lastIndexOf('.') + 1); // lấy đuôi file
      FileSystem.readAsStringAsync(_uri, { encoding: 'base64' })
        .then((res) => {
          // phải nối chuỗi với tiền tố data image
          setimage("data:image/" + file_ext + ";base64," + res);
          // console.log(img_base64);
          // upload ảnh lên api thì dùng PUT có thể viết ở đây
        });
    }
  }

  const takePhoto = async () => {
    // Đọc ảnh từ thư viện thì không cần khai báo quyền
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3], // khung view cắt ảnh 
      quality: 1,
    });

    // console.log(result);

    if (!result.canceled) {
      // setimg_source(result.assets[0].uri);
      // chuyển ảnh thành base64 để upload lên json
      let _uri = result.assets[0].uri;  // địa chỉ file ảnh đã chọn
      let file_ext = _uri.substring(_uri.lastIndexOf('.') + 1); // lấy đuôi file
      FileSystem.readAsStringAsync(_uri, { encoding: 'base64' })
        .then((res) => {
          // phải nối chuỗi với tiền tố data image
          setimage("data:image/" + file_ext + ";base64," + res);
          // console.log(img_base64);
          // upload ảnh lên api thì dùng PUT có thể viết ở đây
        });
    }
  }


  const Save_Prod = () => {
    let obj_prod = {
      prod_code: prod_code,
      prod_name: prod_name,
      prod_costprice: prod_costprice,
      prod_price: prod_price,
      prod_qty: prod_qty,
      image: image,
    };

    if (prod_name.length == 0) {
      alert("Chưa nhập mã sản phẩm!");
      return;
    }
    if (prod_name.length == 0) {
      alert("Chưa nhập tên sản phẩm!");
      return;
    }
    if (prod_costprice.length == 0) {
      alert("Chưa nhập giá vốn sản phẩm!");
      return;
    }
    if (prod_price.length == 0) {
      alert("Chưa nhập giá bán sản phẩm!");
      return;
    }

    if (prod_qty.length == 0) {
      alert("Chưa nhập số lượng sản phẩm!");
      return;
    }

    if (prod_qty == 0) {
      alert("Số lượng sản phẩm tối thiểu là 1!");
      return;
    }

    fetch(env.url_Prod, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj_prod),
    })
      .then((res) => {
        if (res.status == 201) {
          alert("Thêm sản phẩm thành công!");
          props.navigation.goBack();
        }
      })
      .catch((ex) => {
        alert("Lỗi thêm sản phẩm ~");
      });
  };

  const up = () => {
    setprod_qty(Number(prod_qty) + 1);
  };

  const down = () => {
    if (prod_qty > 1) {
      setprod_qty(Number(prod_qty) - 1);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.toolbar}>
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={24} color={"#FFF"} />
        </TouchableOpacity>
        <Text
          style={{
            color: "white",
            fontSize: 17,
            fontWeight: "bold",
            marginRight: 120,
          }}
        >
          THÊM SẢN PHẨM
        </Text>
      </View>
      <View style={styles.add_img}>
        <View style={{ flexDirection: 'column' }}>
          <TouchableOpacity onPress={pickImage} style={styles.btn_add_img}>
            <Text style={styles.text_add_img} >
              <Image source={require("../../assets/imgProd/Vector.png")} /> Tải
              ảnh lên
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={takePhoto} style={styles.btn_add_img}>
            <Text style={styles.text_add_img}>
              <Image source={require("../../assets/imgProd/camera.png")} /> Chụp
              ảnh
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          {image != null ? <Image source={{ uri: image }} style={styles.img_box} /> : null}
        </View>
      </View>
      <Text style={styles.title}>
        Mã sản phẩm<Text style={styles.red}> *</Text>
      </Text>
      <TextInput
        style={styles.formCtrl}
        onChangeText={(txt) => {
          setprod_code(txt);
        }}
        placeholder="Ví dụ : B0001"
      />
      <Text style={styles.title}>
        Tên sản phẩm<Text style={styles.red}> *</Text>
      </Text>
      <TextInput
        style={styles.formCtrl}
        onChangeText={(txt) => {
          setprod_name(txt);
        }}
        placeholder="Ví dụ : Bột mì số 11"
      />
      <Text style={styles.title}>
        Giá vốn<Text style={styles.red}> *</Text>
      </Text>
      <TextInput
        style={styles.formCtrl}
        onChangeText={(txt) => {
          setprod_costprice(txt);
        }}
        placeholder="0.000"
      />
      <Text style={styles.title}>
        Giá bán<Text style={styles.red}> *</Text>
      </Text>
      <TextInput
        style={styles.formCtrl}
        onChangeText={(txt) => {
          setprod_price(txt);
        }}
        placeholder="0.000"
      />
      <Text style={styles.title}>Số lượng</Text>
      {/* <TextInput style={styles.formCtrl} onChangeText={(txt) => { setprod_qty(txt) }} placeholder='Ví dụ : 10' /> */}
      <View style={styles.quantity}>
        <TouchableOpacity style={styles.upAndDown} onPress={down}>
          <MaterialIcons name="remove" size={15} color={"black"} />
        </TouchableOpacity>
        <View
          style={{
            width: 30,
            borderLeftWidth: 1,
            borderRightWidth: 1,
            borderColor: "lightgray",
          }}
        >
          <TextInput
            placeholder="0"
            textAlign="center"
            value={String(prod_qty)}
            keyboardType="numeric"
            onChangeText={(text) => {
              setprod_qty(text);
            }}
          />
        </View>
        <TouchableOpacity style={styles.upAndDown} onPress={up}>
          <MaterialIcons name="add" size={15} color={"black"} />
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity onPress={Save_Prod} style={styles.btn_save}>
          <Text style={{ fontWeight: "bold" }}>Xác nhận</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Add_Prod;
