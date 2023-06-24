import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions , Alert} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const DetailHD = ({ route, navigation }) => {

    var data = route.params.item;

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

    const backBill = () => {
        navigation.navigate("HÓA ĐƠN");
    }

    const screenWidth = Dimensions.get('window').width;
    const blockWidth = Dimensions.get('window').width / 1.6;

    const calculateTotal = (data) => {
        const totalMoney = [];

        for (let i = 0; i < data.dsSanPham.length; i++) {
            if (data.quantity[data.dsSanPham[i].id] !== undefined) {
                totalMoney.push(data.dsSanPham[i].prod_price * data.quantity[data.dsSanPham[i].id]);
            } else {
                totalMoney.push(data.dsSanPham[i].prod_price);
            }
        }

        let totalPay = totalMoney.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

        const totalString = totalPay + "";

        const parts = totalString.split(".");

        const integerPart = parts[0];
        const decimalPart = parts[1] || "";

        return integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + (decimalPart.length > 0 ? "." + decimalPart : "");
    };

    const deleteHD = (id) => {

        let url_api = 'https://6469a718183682d61443f974.mockapi.io/hoadon/' + id;

        fetch(url_api, {
            method: 'DELETE', // POST: Thêm mới, PUT: Sửa, DELETE: xóa, GET: lấy thông tin
            headers: { // Định dạng dữ liệu gửi đi
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                //console.log(response.status);
                // nếu status là 200 thì là xóa thành công
                if (response.status == 200) {
                    backBill();
                }

            })
            .catch((err) => {  // catch để bắt lỗi ngoại lệ
                console.log(err);
            });
    }

    const showAlert = (id) => {
        Alert.alert(
            'Thông báo',
            'Bạn có muốn xóa hay không ?',
            [
                // mảng nút bấm
                {
                    text: 'Yes',
                    onPress: () => { deleteHD(id) }
                },
                {
                    text: 'No'
                }
            ],
            {
                cancelable: true,
                onDismiss: () => { }
            }
        )
    }

    const renderData = ({ item }) => {

        const calculatePrice = (item) => {
            const priceString = item.prod_price;
            const parts = priceString.split(".");

            const integerPart = parts[0];
            const decimalPart = parts[1] || "";

            return (
                integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".") +
                (decimalPart.length > 0 ? "." + decimalPart : "")
            );
        };

        const calculateTotal = (price, quantity) => {

            let totalPay = price * quantity;

            const totalString = totalPay + "";

            const parts = totalString.split(".");

            const integerPart = parts[0];
            const decimalPart = parts[1] || "";

            return integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + (decimalPart.length > 0 ? "." + decimalPart : "");
        };

        return (
            <View
                style={{
                    width: '100%',
                    height: 50,
                    borderWidth: 1,
                    borderTopWidth: 0,
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}
            >
                <View style={{ width: blockWidth, height: 50, borderRightWidth: 1, justifyContent: "center", paddingLeft: 10 }}>
                    <Text>{item.prod_name}</Text>
                </View>
                <View style={{ width: screenWidth - (screenWidth / 1.37), height: 50, justifyContent: "center", alignItems: "center" }}>
                    {(typeof data.quantity[item.id] !== 'undefined'
                    ) ? (
                        <View>
                            <Text>{calculatePrice(item)} x {data.quantity[item.id]}</Text>
                            <Text style={{ fontWeight: "bold", textAlign: "center" }}>{calculateTotal(item.prod_price, data.quantity[item.id])}</Text>
                        </View>
                    ) : (
                        <Text>{calculatePrice(item)}</Text>
                    )
                    }
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.toolbarContainer}>
                <TouchableOpacity onPress={backBill}>
                    <MaterialIcons name="arrow-back" size={24} color={'#FFF'} />
                </TouchableOpacity>
                <Text style={{ color: 'white', fontSize: 17, fontWeight: 'bold', paddingHorizontal: 16 }}>HÓA ĐƠN CHI TIẾT</Text>
            </View>
            <View style={styles.contentContainer}>
                <Text style={styles.title}>{data.maHoaDon}</Text>
                <Text style={styles.title}>ĐH {data.loaiHoaDon} - {data.date}</Text>
                <Text style={styles.title}>{data.maNhanVien} - Đào Duy Lâm</Text>
                <View style={{
                    width: '100%',
                    height: 50,
                    borderWidth: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}>
                    <View style={{ width: blockWidth, height: 50, borderRightWidth: 1, justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ fontWeight: "bold" }}>SẢN PHẨM</Text>
                    </View>
                    <View style={{ width: screenWidth - (screenWidth / 1.37), height: 50, justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ fontWeight: "bold" }}>TỔNG TIỀN</Text>
                    </View>
                </View>
                <View>
                    <FlatList
                        data={data.dsSanPham}
                        keyExtractor={(item) => { return item.id }}
                        renderItem={renderData}
                    />
                    <View style={{
                        width: '100%',
                        height: 50,
                        borderWidth: 1,
                        borderTopWidth: 0,
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}>
                        <View style={{ width: blockWidth, height: 50, borderRightWidth: 1, justifyContent: "center", paddingLeft: 10 }}>
                            <Text style={{ fontWeight: "bold" }}>THÀNH TIỀN</Text>
                        </View>
                        <View style={{ width: screenWidth - (screenWidth / 1.37), height: 50, justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{calculateTotal(data)} $</Text>
                        </View>
                    </View>
                </View>
                <View style={{ alignItems: "center", marginTop: 30 }}>
                    <TouchableOpacity style={{
                        width: buttonWidth,
                        height: buttonHeight,
                        backgroundColor: '#53FDFF',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 8
                    }} onPress={()=>showAlert(data.id)}>
                        <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'red' }}>XÓA</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    toolbarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#03DAC6',
        paddingHorizontal: 16,
        height: 56,
        width: '100%'
    },
    contentContainer: {
        flex: 1,
        marginHorizontal: 20,
        marginVertical: 20,
        borderWidth: 0,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'rgba(0,0,0,0.6)',
        marginBottom: 5
    },
    content: {
        color: '#ADADAD',
        fontSize: 17
    },
    line: {
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.3)',
        marginHorizontal: 0,
    },
    listProduct: {
        flexDirection: "row",
        borderWidth: 1,
        marginBottom: 5,
        borderRadius: 5,
        paddingHorizontal: 10,
        borderColor: 'lightgray',
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 10
    },
    nameProduct: {
        marginLeft: 8,
        fontSize: 16,
        fontWeight: "bold",
    },
    upAndDown: {
        width: 20,
        height: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    quantity: {
        flexDirection: "row",
        marginTop: 5,
        marginLeft: 7,
        borderWidth: 1,
        borderColor: 'lightgray',
        width: 80,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center"
    }
})

export default DetailHD