import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppText from "../../components/AppText";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { forgotPassword } from "../../services/AuthService"; 

export const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const sendCode = async () => {
    if (!email.trim()) {
      setError("Ошибка", "Введите email");
      return;
    }

    try {
      setLoading(true);
      await forgotPassword(email);
      navigation.navigate("MailCode", { email });
    } 
    catch (e) {
      setError(e?.response?.data?.message || "Почта не найдена");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.next} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>

        <AppText style={styles.title}>Забыли пароль?</AppText>
        <AppText style={styles.subTitle}>
          Введите email, и мы пришлём код восстановления.
        </AppText>

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

{error ? (
          <AppText style={{ color: "red", marginTop: 8 }}>{error}</AppText>
        ) : null}
        <TouchableOpacity style={styles.submit} onPress={sendCode}>
          <AppText style={styles.submitText}>Отправить код</AppText>
        </TouchableOpacity>
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
    paddingTop: 17,
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  next: {
    width: 60,
    height: 60,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },
  title: {
    fontSize: 33,
    fontWeight: 700,
    marginTop: 152,
    marginBottom: 14,
    color: "#000",
  },
  subTitle: {
    fontSize: 18,
    color: "#000000B2",
    marginBottom: 42,
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
  submit: {
    backgroundColor: "#3083FF",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    height: 60,
    marginTop: 24,
  },
  submitText: {
    color: "#FEFEFE",
    fontSize: 16,
    fontWeight: 700,
  },
});
