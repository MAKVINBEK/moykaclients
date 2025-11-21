// ConfirmNumber.jsx
import React, { useEffect, useState, useRef } from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppText from "../../AppText";
import { Ionicons } from "@expo/vector-icons";
import CodeInput from "../../ui/CodeInput";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { sendCode, verifyCode } from "../../AuthService";
import { saveTokens } from "../../Api";

export const ConfirmNumber = ({ navigation, route }) => {
  const { data, alreadySent = true } = route.params || {};
  const phone = data?.phone;
  const email = data?.email;

  const [seconds, setSeconds] = useState(alreadySent ? 60 : 0);
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState("");
  const [code, setCode] = useState(""); // строка кода, обновляет CodeInput via onCodeChange

  const mounted = useRef(false);
  const timerRef = useRef(null);
  const CODE_LENGTH = 5;

  useEffect(() => {
    mounted.current = true;
    if (alreadySent) startTimer();

    return () => {
      mounted.current = false;
      clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startTimer = () => {
    clearInterval(timerRef.current);
    setSeconds(60);
    timerRef.current = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
  };

  const sendSms = async () => {
    try {
      setSending(true);
      setError("");
      await sendCode(email); 
      if (!mounted.current) return;
      startTimer();
    } catch (e) {
      if (!mounted.current) return;
      setError( "Не удалось отправить код");
    } finally {
      if (mounted.current) setSending(false);
    }
  };

  const handleVerify = async () => {
    setError("");
  
    if (code.length !== CODE_LENGTH) {
      setError("Введите полный код");
      return;
    }
  
    try {
      setVerifying(true);
      const res = await verifyCode(email, code);
      setVerifying(false);
  
      const access =
        res.access ||
        null;
  
      const refresh =
        res.refresh ||
        null;
  
      if (access) {
        await saveTokens(access, refresh ?? undefined);
  
        navigation.reset({ index: 0, routes: [{ name: "Main" }] });
        return;
      }
  
      setError("Токен не получен");
    } catch (e) {
      setVerifying(false);
      setError( "Ошибка проверк");
    }
  };
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View>
          <TouchableOpacity style={styles.next} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        <AppText style={styles.title}>Подтвердите свой номер телефона</AppText>
        <AppText style={styles.subTitle}>
          Мы отправили SMS с кодом активации на ваш телефон {phone}
        </AppText>

        <CodeInput
          length={CODE_LENGTH}
          size={64}
          fontsize={24}
          onCodeChange={(c) => {
            setCode(c);
            if (error) setError("");
          }}
        />

        <View style={{ alignItems: "center", marginTop: 52, marginBottom: 30 }}>
  <TouchableOpacity
    onPress={seconds === 0 ? sendSms : null}
    activeOpacity={seconds === 0 ? 0.6 : 1}
  >
    <AppText style={{ fontSize: 16, color: "#000000B2" }}>
      Не пришёл код?{" "}
      {seconds > 0 ? (
        <AppText style={{ fontSize: 16, color: "#000", fontWeight: 600 }}>
          Отправить снова через {seconds} сек.
        </AppText>
      ) : (
        <AppText style={{ fontSize: 16, color: "#000", fontWeight: 600 }}>
          Отправить снова
        </AppText>
      )}
    </AppText>
  </TouchableOpacity>
</View>

        {error ? (
          <AppText style={{ color: "#D80027", textAlign: "center", marginBottom: 12 }}>{error}</AppText>
        ) : null}

        <TouchableOpacity
          style={[styles.submit, verifying && { opacity: 0.7 }]}
          onPress={handleVerify}
          disabled={verifying}
        >
          {verifying ? <ActivityIndicator color="#fff" /> : <AppText style={styles.submitText}>Подтвердить</AppText>}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#E7E8EA" },
  container: { paddingTop: 17, paddingHorizontal: 16, paddingBottom: 20 },
  next: {
    width: 60,
    height: 60,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },
  title: { fontSize: 30, fontWeight: "700", textAlign: "center", marginTop: 56, marginBottom: 13, color: "#000" },
  subTitle: { fontSize: 16, color: "#000000B2", textAlign: "center", marginBottom: 35 },
  submit: {
    backgroundColor: "#3083FF",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    height: 60,
  },
  submitText: { color: "#FEFEFE", fontSize: 16, fontWeight: "700" },
});
