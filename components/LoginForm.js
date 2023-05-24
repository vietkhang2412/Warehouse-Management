import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert
} from "react-native";
import { Feather } from "@expo/vector-icons";
import axios from "axios";

export default function LoginForm({ isSignUp ,navigation }) {
  const [username, setUsername] = useState("");
  const [pass, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleLogin = async () => {
    if (validateLoginForm()) {

      try {
        // Gửi yêu cầu lấy danh sách người dùng
        const response = await axios.get("http://192.168.1.33:3000/users");
  
        // Tìm kiếm người dùng với tài khoản tương ứng
        const user = response.data.find((user) => user.username === username);
  
        if (user && user.pass === pass) {
          console.log("Đăng nhập thành công.");
          console.log("Họ Tên:", user.fullName);
          console.log("Tài khoản:", user.username);
          console.log("Mật khẩu:", user.pass);
  
          // Chuyển đến màn hình Home sau khi đăng nhập thành công
          navigation.navigate("HomeTab");
        } else {
          // Hiển thị thông báo lỗi
          Alert.alert("Thông báo", "Tài khoản hoặc mật khẩu không đúng.");
        }
      } catch (error) {
        console.error("Đăng nhập thất bại:", error);
      }
    }
  };

  const handleSignUp = async () => {
    if (validateSignUpForm()) {
      try {
      // Kiểm tra tài khoản đã tồn tại hay chưa
      const checkResponse = await axios.get(`http://192.168.1.33:3000/users?username=${username}`);
      if (checkResponse.data.length > 0) {
        Alert.alert("Thông báo", "Tài khoản đã tồn tại.");
        return;
      }
        // Gửi yêu cầu đăng ký mới
        const response = await axios.post("http://192.168.1.33:3000/users", {
          fullName,
          username,
          pass,
        });
        
        Alert.alert("Thông báo", "Đăng ký thành công.", [
          {
            text: "Đăng nhập ngay.",
            onPress: () => {
              console.log("Họ Tên:", response.data.fullName);
              console.log("Tài khoản:", response.data.username);
              console.log("Mật khẩu:", response.data.password);
              navigation.navigate("Login");
            },
          },
        ]);
      } catch (error) {
        console.error("Đăng ký thất bại:", error);
      }
    }
  };
  
  const validateLoginForm = () => {
    const errors = {};

    if (!username.trim()) {
      errors.username = "Tài khoản không được để trống!";
    } else if (username.includes(" ")) {
      errors.username = "Tài khoản không được chứa dấu cách!";
    }

    if (!pass.trim()) {
      errors.password = "Mật khẩu không được để trống!";
    } else if (pass.includes(" ")) {
      errors.password = "Mật khẩu không được chứa dấu cách!";
    } else if (pass.length < 5) {
      errors.password = "Mật khẩu quá yếu!";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateSignUpForm = () => {
    const errors = {};

    if (!fullName.trim()) {
      errors.fullName = "Họ tên không được để trống!";
    } else if (fullName.length > 24) {
      errors.fullName = "Họ tên quá dài!";
    } else if (fullName.length <= 15) {
      errors.fullName = "Họ tên không hợp lệ!";
    }

    if (!username.trim()) {
      errors.username = "Tài khoản không được để trống!";
    } else if (username.includes(" ")) {
      errors.username = "Tài khoản không được chứa dấu cách!";
    }

    if (!pass.trim()) {
      errors.password = "Mật khẩu không được để trống!";
    } else if (pass.includes(" ")) {
      errors.password = "Mật khẩu không được chứa dấu cách!";
    } else if (pass.length < 5) {
      errors.password = "Mật khẩu quá yếu!";
    }

    if (pass !== confirmPassword) {
      errors.confirmPassword = "Xác nhận mật khẩu không khớp!";
    } else if (!pass.trim()) {
      errors.confirmPassword = "Xác nhận mật khẩu không được để trống!";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const passwordPlaceholder = isSignUp
    ? "Nhập mật khẩu, tối thiểu 8 ký tự"
    : "Nhập mật khẩu";

  return (
    <View>
      {isSignUp && (
        <View>
          <Text style={styles.label}>Họ tên</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập họ tên"
            value={fullName}
            onChangeText={setFullName}
          />
          {errors.fullName && (
            <Text style={styles.errorText}>{errors.fullName}</Text>
          )}
        </View>
      )}
      <View>
        <Text style={styles.label}>Tài khoản</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập tài khoản"
          value={username}
          onChangeText={setUsername}
        />
        {errors.username && (
          <Text style={styles.errorText}>{errors.username}</Text>
        )}
      </View>

      <Text style={styles.label}>Mật khẩu</Text>
      <View style={styles.passwordInputContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder={passwordPlaceholder}
          secureTextEntry={!showPassword}
          value={pass}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Feather
            name={showPassword ? "eye-off" : "eye"}
            size={24}
            color={showPassword ? "gray" : "black"}
          />
        </TouchableOpacity>
      </View>
      {errors.password && (
        <Text style={styles.errorText}>{errors.password}</Text>
      )}

      {isSignUp && (
        <View>
          <Text style={styles.label}>Xác nhận mật khẩu</Text>
          <View style={styles.passwordInputContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Xác nhận mật khẩu"
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <Feather
                name={showConfirmPassword ? "eye-off" : "eye"}
                size={22}
                color={showConfirmPassword ? "gray" : "black"}
              />
            </TouchableOpacity>
          </View>
          {errors.confirmPassword && (
            <Text style={styles.errorText}>{errors.confirmPassword}</Text>
          )}
        </View>
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={isSignUp ? handleSignUp : handleLogin}
      >
        <Text style={styles.buttonText}>
          {isSignUp ? "Đăng ký" : "Đăng nhập"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontWeight: "bold",
    fontSize: 18,
  },
  input: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    paddingHorizontal: 8,
    marginVertical: 5,
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    marginVertical: 5,
  },
  passwordInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 8,
  },
  button: {
    backgroundColor: "#53FDFF",
    paddingVertical: 16,
    borderRadius: 30,
    marginTop: 30,
  },
  buttonText: {
    color: "#000000",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  errorText: {
    color: "red",
    fontSize: 12,
  },
});
