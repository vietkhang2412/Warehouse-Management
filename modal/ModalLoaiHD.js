import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';


const ModalLoaiHD = ({ showModalLoaiHD, setShowModalLoaiHD, data, value, onSelect }) => {

    const handleCloseModal = () => {
        setShowModalLoaiHD(false);
    }

    const onSelectItem = (val) => {
        onSelect(val);
        handleCloseModal();
    }

    return (
        <View style={styles.container}>
            <Modal visible={showModalLoaiHD}
                transparent={true}
                animationType="fade"
                onRequestClose={handleCloseModal}>
                <View style={styles.modalContainer} >
                    {data.map((val, i) => {
                        return (
                            <TouchableOpacity
                                key={String(i)}
                                onPress={() => onSelectItem(val)}
                                style={{
                                    ...styles.selectedItemStyle,
                                    backgroundColor:
                                        value.id == val.id ? "rgba(0,0,0,0.1)" : "white",
                                }}
                            >
                                <Text style={styles.value}>{val.name}</Text>
                            </TouchableOpacity>
                        );
                    })}
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
    modalContainer: {
        alignSelf:"flex-end",
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        height: 81,
        width: 155,
        marginTop:310,
        marginRight:40,
        borderWidth:2,
        paddingTop:4,
        borderRadius:4,
        borderColor:'lightgray'
    },
    value: {
        fontSize: 15,
        paddingHorizontal:10
    },
    line: {
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.3)',
        marginHorizontal: 0,
    },
    selectedItemStyle: {
        paddingVertical: 8,
        marginBottom: 4,
        width: 150
    }
})

export default ModalLoaiHD