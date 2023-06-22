import {
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  RefreshControl,
} from "react-native";
import React from "react";
import st from "./style";
import { useState } from "react";
import { FAB } from "@rneui/themed";
import ModalEmployee from "./ModalEmployee";
import env from "../../Env";
import { MaterialIcons } from "@expo/vector-icons";

const ListEmployee = (props) => {
  //console.log(props);
  const [isLoading, setisLoading] = useState(true);
  const [isReloading, setisReloading] = useState(false);
  const [data_employee, setdata_employee] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [showFAB, setShowFAB] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [showSearchInput, setShowSearchInput] = useState(false);

  const getListEmployee = async () => {
    let url_api = env.url_Employ;
    try {
      const response = await fetch(url_api);
      const json = await response.json();
      setdata_employee(json);
    } catch (error) {}
  };

  const goAddEmloyee2 = () => {
    props.navigation.navigate("AddEmployee2");
  };

  //Tìm kiếm nhân viên

  const handleCancel = () => {
    setShowFAB(true);
    setSearchText("");
    setShowSearchInput(false);
  };

  const handleSearch = (query) => {
    if (showSearchInput) {
      // Xử lý khi người dùng bấm tìm kiếm
      setShowFAB(false);
      const results = data_employee.filter((item) =>
        item.tenNV.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setShowFAB(true);
      setShowSearchInput(true);
    }
  };

  React.useEffect(() => {
    getListEmployee();
    if (showSearchInput) {
      handleSearch(searchText);
    } else {
      null;
    }
  }, [searchText]);

  const reloadData = React.useCallback(() => {
    //Đánh dấu trạng thái đang reload
    setisReloading(true);
    //công việc xủ lý load lại dữ liệu
    setTimeout(() => {
      getListEmployee();
      setisReloading(false);
    }, 1500);
  });

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
    <View style={st.container_list}>
      <View style={st.toolbar}>
        {showSearchInput ? null : (
          <View style={st.toolbar2}>
            <Text style={{ color: "white", fontSize: 17, fontWeight: "bold" }}>
              NHÂN VIÊN
            </Text>
            <TouchableOpacity onPress={handleSearch}>
              <MaterialIcons name="search" size={24} color={"#FFF"} />
            </TouchableOpacity>
          </View>
        )}

        {showSearchInput ? (
          <View style={st.searchWrapper}>
            <TextInput
              placeholder="Tìm kiếm"
              style={st.textInput2}
              value={searchText}
              onChangeText={setSearchText}
              autoFocus
              autoCorrect={false}
              autoCapitalize="none"
            />
            <TouchableOpacity onPress={handleCancel}>
              <MaterialIcons name="cancel" size={24} color={"#FFF"} />
            </TouchableOpacity>
          </View>
        ) : null}
      </View>

      <FlatList
        refreshControl={
          <RefreshControl refreshing={isReloading} onRefresh={reloadData} />
        }
        style={{ marginBottom: "30%" }}
        data={searchText ? searchResults : data_employee}
        renderItem={({ item }) => (
          <ModalEmployee nav={props.navigation} data={item} />
        )}
        keyExtractor={(item) => item.id}
      />

      <FAB
        onPress={goAddEmloyee2}
        visible={showFAB}
        icon={{ name: "add", color: "black" }}
        color="green"
        title="Thêm nhân viên"
        placement="right"
        titleStyle={{ color: "black" }}
        buttonStyle={{ backgroundColor: "#53FDFF" }}
        style={{ marginBottom: "27%" }}
      />
    </View>
  );
};

export default ListEmployee;
