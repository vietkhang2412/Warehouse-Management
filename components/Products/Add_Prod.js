import { View, Text, TextInput, TouchableHighlight, Button, Image } from 'react-native'
import React, { useState } from 'react'
import styles from './style'
import env from './Env'

//npm install @rneui/themed @rneui/base

const Add_Prod = (props) => {
  const [prod_code, setprod_code] = useState('');
  const [prod_name, setprod_name] = useState('');
  const [prod_costprice, setprod_costprice] = useState('');
  const [prod_price, setprod_price] = useState('');
  const [prod_qty, setprod_qty] = useState('');
  const [image, setimage] = useState('');



  const Save_Prod = () => {
    let obj_prod = { prod_code: prod_code, prod_name: prod_name, prod_costprice: prod_costprice, prod_price: prod_price, prod_qty: prod_qty, image: image }


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


    fetch(env.url_Prod, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj_prod),
    })
      .then((res) => {
        if (res.status == 201) {
          alert('Thêm sản phẩm thành công!');
          props.navigation.navigate('List_Prod')
        }

      })
      .catch((ex) => {
        alert('Lỗi thêm sản phẩm ~');
      });
  }


  const clearState = () => {
    setprod_name(null);
    setprod_price(null);
    setprod_costprice(null);
    setimage(null);
  }

  return (
    <View style={{ flex: 1, marginTop: 40, backgroundColor: 'white' }}>
      <View style={styles.add_img}>
        <TouchableHighlight style={styles.btn_add_img}><Text style={styles.text_add_img}><Image source={require('../../assets/imgProd/Vector.png')} />  Tải ảnh lên</Text></TouchableHighlight>
        <TouchableHighlight style={styles.btn_add_img}><Text style={styles.text_add_img}><Image source={require('../../assets/imgProd/camera.png')} />  Chụp ảnh</Text></TouchableHighlight>
      </View>
      <Text style={styles.title}>Mã sản phẩm<Text style={styles.red}> *</Text></Text>
      <TextInput style={styles.formCtrl} onChangeText={(txt) => { setprod_code(txt) }} placeholder='Ví dụ : B0001'/>
      <Text style={styles.title}>Tên sản phẩm<Text style={styles.red}> *</Text></Text>
      <TextInput style={styles.formCtrl} onChangeText={(txt) => { setprod_name(txt) }} placeholder='Ví dụ : Bột mì số 11'/>
      <Text style={styles.title}>Giá vốn<Text style={styles.red}> *</Text></Text>
      <TextInput style={styles.formCtrl} onChangeText={(txt) => { setprod_costprice(txt) }} placeholder='0.000'/>
      <Text style={styles.title}>Giá bán<Text style={styles.red}> *</Text></Text>
      <TextInput style={styles.formCtrl} onChangeText={(txt) => { setprod_price(txt) }} placeholder='0.000'/>
      <Text style={styles.title}>Số lượng</Text>
      <TextInput style={styles.formCtrl} onChangeText={(txt) => { setprod_qty(txt) }} placeholder='Ví dụ : 10'/>
      <View style={{ alignItems: 'center' }}>
        <TouchableHighlight onPress={Save_Prod} style={styles.btn_save}><Text style={{ fontWeight: 'bold' }}>Xác nhận</Text></TouchableHighlight>
      </View>
    </View>

  )
}

export default Add_Prod