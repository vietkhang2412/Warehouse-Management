import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { Feather } from "@expo/vector-icons";

const LoginForm = ({ isSignUp, navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleLogin = () => {
    if (validateLoginForm()) {
      console.log("Đăng nhập thành công.");
      navigation.navigate("HomeTab"); // Điều hướng sang màn hình Home
    }
  };

  const handleSignUp = () => {
    if (validateSignUpForm()) {
      console.log("Đăng ký thành công.");
      console.log("Họ Tên:", fullName);
      console.log("Tài khoản:", username);
      console.log("Password:", password);
      console.log("RePassword", confirmPassword);
    }
  };

  const validateLoginForm = () => {
    const { username, password } = validateCommonFields();
    return username.isValid && password.isValid;
  };

  const validateSignUpForm = () => {
    const { username, password, fullName, confirmPassword } =
      validateCommonFields();
    return (
      username.isValid &&
      password.isValid &&
      fullName.isValid &&
      confirmPassword.isValid
    );
  };

  const validateCommonFields = () => {
    let usernameError = "";
    let passwordError = "";
    let fullNameError = "";
    let confirmPasswordError = "";

    if (!username.trim()) {
      usernameError = "Tài khoản không được để trống!";
    } else if (username.includes(" ")) {
      usernameError = "Tài khoản không được chứa dấu cách!";
    }

    if (!password.trim()) {
      passwordError = "Mật khẩu không được để trống!";
    } else if (password.includes(" ")) {
      passwordError = "Mật khẩu không được chứa dấu cách!";
    } else if (password.length < 5) {
      passwordError = "Mật khẩu quá yếu!";
    }

    if (isSignUp) {
      if (!fullName.trim()) {
        fullNameError = "Họ tên không được để trống!";
      } else if (fullName.length > 24) {
        fullNameError = "Họ tên quá dài!";
      } else if (fullName.length <= 15) {
        fullNameError = "Họ tên không hợp lệ!";
      }

      if (password !== confirmPassword) {
        confirmPasswordError = "Xác nhận mật khẩu không khớp!";
      } else if (!password.trim()) {
        confirmPasswordError = "Xác nhận mật khẩu không được để trống!";
      }
    }

    setErrors({
      fullName: fullNameError,
      username: usernameError,
      password: passwordError,
      confirmPassword: confirmPasswordError,
    });

    return {
      username: { value: username, isValid: !usernameError },
      password: { value: password, isValid: !passwordError },
      fullName: { value: fullName, isValid: !fullNameError },
      confirmPassword: {
        value: confirmPassword,
        isValid: !confirmPasswordError,
      },
    };
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
          {errors.fullName ? (
            <Text style={styles.errorText}>{errors.fullName}</Text>
          ) : null}
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
        {errors.username ? (
          <Text style={styles.errorText}>{errors.username}</Text>
        ) : null}
      </View>

      <Text style={styles.label}>Mật khẩu</Text>
      <View style={styles.passwordInputContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder={passwordPlaceholder}
          secureTextEntry={!showPassword}
          value={password}
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
      {errors.password ? (
        <Text style={styles.errorText}>{errors.password}</Text>
      ) : null}

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
          {errors.confirmPassword ? (
            <Text style={styles.errorText}>{errors.confirmPassword}</Text>
          ) : null}
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
};

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

export default LoginForm;
