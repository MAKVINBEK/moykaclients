// MailCode.jsx
import React, { useEffect, useRef, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppText from "../../AppText";
import { Ionicons } from "@expo/vector-icons";
import CodeInput from "../../ui/CodeInput";
import { forgotCode, sendCode, } from "../../AuthService";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const MailCode = ({ navigation, route }) => {
  const { email } = route.params || {};
  const CODE_LENGTH = 4;

  const [code, setCode] = useState("");
  const [seconds, setSeconds] = useState(60); // предполагаем, что код уже отправлен с предыдущего экрана
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState("");

  const mounted = useRef(false);
  const timerRef = useRef(null);

  useEffect(() => {
    mounted.current = true;
    startTimer();

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

  const formatSeconds = (s) => {
    const mm = Math.floor(s / 60)
      .toString()
      .padStart(2, "0");
    const ss = (s % 60).toString().padStart(2, "0");
    return `${mm}:${ss}`;
  };

  const handleResend = async () => {
    if (seconds > 0 || sending) return;
    try {
      setSending(true);
      setError("");
      await sendCode(email); // backend должен отправить код заново
      if (!mounted.current) return;
      startTimer();
    } catch (e) {
      if (!mounted.current) return;
      setError(e?.response?.data?.message || e?.message || "Не удалось отправить код");
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
      const res = await forgotCode(email, code); 
      if (!mounted.current) return;
    navigation.navigate("NewPassword", {reset_token:res.reset_token });
      
    } catch (e) {
      if (mounted.current) setVerifying(false);
      setError(e?.response?.data?.non_field_errors[0] || "Ошибка проверки");
    }finally{
      setVerifying(false);
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

        <AppText style={styles.title}>Пожалуйста, проверьте свою электронную почту</AppText>
        <AppText style={styles.subTitle}>Мы отправили код на {email}</AppText>

        <CodeInput
          length={CODE_LENGTH}
          size={78}
          fontsize={32}
          onCodeChange={(c) => {
            setCode(c);
            if (error) setError("");
          }}
        />

        <TouchableOpacity
          style={[styles.submit, verifying && { opacity: 0.7 }]}
          onPress={handleVerify}
          disabled={verifying}
        >
          {verifying ? <ActivityIndicator color="#fff" /> : <AppText style={styles.submitText}>Подтвердить</AppText>}
        </TouchableOpacity>

        <View style={{ alignItems: "center", marginTop: 34 }}>
          <TouchableOpacity
            onPress={handleResend}
            activeOpacity={seconds === 0 ? 0.7 : 1}
          >
            <AppText style={{ textAlign: "center", color: "#000000B2", fontSize: 16, fontWeight: 500 }}>
              {sending ? "Отправка..." : seconds > 0
                ? `Отправить код повторно ${formatSeconds(seconds)}`
                : "Отправить код повторно"}
            </AppText>
          </TouchableOpacity>
        </View>

        {error ? (
          <AppText style={{ color: "#D80027", textAlign: "center", marginTop: 12 }}>{error}</AppText>
        ) : null}
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
    fontSize: 30,
    fontWeight: "700",
    marginTop: 56,
    marginBottom: 13,
    color: "#000",
  },
  subTitle: {
    fontSize: 16,
    color: "#000000B2",
    marginBottom: 38,
  },
  submit: {
    backgroundColor: "#3083FF",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    height: 60,
    marginTop: 38,
  },
  submitText: {
    color: "#FEFEFE",
    fontSize: 16,
    fontWeight: "700",
  },
});
