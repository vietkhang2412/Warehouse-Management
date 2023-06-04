import {
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React from "react";
import st from "./style";
import { useState } from "react";
import { FAB } from "@rneui/themed";
import ItemEmployee from "./itemEmployee";
import ModalEmployee from "./ModalEmployee";

const AddEmployee = (props) => {
  //console.log(props);
  const [data_employee, setdata_employee] = useState([]);

  const getListEmployee = async () => {
    let url_api = "http://192.168.1.7:3000/employee";
    try {
      const response = await fetch(url_api);
      const json = await response.json();
      setdata_employee(json);
    } catch (error) {}
  };

  React.useEffect(() => {
    getListEmployee();
  });

  const goAddEmloyee2 = () => {
    props.navigation.navigate("AddEmployee2");
  };

  // console.log(data_employee.length);

  return data_employee.length == 0 ? (
    <ScrollView>
      <View style={st.container_add}>
        <Image source={require("../../assets/ImageE/logo2.png")} />
        <TouchableOpacity onPress={goAddEmloyee2}>
          <Text style={st.btn_add}>THÊM NHÂN VIÊN</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  ) : (
    <View>
      <ScrollView>
        <FlatList
          data={data_employee}
          renderItem={({ item }) => (
            <ModalEmployee nav={props.navigation} data={item} />
          )}
          keyExtractor={(item) => item._id}
        />
      </ScrollView>
      <FAB
        onPress={goAddEmloyee2}
        visible={true}
        icon={{ name: "add", color: "black" }}
        color="green"
        title="Thêm nhân viên"
        placement="right"
        titleStyle={{ color: "black" }}
        buttonStyle={{ backgroundColor: "#53FDFF" }}
        style={{ marginBottom: 70 }}
      />
    </View>
  );
};

export default AddEmployee;
