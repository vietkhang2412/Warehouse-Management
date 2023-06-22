import {
  View,
  Text,
  TextInput,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import styles from "./style";
import { MaterialIcons } from "@expo/vector-icons";
import env from "../../Env";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

const Update_Prod = (props) => {
  const [prod_code, setprod_code] = useState(props.route.params.Data.prod_code);
  const [prod_name, setprod_name] = useState(props.route.params.Data.prod_name);
  const [prod_costprice, setprod_costprice] = useState(
    props.route.params.Data.prod_costprice
  );
  const [prod_price, setprod_price] = useState(
    props.route.params.Data.prod_price
  );
  const [prod_qty, setprod_qty] = useState(props.route.params.Data.prod_qty);
  const [image, setimage] = useState(props.route.params.Data.image);


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


  const UpdateProd = () => {
    let _id = props.route.params.Data.id;

    let obj_prod = {
      prod_code: prod_code,
      prod_name: prod_name,
      prod_costprice: prod_costprice,
      prod_price: prod_price,
      prod_qty: prod_qty,
      image: image,
    };

    let url_api = env.url_prod_del + _id;

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

    fetch(url_api, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj_prod),
    })
      .then((res) => {
        if (res.status == 200) {
          alert("Sửa sản phẩm thành công!");
          props.navigation.goBack();
        }
      })
      .catch((ex) => {
        alert("Lỗi sửa sản phẩm ~");
      });
  };

  const delProd = () => {
    let url_api_del = env.url_prod_del + props.route.params.Data.id;
    // console.log(item.id);

    fetch(url_api_del, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status == 200) {
          alert("Đã xóa sản phẩm!");
          props.navigation.goBack();
        } else {
          alert("111");
        }
      })
      .catch((ex) => {
        alert("Lỗi xóa sản phẩm ~");
      });
  };

  const showAlert = () => {
    Alert.alert(
      "Xóa sản phẩm!",
      "Bạn chắc chắc muốn xóa sản phẩm?",
      [
        //mảng đối tượng
        {
          text: "Yes",
          onPress: () => {
            delProd();
          },
          style: "default",
        },
        {
          text: "No",
          style: "cancel",
        },
      ],
      {
        cancelable: true,
        onDismiss: () => {
          //được gọi khi ng dùng ấn nút back trên đt
          console.log("Dialog bị tắt k theo nút bấm");
        },
      }
    );
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
          SỬA SẢN PHẨM
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
        value={prod_code}
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
        value={prod_name}
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
        value={prod_costprice}
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
        value={prod_price}
      />
      <Text style={styles.title}>Số lượng</Text>
      {/* <TextInput style={styles.formCtrl} onChangeText={(txt) => { setprod_qty(txt) }} placeholder='Ví dụ : 10' value={prod_qty} /> */}
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
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={showAlert} style={styles.btn_del}>
          <Text style={{ fontWeight: "bold", color: "red" }}>Xóa</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={UpdateProd} style={styles.btn_save}>
          <Text style={{ fontWeight: "bold" }}>Cập nhật</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Update_Prod;
