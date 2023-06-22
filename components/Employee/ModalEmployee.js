import { View, Text, TouchableOpacity, Alert } from "react-native";
import React from "react";
import Modal from "react-native-modal";
import ItemEmployee from "./itemEmployee";
import { useState } from "react";
import st from "./style";
import env from "../../Env";

const ModalEmployee = (props) => {
  const { data } = props;
  // console.log(props);
  //model bottom sheet
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const goUpdateEmployee = () => {
    props.nav.navigate("UpdateEmployee", { item: props.data });
  };

  const deleteEmployee = () => {
    let url_api_delete = env.url_Employ_del + props.data.id;
    Alert.alert("Thông Báo!", "Bạn có chắc muốn xóa?", [
      {
        text: "OK",
        onPress: () => {
          fetch(url_api_delete, {
            method: "DELETE",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          })
            .then((res) => {
              if (res.status == 200) {
                alert("Xóa thành công!");
              }
            })
            .catch((ex) => {
              console.log(ex);
            });
        },
      },
      { text: "Cancel", onPress: () => { } },
    ]);
  };

  return (
    <View>
      <Modal
        onBackdropPress={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}
        isVisible={isModalVisible}
        swipeDirection="down"
        onSwipeComplete={toggleModal}
        animationInTiming={900}
        animationOutTiming={500}
        backdropTransitionInTiming={1000}
        backdropTransitionOutTiming={500}
        style={st.modal}
      >
        <View style={st.modalContent}>
          <View style={st.center}>
            <View style={{ alignItems: "center" }}>
              <View style={st.barIcon} />
            </View>

            <Text style={st.textTitle}>Chi Tiết Nhân Viên</Text>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={[
                  st.textContent,
                  { fontWeight: "500", color: "black", width: "35%" },
                ]}
              >
                Mã Nhân Viên:
              </Text>
              <Text style={st.textContent}>{props.data.maNV}</Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text
                style={[
                  st.textContent,
                  { fontWeight: "500", color: "black", width: "35%" },
                ]}
              >
                Tên nhân viên:
              </Text>
              <Text style={st.textContent}>{props.data.tenNV}</Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text
                style={[
                  st.textContent,
                  { fontWeight: "500", color: "black", width: "35%" },
                ]}
              >
                Tài Khoản:
              </Text>
              <Text style={st.textContent}>{props.data.taiKhoan}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={[
                  st.textContent,
                  { fontWeight: "500", color: "black", width: "35%" },
                ]}
              >
                Số điện thoại:
              </Text>
              <Text style={st.textContent}>{props.data.dienThoai}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={[
                  st.textContent,
                  { fontWeight: "500", color: "black", width: "35%" },
                ]}
              >
                Chức vụ:
              </Text>
              <Text style={st.textContent}>{props.data.chucVu}</Text>
            </View>
            <View style={st.button}>
              <TouchableOpacity onPress={goUpdateEmployee}>
                <Text style={st.btn_update}>CẬP NHẬT</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={deleteEmployee}>
                <Text style={st.btn_delete}>XÓA</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <TouchableOpacity onPress={toggleModal}>
        <ItemEmployee nav={props.navigation} data={data} />
      </TouchableOpacity>
    </View>
  );
};

export default ModalEmployee;
