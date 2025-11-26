import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppText from "../../components/AppText";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import CheckBox from "../../ui/CheckBox";

export const Register = ({ navigation }) => {
  const [hidden, setHidden] = useState(true);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async () => {
    setError("");
    if (!name.trim() || !phone.trim() || !email.trim() || !password) {
      setError("Заполните все поля.");
      return;
    }
    if (!agree) {
      setError("Примите условия использования.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        first_name: name.trim(),
        phone: phone.trim(),
        email: email.trim().toLowerCase(),
        password,
      };

      const { data } = await axios.post(
        "https://1touch.navisdevs.ru/api/user/auth/register/",
        payload,
        {
          headers: { "Content-Type": "application/json" },
          timeout: 15000,
        }
      );


      if (data?.message) {
        navigation.navigate("ConfirmNumber",{data});
        return;
      }

      setError("Регистрация не удалась. Попробуйте позже.");
    } catch (err) {
      const msg =
        err?.response.data.name||
        err?.response.data.phone||
        err?.response.data.email||
        err?.response.data.first_name||
        "Регистрация не удалась. Попробуйте позже."
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <AppText style={styles.title} font="Inter">
          Создать аккаунт
        </AppText>

        <AppText style={styles.label}>Имя</AppText>
        <TextInput
          style={styles.input}
          placeholder="Введите ваше имя"
          placeholderTextColor="#00000080"
          value={name}
          onChangeText={setName}
        />

        <AppText style={styles.label}>Номер телефона</AppText>
        <TextInput
          style={styles.input}
          placeholder="Введите номер телефона"
          placeholderTextColor="#00000080"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />

        <AppText style={styles.label}>Электронная почта</AppText>
        <TextInput
          style={styles.input}
          placeholder="Введите email"
          placeholderTextColor="#00000080"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <AppText style={styles.label}>Пароль</AppText>
        <View style={styles.input}>
          <TextInput
            style={{ width: "90%" }}
            placeholder="Введите пароль"
            secureTextEntry={hidden}
            placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
          />
          <TouchableOpacity
            onPress={() => setHidden(!hidden)}
            style={styles.icon}
          >
            <Ionicons
              name={hidden ? "eye-off-outline" : "eye-outline"}
              size={22}
              color="#666"
            />
          </TouchableOpacity>
        </View>

        <View
          style={styles.row}
        >
          <CheckBox initial={false} onChange={(val) => setAgree(val)} />
          <AppText>
            Я принимаю условия использования и политику конфиденциальности
          </AppText>
        </View>

        {error ? (
          <AppText style={styles.errorText}>{error}</AppText>
        ) : null}

        <TouchableOpacity
          style={[styles.submit, loading && { opacity: 0.7 }]}
          onPress={handleRegister}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <AppText style={styles.submitText}>Зарегистрироваться</AppText>
          )}
        </TouchableOpacity>

        <AppText style={styles.login}>
          Уже есть аккаунт?
          <AppText
            style={styles.loginNavigate}
            onPress={() => navigation.navigate("Login")}
          >
            {" "}
            Войти
          </AppText>
        </AppText>
      </ScrollView>
    </SafeAreaView>
  );
};

export const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#E7E8EA",
  },
  container: {
    paddingTop: 120,
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    marginBottom: 17,
  },
  label: {
    color: "#000",
    fontSize: 14,
    marginBottom: 6,
    marginTop: 20,
  },
  input: {
    height: 60,
    backgroundColor: "#fff",
    color: "#000",
    borderRadius: 100,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginVertical: 25,
  },
  submit: {
    backgroundColor: "#3083FF",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    height: 60,
  },
  submitText: {
    color: "#FEFEFE",
    fontSize: 16,
    fontWeight: "700",
  },
  login: {
    fontSize: 16,
    fontWeight: "500",
    color: "#2B2929",
    textAlign: "center",
    marginTop: 120,
  },
  loginNavigate: {
    color: "#0391D4",
  },
  forgot: {
    color: "#0391D4",
    fontSize: 16,
    marginTop: 8,
    textAlign: "right",
    marginBottom: 25,
  },
  account: {
    backgroundColor: "#fff",
    height: 54,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 12,
    marginBottom: 14,
  },
  errorText: {
    color: "#D52020",
    textAlign: "center",
  },
});
