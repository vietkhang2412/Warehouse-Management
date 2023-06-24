import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  RefreshControl,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import env from "../../Env";
import styles from "./style";
import Toolbar from "../toolbar";
import { MaterialIcons } from "@expo/vector-icons";
import { Button } from "@rneui/themed";
import axios from 'axios';

// import { Toolbar, ToolbarBackAction, ToolbarContent, ToolbarAction } from 'react-native-paper';
//json-server --watch Products.json  -H 192.168.0.103

const List_Prod = (props) => {
  const [isLoading, setisLoading] = useState(true);
  const [listProd, setlistProd] = useState([]);
  const [isReloading, setisReloading] = useState(false);

  const getList = async () => {
    try {
      const response = await fetch(env.url_Prod);
      const json = await response.json();
      setlistProd(json);
    } catch (error) {
      console.error(error);
    } finally {
      setisLoading(false);
    }
  };

  const renderProd = ({ item }) => {
    const calculateTotal = (item) => {
      const parts = item.prod_price.split(".");

      const integerPart = parts[0];
      const decimalPart = parts[1] || "";

      return (
        integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".") +
        (decimalPart.length > 0 ? "." + decimalPart : "")
      );
    };

    return (
      <View style={{ width: "100%" }}>
        <View style={styles.item}>
          {item.image != "" ? (
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate("Update_Prod", { Data: item })
              }
            >
              <Image source={{ uri: item.image }} style={styles.img} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate("Update_Prod", { Data: item })
              }
            >
              <Image
                source={require("../../assets/imgProd/burger.png")}
                style={styles.img}
              />
            </TouchableOpacity>
          )}

          <View style={{ width: 180 }}>
            <Text style={styles.item_name}>{item.prod_name} </Text>
            <Text style={styles.item_code}>{item.prod_code} </Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.item_code}>Tồn kho: {item.prod_qty}</Text>
            <Text style={{ fontSize: 18, color: "red", fontWeight: "500" }}>
              {calculateTotal(item)} đ
            </Text>
          </View>
        </View>
        <View
          style={{
            height: 1,
            width: "100%",
            backgroundColor: "gray",
            marginTop: -10,
          }}
        ></View>
      </View>
    );
  };

  // xử lý hiển thị dữ liệu
  const getData = async () => {
    let url_api = 'https://6469a718183682d61443f974.mockapi.io/hoadon';
    try {
      const response = await fetch(url_api);  // lấy dữ liệu về
      const jsonHD = await response.json(); // chuyển dữ liệu thành đối tượng json
      for (let j = 0; j < jsonHD.length; j++) {
        const keys = Object.keys(jsonHD[j].quantity);
        const values = Object.values(jsonHD[j].quantity);
        for (let i = 0; i < keys.length; i++) {

          const response = await fetch(env.url_prod_del + keys[i]);
          const jsonSP = await response.json();

          let obj_prod = {
            prod_code: jsonSP.prod_code,
            prod_name: jsonSP.prod_name,
            prod_costprice: jsonSP.prod_costprice,
            prod_price: jsonSP.prod_price,
            prod_qty: jsonHD[j].loaiHoaDon == 'Nhập' ? (Number(jsonSP.prod_qty) + Number(values[i])) : (Number(jsonSP.prod_qty) - Number(values[i])),
            image: jsonSP.image,
          };

          let url_api = env.url_prod_del + keys[i];

          fetch(url_api, {
            method: "PUT",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(obj_prod),
          })
            .catch((ex) => {

          });
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      // kết thúc quá trình thực hiện trong try, dù xảy ra lỗi hay không cũng gọi vào đây
      // đổi trạng thái isLoading là false
    }
  }


  // Gọi hàm để lấy dữ liệu và cập nhật số lượng
  const fetchData = async () => {
    try {
      await getData(); // Lấy dữ liệu
      await getList(); // Cập nhật số lượng sản phẩm
    } catch (error) {
      console.error(error);
    } finally {
      // Kết thúc quá trình thực hiện, thực hiện các công việc khác
    }
  };


  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      // khi màn hình được hiển thị sẽ gọi vào hàm này
      // gọi hàm load dữ liệu
      fetchData();
    });

    return unsubscribe;
  }, [props.navigation]);

  const reloadData = React.useCallback(() => {
    //Đánh dấu trạng thái đang reload
    setisReloading(true);
    //công việc xủ lý load lại dữ liệu
    setTimeout(() => {
      getList();
      setisReloading(false);
    }, 1500);
  });

  // const allQty = ({item}) => {
  //     let qty = 0;
  //     for (let i = 0; i < listProd.length; i++) {
  //         qty += item.prod_qty;
  //     }
  //     console.log(item.prod_qty);
  //     return qty;
  // }

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <View style={styles.toolbar}>
        <Text style={{ color: "white", fontSize: 17, fontWeight: "bold" }}>
          SẢN PHẨM
        </Text>
        {/* <Toolbar /> */}
        <MaterialIcons name="search" size={24} color={"#FFF"} />
      </View>

      {listProd.length != 0 ? (
        <View style={{ alignItems: "center", width: "100%" }}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("Add_Prod");
            }}
            style={styles.btn_list_add}
          >
            <Text style={{ fontWeight: "bold" }}>+ Thêm sản phẩm</Text>
          </TouchableOpacity>
          <View style={{ flexDirection: "row", marginTop: -15 }}>
            <View
              style={{
                backgroundColor: "#DDDDDD",
                width: 170,
                height: 70,
                borderRadius: 10,
                alignItems: "center",
              }}
            >
              <Text style={styles.title}>* Số lượng</Text>
              <Text style={{ color: "green", fontSize: 18 }}>55</Text>
            </View>
            <View
              style={{
                marginLeft: 15,
                backgroundColor: "#DDDDDD",
                width: 200,
                height: 70,
                borderRadius: 10,
                alignItems: "center",
              }}
            >
              <Text style={styles.title}>$ Giá trị tồn</Text>
              <Text style={{ color: "green", fontSize: 18 }}>1.000.000 đ</Text>
            </View>
          </View>
          <View
            style={{
              marginTop: 5,
              height: 10,
              width: "100%",
              backgroundColor: "#DDDDDD",
            }}
          ></View>
        </View>
      ) : (
        <View style={{ alignItems: "center", width: "100%" }}>
          <Image
            source={require("../../assets/imgProd/logo.png")}
            style={{ marginTop: 200, marginBottom: 30 }}
          />
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("Add_Prod");
            }}
            style={styles.btn_add}
          >
            <Text style={{ fontWeight: "bold" }}>Thêm sản phẩm</Text>
          </TouchableOpacity>
        </View>
      )}

      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={isReloading} onRefresh={reloadData} />
          }
        >
          <View>
            <ScrollView horizontal={true} style={{ width: '100%' }}>
              {isLoading ? (
                <ActivityIndicator />
              ) : (
                <FlatList
                  data={listProd}
                  keyExtractor={(item) => {
                    return item.id;
                  }}
                  renderItem={renderProd}
                />
              )}
            </ScrollView>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default List_Prod;
