import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, Modal, ActivityIndicator, FlatList, ScrollView, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';


const ProductItem = ({ item, handleScrollEnd, setListChecked, dataChecked, listChecked }) => {
    const [checked, setChecked] = useState(false);


    useEffect(() => {
        for (let i = 0; i < dataChecked.length; i++) {
            if (dataChecked[i].id == item.id) {
                setChecked(true);
            }
        }
    })


    const handleToggleCheckbox = () => {
        const newChecked = !checked;
        setChecked(newChecked);

        const updatedListChecked = newChecked
            ? [...listChecked, item]
            : listChecked.filter((checkedItem) => checkedItem.id !== item.id);
        setListChecked(updatedListChecked);
    };


    return (
        <ScrollView onScroll={handleScrollEnd}>
            <TouchableOpacity
                style={styles.checkboxContainer}
                onPress={handleToggleCheckbox}
            >
                {checked ? (
                    <MaterialIcons name="check-box" size={24} color="green" />
                ) : (
                    <MaterialIcons name="check-box-outline-blank" size={24} color="black" />
                )}
                <View style={{ flexDirection: "row", paddingVertical: 10 }}>
                    <Image source={{ uri: item.image }} style={{ width: 100, height: 100 }} />
                    <View style={{ justifyContent: "center" }}>
                        <Text style={styles.checkboxLabel}>{item.productName}</Text>
                        <View style={{ flexDirection: "column", marginLeft: 8, marginTop: 5 }}>
                            <View style={{ flexDirection: "row" }}>
                                <Text>Tồn kho: </Text>
                                <Text>{item.tonkho}</Text>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <Text>Giá bán: </Text>
                                <Text style={{color:'red'}} >{item.price}.000 đ</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </ScrollView>
    );
};


const ModalListProduct = ({ showModalListProduct, setShowModalListProduct, setDataModalProduct, dataChecked }) => {
    const [listChecked, setListChecked] = useState([]);

    const [scrollEnd, setScrollEnd] = useState(false);

    const handleCloseModal = () => {
        if (!scrollEnd) {
            const uniqueDataModalProduct = listChecked.filter((item, index, self) => {
                // Kiểm tra index của item đầu tiên trong mảng với index hiện tại
                return self.findIndex((i) => i.id === item.id) === index;
            });
            setDataModalProduct(uniqueDataModalProduct);
            setShowModalListProduct(false);
        }
    };

    const handleScrollEnd = (event) => {
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
        const isEndReached =
            layoutMeasurement.height + contentOffset.y >= contentSize.height;
        setScrollEnd(isEndReached);
    };

    useEffect(() => {
        if (showModalListProduct) {
            getData();
        }
    }, [showModalListProduct]);


    const [isLoading, setisLoading] = useState(true);
    const [data, setData] = useState([]); // chứa sản phẩm
    // xử lý hiển thị dữ liệu
    const getData = async () => {
        let url_api = 'https://6469a718183682d61443f974.mockapi.io/product';

        try {
            const response = await fetch(url_api);  // lấy dữ liệu về
            const jsonSP = await response.json(); // chuyển dữ liệu thành đối tượng json
            setData(jsonSP);
            //console.log(jsonSP);
        } catch (error) {
            console.error(error);
        } finally {
            // kết thúc quá trình thực hiện trong try, dù xảy ra lỗi hay không cũng gọi vào đây
            // đổi trạng thái isLoading là false
            setisLoading(false);
        }
    }

    const renderData = ({ item }) => {

        return <ProductItem item={item} handleScrollEnd={handleScrollEnd} listChecked={listChecked} setListChecked={setListChecked} dataChecked={dataChecked} />

    }

    return (
        <View style={styles.container}>
            <Modal visible={showModalListProduct}
                transparent={true}
                animationType="fade"
                onRequestClose={handleCloseModal}>
                <View style={styles.modalContainer} >
                    <View style={styles.contentContainer}>
                        <View style={styles.toolbarContainer}>
                            <TouchableOpacity onPress={handleCloseModal}>
                                <MaterialIcons name="arrow-back" size={24} color={'#FFF'} />
                            </TouchableOpacity>
                            <Text style={{ color: 'white', fontSize: 17, fontWeight: 'bold', paddingLeft: 16 }}>DANH SÁCH SẢN PHẨM</Text>
                        </View>
                        <View style={styles.search}>
                            <TextInput
                                style={styles.searchInput}
                                placeholder="Tìm kiếm..."
                                placeholderTextColor="#404040"
                            />
                            <TouchableOpacity style={{ marginHorizontal: 10 }}>
                                <Ionicons name="search" size={24} color="#03DAC6" />
                            </TouchableOpacity>
                        </View>
                        {
                            (isLoading) ? (
                                <ActivityIndicator />
                            ) : (
                                <FlatList
                                    data={data}
                                    keyExtractor={(item) => { return item.id }}
                                    renderItem={renderData}
                                />
                            )
                        }

                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    contentContainer: {
        width: Dimensions.get('window').width * 0.8,
        height: Dimensions.get('window').height * 0.8,
        backgroundColor: 'white'
    },
    title: {
        color: 'black',
        fontWeight: "bold",
        fontSize: 18,
        marginBottom: 10
    },
    content: {
        color: '#ADADAD',
        fontSize: 15
    },
    line: {
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.3)',
        marginHorizontal: 0,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    checkboxLabel: {
        marginLeft: 8,
        fontSize: 18,
        fontWeight: "bold",
    },
    searchInput: {
        flex: 1,
        backgroundColor: '#eee',
        borderRadius: 20,
        paddingHorizontal: 17,
        paddingVertical: 8,
        color: 'white',
        marginVertical: 2,
    },
    search: {
        width: '100%',
        height: 40,
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 5,
        paddingLeft: 5
    }
})

export default ModalListProduct