import { View, Text, TextInput,Image,Alert, TouchableHighlight } from 'react-native'
import React, { useState } from 'react'
import styles from './style'

import env from './Env'


const Update_Prod = (props) => {

  const [prod_code, setprod_code] = useState(props.route.params.Data.prod_code);
  const [prod_name, setprod_name] = useState(props.route.params.Data.prod_name);
  const [prod_costprice, setprod_costprice] = useState(props.route.params.Data.prod_costprice);
  const [prod_price, setprod_price] = useState(props.route.params.Data.prod_price);
  const [prod_qty, setprod_qty] = useState(props.route.params.Data.prod_qty);
  const [image, setimage] = useState(props.route.params.Data.image);

  console.log(props.route.params.Data.prod_price);

  const UpdateProd = () => {
    let _id = props.route.params.Data.id;

    let obj_prod = { prod_code: prod_code, prod_name: prod_name, prod_costprice: prod_costprice, prod_price: prod_price, prod_qty: prod_qty, image: image }

    let url_api = env.url_prod_del + _id;


    if (prod_name.length == 0) {
      alert("Chưa nhập mã sản phẩm!"); return;
    }
    if (prod_name.length == 0) {
      alert("Chưa nhập tên sản phẩm!"); return;
    }
    if (prod_costprice.length == 0) {
      alert("Chưa nhập giá vốn sản phẩm!"); return;
    }
    if (prod_price.length == 0) {
      alert("Chưa nhập giá bán sản phẩm!"); return;
    }

    fetch(url_api, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj_prod),
    })
      .then((res) => {
        if (res.status == 200) {
          alert('Sửa sản phẩm thành công!');
          props.navigation.navigate('List_Prod')
        }
      })
      .catch((ex) => {
        alert('Lỗi sửa sản phẩm ~');
      });
  }

  const delProd = () => {
    let url_api_del = env.url_prod_del + props.route.params.Data.id;
    // console.log(item.id);

    fetch(url_api_del, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then((res) => {
        if (res.status == 200) {
          alert("Đã xóa sản phẩm!");
          props.navigation.navigate('List_Prod')
        } else {
          alert("111")
        }

      })
      .catch((ex) => {
        alert("Lỗi xóa sản phẩm ~")
      });
  }

  const showAlert = () => {
    Alert.alert("Xóa sản phẩm!", "Bạn chắc chắc muốn xóa sản phẩm?",
      [
        //mảng đối tượng
        {
          text: 'Yes',
          onPress: () => { delProd() },
          style: 'default'
        },
        {
          text: 'No',
          style: 'cancel'
        },
      ],
      {
        cancelable: true,
        onDismiss: () => { //được gọi khi ng dùng ấn nút back trên đt  
          console.log("Dialog bị tắt k theo nút bấm");
        }
      }
    );
  }




  return (
    <View style={{ flex: 1, marginTop: 40, backgroundColor: 'white' }}>
      <View style={styles.add_img}>
        <TouchableHighlight style={styles.btn_add_img}><Text style={styles.text_add_img}><Image source={require('../../assets/imgProd/Vector.png')} />  Tải ảnh lên</Text></TouchableHighlight>
        <TouchableHighlight style={styles.btn_add_img}><Text style={styles.text_add_img}><Image source={require('../../assets/imgProd/camera.png')} />  Chụp ảnh</Text></TouchableHighlight>
      </View>
      <Text style={styles.title}>Mã sản phẩm<Text style={styles.red}> *</Text></Text>
      <TextInput style={styles.formCtrl} onChangeText={(txt) => { setprod_code(txt) }} placeholder='Ví dụ : B0001' value={prod_code} />
      <Text style={styles.title}>Tên sản phẩm<Text style={styles.red}> *</Text></Text>
      <TextInput style={styles.formCtrl} onChangeText={(txt) => { setprod_name(txt) }} placeholder='Ví dụ : Bột mì số 11' value={prod_name} />
      <Text style={styles.title}>Giá vốn<Text style={styles.red}> *</Text></Text>
      <TextInput style={styles.formCtrl} onChangeText={(txt) => { setprod_costprice(txt) }} placeholder='0.000' value={prod_costprice}/>
      <Text style={styles.title}>Giá bán<Text style={styles.red}> *</Text></Text>
      <TextInput style={styles.formCtrl} onChangeText={(txt) => { setprod_price(txt) }} placeholder='0.000' value={prod_price} />
      <Text style={styles.title}>Số lượng</Text>
      <TextInput style={styles.formCtrl} onChangeText={(txt) => { setprod_qty(txt) }} placeholder='Ví dụ : 10' value={prod_qty} />
      <View style={{ flexDirection: 'row'}}>
        <TouchableHighlight onPress={showAlert} style={styles.btn_del}><Text style={{ fontWeight: 'bold',color:'red' }}>Xóa</Text></TouchableHighlight>
        <TouchableHighlight onPress={UpdateProd} style={styles.btn_save}><Text style={{ fontWeight: 'bold' }}>Cập nhật</Text></TouchableHighlight>
      </View>
    </View>
  )
}

export default Update_Prod