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
import { newPassword } from "../../services/AuthService"; 
import { StatusBar } from "expo-status-bar";

export const NewPassword = ({ navigation, route }) => {
  const {reset_token} = route.params;

  const [hidden, setHidden] = useState(true);
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    if (password !== confirm_password) {
      setError("Пароли не совпадают");
      return;
    }
    try {
      setLoading(true);
      const res = await newPassword(reset_token, password, confirm_password);
      setLoading(false);

      navigation.navigate("PasswordUpdated");
    } catch (e) {
      setLoading(false);
      setError(e?.response?.data?.error || e?.response?.data?.message || "Ошибка сброса");
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" backgroundColor={styles.safe.backgroundColor} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View>
          <TouchableOpacity style={styles.next} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        <AppText style={styles.title}>Сбросить пароль</AppText>
        <AppText style={styles.subTitle}>Пожалуйста, придумайте новый пароль.</AppText>

        <AppText style={styles.label}>Новый пароль</AppText>
        <View style={styles.input}>
          <TextInput
            style={{ width: "90%" }}
            placeholder="Введите пароль"
            secureTextEntry={hidden}
            placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
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

        <AppText style={styles.label}>Подтвердите пароль</AppText>
        <View style={styles.input}>
          <TextInput
            style={{ width: "90%" }}
            placeholder="Повторите пароль"
            secureTextEntry={hidden}
            placeholderTextColor="#999"
            value={confirm_password}
            onChangeText={setConfirm}
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

        {error ? (
          <AppText style={{ color: "red", marginTop: 12, textAlign: "center" }}>
            {error}
          </AppText>
        ) : null}

        <TouchableOpacity
          style={[styles.submit, loading && { opacity: 0.7 }]}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <AppText style={styles.submitText}>Подтвердить</AppText>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#E7E8EA" },
  container: { paddingHorizontal: 16, paddingBottom: 20 },
  next: { width: 60, height: 60, backgroundColor: "#fff", alignItems: "center", justifyContent: "center", borderRadius: 100 },
  title: { fontSize: 30, fontWeight: "700", marginBottom: 14, marginTop: 95 },
  subTitle: { fontSize: 18, color: "#000000B2", marginBottom: 34 },
  label: { color: "#000", fontSize: 14, marginBottom: 6, marginTop: 20 },
  input: { height: 60, backgroundColor: "#fff", borderRadius: 100, paddingHorizontal: 16, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  submit: { backgroundColor: "#3083FF", alignItems: "center", justifyContent: "center", borderRadius: 100, height: 60, marginTop: 42 },
  submitText: { color: "#FEFEFE", fontSize: 16, fontWeight: "700" },
  icon: { padding: 8 },
});
