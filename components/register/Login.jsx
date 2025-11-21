import {
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppText from "../../AppText";
import { useState } from "react";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { styles } from "./Register";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginUser } from "../../AuthService";
import Google from "../../assets/images/svg/googleLogo.svg";
      import Message from "../../assets/images/svg/Message.svg";

export const Login = ({ navigation }) => {
  const [hidden, setHidden] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onLogin = async () => {
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Заполните все поля");
      return;
    }

    try {
      setLoading(true);
      const res = await loginUser(email, password);

      navigation.reset({ index: 0, routes: [{ name: "Main" }] });
    } catch (e) {
      setError(e?.response?.data?.message ||e?.response?.data?.non_field_errors|| "Неверный логин или пароль");
    } finally {
      setLoading(false);
    }
  };
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <AppText style={styles.title} >
          Войти в аккаунт
        </AppText>
        <AppText style={styles.label}>Электронная почта</AppText>
        <TextInput
          style={styles.input}
          placeholder="Введите email"
          placeholderTextColor="#00000080"
          value={email}
          onChangeText={setEmail}
        />
        <AppText style={styles.label}>Пароль</AppText>
        <View style={[styles.input,{paddingLeft:0,}]}>
        <TextInput
          style={styles.input}
          placeholder="Введите пароль"
          placeholderTextColor="#00000080"
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
        <AppText style={styles.forgot} onPress={()=>navigation.navigate("ForgotPassword")}>Забыли пароль?</AppText>
        {error ? (
          <AppText style={{ color: "red", marginBottom: 8 }}>{error}</AppText>
        ) : null}
        <TouchableOpacity
          style={[styles.submit, loading && { opacity: 0.7 }]}
          onPress={onLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <AppText style={styles.submitText}>Войти</AppText>
          )}
        </TouchableOpacity>
        <AppText style={{ textAlign: "center", marginTop: 23 ,marginBottom:15,}}>
          Или войдите через
        </AppText>
        <View style={styles.account}>
          <Google />
          <AppText style={styles.accountText}>Sign in with Google</AppText>
        </View>
        <View style={styles.account}>
          <AntDesign name="apple" size={24} color="black" />
          <AppText style={styles.accountText}>Sign in with Apple</AppText>
        </View>
        <View style={styles.account}>
          <Message name="apple" size={24} color="black" />
          <AppText style={styles.accountText}>Sign in with Email</AppText>
        </View>
        <AppText style={styles.login}>
          Нет аккаунта?{" "}
          <AppText
            style={styles.loginNavigate}
            onPress={() => navigation.navigate("Register")}
          >
            Зарегистрироваться
          </AppText>
        </AppText>
      </ScrollView>
    </SafeAreaView>
  );
};
