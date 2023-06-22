import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    img: {
        width: 70,
        height: 70,
        borderRadius: 5,
        marginRight: 10
    },
    item: {
        padding: 8,
        marginHorizontal: 20,
        marginVertical: 8,
        flexDirection: 'row',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 15,
        marginHorizontal: 16
    },
    red: {
        color: 'red'
    },

    formCtrl: {
        marginVertical: 8,
        padding: 5,
        backgroundColor: 'rgb(255,255,255)',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        marginHorizontal: 10
    },
    FAB1: {
        flex: 1,
        position: 'absolute',
        bottom: 10,
        left: '32%',
    },
    pes: {
        width: 270,
        height: 40,
        backgroundColor: 'rgb(255,255,255)',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 5
    },
    fix: {
        fontSize: 25,
        color: 'grey',
        marginLeft: 10,
        marginTop: 5
    },
    clear: {
        fontSize: 25,
        color: 'gray',
        marginLeft: 10,
        marginTop: 10
    },
    add_img: {
        marginBottom: 30,
        backgroundColor: '#DDDDDD',
        flexDirection: 'row',
    },
    img_box: {
        marginHorizontal: 30,
        marginVertical: 10,
        width: 150,
        height: 120,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
    },
    btn_add_img: {
        width: 150,
        borderWidth: 1,
        borderColor: '#0D99FF',
        borderRadius: 10,
        marginHorizontal: 15,
        marginVertical: 13,
        padding: 8
    },
    text_add_img: {
        color: '#0D99FF',
        fontSize: 18,
        marginLeft: 10
    },
    btn_save: {
        width: 150,
        borderRadius: 10,
        marginVertical: 30,
        padding: 8,
        alignItems: 'center',
        backgroundColor: '#53FDFF'
    },
    btn_add: {
        width: 220,
        borderRadius: 10,
        marginVertical: 30,
        padding: 8,
        alignItems: 'center',
        backgroundColor: '#53FDFF'
    },
    btn_list_add: {
        width: 380,
        borderRadius: 5,
        marginVertical: 30,
        padding: 8,
        alignItems: 'center',
        backgroundColor: '#53FDFF'
    },
    item_name: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 5
    },
    item_code: {
        fontWeight: '600',
        fontSize: 18,
        marginBottom: 5,
        color: 'gray',
    },
    btn_del: {
        width: 150,
        borderRadius: 10,
        marginVertical: 30,
        padding: 8,
        alignItems: 'center',
        backgroundColor: '#53FDFF',
        marginHorizontal: 35
    },
    toolbar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#03DAC6',
        paddingHorizontal: 16,
        height: 56,
        width: '100%',
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

});

export default styles;