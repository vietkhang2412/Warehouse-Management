import { View, ScrollView, Image, Text, TouchableOpacity } from "react-native";
import React from "react";
import st from "./style";

const AddEmployee = (props) => {
  //console.log(props);

  const goAddEmloyee2 = () => {
    props.navigation.navigate("AddEmployee2");
    //console.log(props.navigation.n);
  };

  return (
    <ScrollView>
      <View style={st.container_add}>
        <Image source={require("../../assets/ImageE/logo2.png")} />
        <TouchableOpacity onPress={goAddEmloyee2}>
          <Text style={st.btn_add}>THÊM NHÂN VIÊN</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AddEmployee;
