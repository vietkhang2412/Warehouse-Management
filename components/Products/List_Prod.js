import { View, Text, ScrollView, ActivityIndicator, FlatList, SafeAreaView, RefreshControl, Image,TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react';
import env from './Env';
import styles from './style';
import Toolbar from '../toolbar';
import { MaterialIcons } from '@expo/vector-icons';

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
    }


    const renderProd = ({ item }) => {

        return (
            <View style={{ width: '100%' }}>
                <View style={styles.item} >
                    {item.image != '' ? 
                        <TouchableOpacity onPress={() => props.navigation.navigate('Update_Prod', { Data: item })}>
                            <Image source={{ uri: item.image }} style={styles.img} />
                        </TouchableOpacity>
                           
                        : <TouchableOpacity onPress={() => props.navigation.navigate('Update_Prod', { Data: item })}>
                            <Image source={require('../../assets/imgProd/burger.png')} style={styles.img} />
                          </TouchableOpacity> }
                        
                    <View style={{ width: 180 }}>
                        <Text style={styles.item_name}>{item.prod_name} </Text>
                        <Text style={styles.item_code}>{item.prod_code} </Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.item_code}>Tồn kho: {item.prod_qty}</Text>
                        <Text style={{ fontSize: 18, color: 'red', fontWeight: '500' }}>{item.prod_price} đ</Text>
                    </View>
                </View>
                <View style={{ height: 1, width: '100%', backgroundColor: 'gray', marginTop: -10 }}></View>
            </View>
        );
    }


    useEffect(() => {
        getList();
    })


    const reloadData = React.useCallback(() => {
        //Đánh dấu trạng thái đang reload
        setisReloading(true);
        //công việc xủ lý load lại dữ liệu
        setTimeout(() => {
            getList();
            setisReloading(false);
        }, 1500);
    });


    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <View style={styles.toolbar}>
                <Text style={{ color: 'white', fontSize: 17, fontWeight: 'bold' }}>SẢN PHẨM</Text>
                {/* <Toolbar /> */}
                <MaterialIcons name="search" size={24} color={'#FFF'} />
            </View>
           
            {listProd.length != 0 ?
                <View style={{ alignItems: 'center', width: '100%' }}>
                    <TouchableOpacity onPress={() => { props.navigation.navigate('Add_Prod') }} style={styles.btn_list_add}><Text style={{ fontWeight: 'bold' }}>+ Thêm sản phẩm</Text></TouchableOpacity>
                    <View style={{ flexDirection: 'row', marginTop: -15 }}>
                        <View style={{ backgroundColor: '#DDDDDD', width: 170, height: 70, borderRadius: 10, alignItems: 'center' }}>
                            <Text style={styles.title}>*  Số lượng</Text>
                            <Text style={{ color: 'green', fontSize: 18 }}>55</Text>
                        </View>
                        <View style={{ marginLeft: 15, backgroundColor: '#DDDDDD', width: 200, height: 70, borderRadius: 10, alignItems: 'center' }}>
                            <Text style={styles.title}>$  Giá trị tồn</Text>
                            <Text style={{ color: 'green', fontSize: 18 }}>1.000.000 đ</Text>
                        </View>
                    </View>
                    <View style={{ marginTop: 5, height: 10, width: '100%', backgroundColor: '#DDDDDD' }}></View>
                </View>
                :
                <View style={{ alignItems: 'center', width: '100%' }}>
                    <Image source={require('../../assets/imgProd/logo.png')} style={{ marginTop: 200, marginBottom: 30 }} />
                    <TouchableOpacity onPress={() => { props.navigation.navigate('Add_Prod') }} style={styles.btn_add}><Text style={{ fontWeight: 'bold' }}>Thêm sản phẩm</Text></TouchableOpacity>
                </View>
            }

            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView refreshControl={
                    <RefreshControl refreshing={isReloading}
                        onRefresh={reloadData} />
                }>
                    <View >
                        <ScrollView >
                            {
                                (isLoading) ? (
                                    <ActivityIndicator />
                                ) : (
                                    <FlatList data={listProd}
                                        keyExtractor={(item) => { return item.id }}
                                        renderItem={renderProd} />
                                )
                            }
                        </ScrollView>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}

export default List_Prod