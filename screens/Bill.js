import {
  View, Text, Image, StyleSheet, TouchableOpacity,
  Dimensions, SafeAreaView, StatusBar, ActivityIndicator, FlatList, RefreshControl, Button
} from 'react-native'
import React, { useEffect, useState } from 'react';
import Toolbar from '../components/toolbar';
import ModalAddHD from '../modal/Modal_AddHD';
import { MaterialIcons } from '@expo/vector-icons';
import DetailHD from '../components/Bill/DetailHD';


export default function Bill(props) {

  const [showModalDialog, setShowModalDialog] = useState(false);

  useEffect(() => {
    // Gọi hàm getData() khi showModalDialog thay đổi
    if (!showModalDialog) {
      getData();
    }
  }, [showModalDialog]);

  const openModal = () => {
    setShowModalDialog(true);
  };

  const openDetail = (item) => {
    props.navigation.navigate("Detail", { item: item });
  };

  const [buttonWidth, setButtonWidth] = useState(0);
  const [buttonHeight, setButtonHeight] = useState(0);

  useEffect(() => {
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;

    const desiredWidth = screenWidth * 0.5056;
    const desiredHeight = screenHeight * 0.039;

    setButtonWidth(desiredWidth);
    setButtonHeight(desiredHeight);
  }, []);

  const [isLoading, setisLoading] = useState(true);
  const [data, setData] = useState([]); // chứa sản phẩm
  // xử lý hiển thị dữ liệu
  const getData = async () => {
    let url_api = 'https://6469a718183682d61443f974.mockapi.io/hoadon';
    try {
      const response = await fetch(url_api);  // lấy dữ liệu về
      const jsonHD = await response.json(); // chuyển dữ liệu thành đối tượng json
      setData(jsonHD);
    } catch (error) {
      console.error(error);
    } finally {
      // kết thúc quá trình thực hiện trong try, dù xảy ra lỗi hay không cũng gọi vào đây
      // đổi trạng thái isLoading là false
      setisLoading(false);
    }
  }

  const renderData = ({ item }) => {

    const calculateTotal = (item) => {
      const totalMoney = [];

      for (let i = 0; i < item.dsSanPham.length; i++) {
        if (item.quantity[item.dsSanPham[i].id] !== undefined) {
          totalMoney.push(item.dsSanPham[i].prod_price * item.quantity[item.dsSanPham[i].id]);
        } else {
          totalMoney.push(item.dsSanPham[i].prod_price);
        }
      }

      let totalPay = totalMoney.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

      const totalString = totalPay + "";

      const parts = totalString.split(".");

      const integerPart = parts[0];
      const decimalPart = parts[1] || "";

      return integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + (decimalPart.length > 0 ? "." + decimalPart : "");
    };

    return (
      <TouchableOpacity style={{
        borderWidth: 1.5,
        marginHorizontal: 20,
        marginTop: 20,
        height: 125,
        borderRadius: 15,
        borderColor: 'rgba(0, 0, 0, 0.3)',
        paddingVertical: 10,
        paddingHorizontal: 20
      }}
        onPress={() => openDetail(item)}
      >
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>DH {item.loaiHoaDon} - {item.date}</Text>
        <Text>{item.maHoaDon}</Text>
        <Text>{item.maNhanVien} - Đào Duy Lâm</Text>
        <Text style={{ alignSelf: 'flex-end', marginTop: 5, fontSize: 20, fontWeight: 'bold' }}>{calculateTotal(item)} đ</Text>
      </TouchableOpacity>
    )
  }

  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      // khi màn hình được hiển thị sẽ gọi vào hàm này
      // gọi hàm load dữ liệu
      getData();
    });

    return unsubscribe;
  }, [props.navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.toolbarContainer}>
        <Text style={{ color: 'white', fontSize: 17, fontWeight: 'bold' }}>HÓA ĐƠN</Text>
        <Toolbar />
      </View>
      {(data.length == 0
      ) ? (<View style={styles.screenContainer}>
        <Image source={require('../assets/images/assassin.jpg')} />
        <TouchableOpacity style={{
          width: buttonWidth,
          height: buttonHeight,
          backgroundColor: '#53FDFF',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 8
        }} onPress={openModal} >
          <Text style={{ fontSize: 14, fontWeight: 'bold' }}>TẠO HÓA ĐƠN</Text>
        </TouchableOpacity>
        <StatusBar style='auto' />
      </View>

      ) : (<View style={{ flex: 1 }}>
        {
          (isLoading) ? (
            <ActivityIndicator />
          ) : (
            <FlatList
              data={data}
              keyExtractor={(item) => { return item.id }}
              renderItem={renderData}
              style={{ marginBottom: 100 }}
            />
          )
        }
        <TouchableOpacity style={styles.btnAdd} onPress={openModal}>
          <View style={styles.add}>
            <MaterialIcons name='add' size={24} color={'black'} style={{ marginRight: 10 }} />
            <Text style={{ fontWeight: 'bold', marginRight: 10 }}>THÊM HÓA ĐƠN</Text>
          </View>
        </TouchableOpacity>
      </View>)}
      <ModalAddHD showModalDialog={showModalDialog} setShowModalDialog={setShowModalDialog} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screenContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  toolbarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#03DAC6',
    paddingHorizontal: 16,
    height: 56,
    width: '100%',
  },
  add: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 185,
    height: 48,
    borderRadius: 50,
    justifyContent: 'center'
  },
  btnAdd: {
    position: 'absolute',
    width: 185,
    height: 48,
    alignSelf: 'flex-end',
    borderRadius: 50,
    backgroundColor: '#53FDFF',
    bottom: 70,
    right: 10
  }
})