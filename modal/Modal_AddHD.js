import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, Modal, FlatList, ScrollView, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import ModalListProduct from "./Modal_ListProduct";
import ModalLoaiHD from "./ModalLoaiHD";
import env from "../Env";

let loai = [
    { id: "Nhập", name: "Nhập" },
    { id: "Xuất", name: "Xuất" }
]
const ModalAddHD = ({ showModalDialog, setShowModalDialog }) => {

    const [dataModalProduct, setDataModalProduct] = useState([]);

    const [showModalListProduct, setShowModalListProduct] = useState(false);

    const [selectedItem, setSelectedItem] = useState({ id: "Nhập", name: "Nhập" })

    const onSelect = (item) => {
        setSelectedItem(item)
    }

    const [showModalLoaiHD, setShowModalLoaiHD] = useState(false);

    const [buttonWidth, setButtonWidth] = useState(0);
    const [buttonHeight, setButtonHeight] = useState(0);

    useEffect(() => {
        const screenWidth = Dimensions.get('window').width;
        const screenHeight = Dimensions.get('window').height;

        const desiredWidth = screenWidth * 0.4056;
        const desiredHeight = screenHeight * 0.039;

        setButtonWidth(desiredWidth);
        setButtonHeight(desiredHeight);

    }, []);

    const openModal = () => {
        setShowModalListProduct(true);
    };

    const openModalLoaiHD = () => {
        setShowModalLoaiHD(!showModalLoaiHD);
    };

    const closeModal = () => {
        setDataModalProduct([]);
        setShowModalDialog(false);
        setItemQuantities(1);
    };


    const [itemQuantities, setItemQuantities] = useState({})


    const deleteProduct = (id) => {
        setDataModalProduct(prevItems => prevItems.filter(item => item.id !== id));
    };

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();

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
        }
    }

    useEffect(() => {
        if (showModalDialog) {
            getData();
        }
    }, [showModalDialog]);

    const [maHD, setMaHD] = useState('');

    useEffect(() => {
        updateMaHD();
    }, []); // Gọi updateMaHD khi component được khởi tạo

    const updateMaHD = () => {
        const newMaHD = (selectedItem.name.match('Nhập') ? 'HDN' : 'HDX') + '_' + formattedDate.split('/').join('') + '_S' + (Number(data.length) + 1);
        setMaHD(newMaHD);
    };

    const SaveData = () => {
        let maHoaDon = maHD;
        let maNhanVien = 'NV003';
        let loaiHoaDon = selectedItem.name;
        let dsSanPham = dataModalProduct;
        let date = formattedDate;
        let quantity = itemQuantities;
        // 1. tạo obj 
        let objHD = {
            maHoaDon, maNhanVien, loaiHoaDon, dsSanPham, date, quantity
        };

        //2. Dùng fetch:
        let api_url = 'https://6469a718183682d61443f974.mockapi.io/hoadon'

        fetch(api_url, {
            method: 'POST', // POST: Thêm mới, PUT: Sửa, DELETE: xóa, GET: lấy thông tin
            headers: { // Định dạng dữ liệu gửi đi
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(objHD) // chuyển đối tượng SP thành chuỗi JSON
        })
            .then((response) => {
                // nếu log là 201 thì là tạo thành công
                if (response.status == 201) { closeModal() }
            })
            .catch((err) => {  // catch để bắt lỗi ngoại lệ
                console.log(err);
            });

    }

    const renderData = ({ item }) => {

        const quantity = itemQuantities[item.id] || 1;

        const up = () => {
            setItemQuantities((prevState) => ({
                ...prevState,
                [item.id]: quantity + 1,
            }));
        };

        const down = () => {
            if (quantity > 0) {
                setItemQuantities((prevState) => ({
                    ...prevState,
                    [item.id]: quantity - 1,
                }));
            }
        };

        const deleteProductHandler = () => {
            deleteProduct(item.id);
        };


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

        return (
            <View style={styles.listProduct}>
                <Image source={{ uri: item.image }} style={{ width: 70, height: 70 }} />
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text style={styles.nameProduct}>{item.prod_name}</Text>
                    <View style={{ flexDirection: "row", marginLeft: 10 }}>
                        <Text style={{ color: 'gray', fontSize: 12 }} >Giá bán: </Text>
                        <Text style={{ color: 'red', fontSize: 12 }} >{calculatePrice(item)} đ</Text>
                    </View>
                    <View style={styles.quantity}>
                        <TouchableOpacity style={styles.upAndDown} onPress={down}>
                            <MaterialIcons name="remove" size={15} color={'black'} />
                        </TouchableOpacity>
                        <View style={{ width: 30, borderLeftWidth: 1, borderRightWidth: 1, borderColor: 'lightgray' }}>
                            <TextInput
                                placeholder="0"
                                textAlign="center"
                                value={String(quantity)}
                                keyboardType="numeric"
                                onChangeText={(text) => {
                                    const parsedValue = parseInt(text) || 0;
                                    if (selectedItem.name.match('Xuất')) {
                                        if (parsedValue <= item.prod_qty) {
                                            setItemQuantities((prevState) => ({
                                                ...prevState,
                                                [item.id]: parsedValue,
                                            }));
                                        }
                                    } else {
                                        setItemQuantities((prevState) => ({
                                            ...prevState,
                                            [item.id]: parsedValue,
                                        }));
                                    }
                                }}
                            />
                        </View>
                        <TouchableOpacity style={styles.upAndDown} onPress={up} disabled={selectedItem.name == 'Xuất' && quantity >= item.prod_qty ? true : false}>
                            <MaterialIcons name="add" size={15} color={'black'} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <TouchableOpacity onPress={deleteProductHandler}>
                        <MaterialIcons name="delete" size={24} color={'red'} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
        <View>
            <Modal visible={showModalDialog}
                transparent={true}
                animationType="fade"
                onRequestClose={closeModal}>
                <View style={styles.container}>
                    <View style={styles.toolbarContainer}>
                        <TouchableOpacity onPress={closeModal}>
                            <MaterialIcons name="arrow-back" size={24} color={'#FFF'} />
                        </TouchableOpacity>
                        <Text style={{ color: 'white', fontSize: 17, fontWeight: 'bold', paddingHorizontal: 16 }}>THÊM HÓA ĐƠN</Text>
                    </View>

                    <View style={styles.contentContainer}>
                        <View>
                            <Text style={styles.title}>MÃ HÓA ĐƠN</Text>
                            <Text style={styles.content}>{maHD}</Text>
                        </View>
                        <View>
                            <Text style={styles.title}>MÃ NHÂN VIÊN</Text>
                            <Text style={styles.content}>NV003</Text>
                        </View>
                        <View>
                            <Text style={styles.title}>LOẠI HÓA ĐƠN</Text>
                            <View style={{ height: 15 }}></View>
                            <TouchableOpacity onPress={openModalLoaiHD} activeOpacity={0.7}>
                                <ModalLoaiHD
                                    showModalLoaiHD={showModalLoaiHD}
                                    setShowModalLoaiHD={setShowModalLoaiHD}
                                    data={loai}
                                    value={selectedItem}
                                    onSelect={onSelect} />
                                <Text style={styles.content}>{selectedItem.name}</Text>
                                <View style={{ height: 15 }}></View>
                                <View style={styles.line}></View>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Text style={styles.title}>THÊM SẢN PHẨM</Text>
                            <View style={{ height: 15 }}></View>
                            <TouchableOpacity onPress={openModal}>
                                <ModalListProduct showModalListProduct={showModalListProduct}
                                    setShowModalListProduct={setShowModalListProduct} dataChecked={dataModalProduct} setDataModalProduct={setDataModalProduct} />
                                <Text style={styles.content}>Chọn sản phẩm</Text>
                                <View style={{ height: 15 }}></View>
                                <View style={styles.line}></View>
                            </TouchableOpacity>
                        </View>
                        <View style={{ height: 250 }}>
                            <FlatList
                                data={dataModalProduct}
                                keyExtractor={(item) => { return item.id }}
                                renderItem={renderData}
                            />
                        </View>
                        <View style={{ alignItems: "center" }}>
                            <TouchableOpacity style={{
                                width: buttonWidth,
                                height: buttonHeight,
                                backgroundColor: '#53FDFF',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 8
                            }} onPress={SaveData}>
                                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>XÁC NHẬN</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </Modal>
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
        marginHorizontal: 30,
        marginVertical: 20,
        justifyContent: "space-between",
        borderWidth: 0,
    },
    title: {
        color: 'black',
        fontWeight: "bold",
        fontSize: 18,
        marginBottom: 10
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

export default ModalAddHD