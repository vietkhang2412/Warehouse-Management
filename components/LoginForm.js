import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { Feather } from "@expo/vector-icons";

export default function LoginForm({ isSignUp }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleLogin = () => {
    // Xử lý logic đăng nhập
    console.log("Đăng nhập");
  };

  const handleSignUp = () => {
    // Xử lý logic đăng ký
    console.log("Đăng ký");
    console.log("Họ và Tên:", fullName);
  };

  const passwordPlaceholder = isSignUp ? "Nhập mật khẩu, tối thiểu 8 ký tự" : "Nhập mật khẩu";

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
      </View>
      <View style={styles.passwordContainer}>
        <Text style={styles.label}>Mật khẩu</Text>
        <View style={styles.passwordInputContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder={passwordPlaceholder}
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          {isSignUp && password.length > 0 && !isNaN(password) && <Text>, tối thiểu 8 ký tự</Text>}
          <TouchableOpacity
            style={styles.passwordIconContainer}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Feather
              name={showPassword ? "eye-off" : "eye"}
              size={24}
              color={showPassword ? "gray" : "black"}
            />
          </TouchableOpacity>
        </View>
      </View>

      {isSignUp && (
        <View style={styles.passwordContainer}>
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
              style={styles.passwordIconContainer}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <Feather
                name={showConfirmPassword ? "eye-off" : "eye"}
                size={24}
                color={showConfirmPassword ? "gray" : "black"}
              />
            </TouchableOpacity>
          </View>
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
    marginBottom: 5,
    fontWeight: "bold",
    fontSize: 18,
  },
  input: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  passwordContainer: {
    marginBottom: 16,
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  passwordInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 8,
  },
  passwordIconContainer: {
    padding: 8,
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
});
