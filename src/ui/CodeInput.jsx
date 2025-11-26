import React, { useEffect, useRef, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Animated,
  Vibration,
} from "react-native";
import AppText from "../components/AppText";

export default function CodeInput({
  length = 4,
  size = 65,
  fontsize = 24,
  onCodeChange, 
}) {
  const [code, setCode] = useState(Array(length).fill(""));
  const [error, setError] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const inputs = useRef([]);

  useEffect(() => {
    const t = setTimeout(() => inputs.current[0]?.focus(), 250);
    return () => clearTimeout(t);
  }, []);

  const triggerError = () => {
    setError(true);
    Vibration.vibrate(80);
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 6, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start();

    setTimeout(() => {
      setCode(Array(length).fill(""));
      setError(false);
      setActiveIndex(0);
      inputs.current[0]?.focus();
      onCodeChange && onCodeChange("");
    }, 700);
  };

  const handleChange = (text, index) => {
    if (text.length > 1) return;
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);
    const joined = newCode.join("");
    onCodeChange && onCodeChange(joined);

    if (text && index < length - 1) {
      setActiveIndex(index + 1);
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = ({ nativeEvent }, index) => {
    if (nativeEvent.key === "Backspace") {
      if (code[index]) {
        const newCode = [...code];
        newCode[index] = "";
        setCode(newCode);
        onCodeChange && onCodeChange(newCode.join(""));
      } else if (index > 0) {
        inputs.current[index - 1]?.focus();
        setActiveIndex(index - 1);
        const newCode = [...code];
        newCode[index - 1] = "";
        setCode(newCode);
        onCodeChange && onCodeChange(newCode.join(""));
      }
    }
  };

  return (
    <View style={styles.wrapper}>
      <Animated.View style={[styles.codeContainer, { transform: [{ translateX: shakeAnim }] }]}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputs.current[index] = ref)}
            value={digit}
            onChangeText={(t) => handleChange(t, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            keyboardType="number-pad"
            maxLength={1}
            style={[
              styles.input,
              activeIndex === index && !error && { borderColor: "#000" },
              error && { borderColor: "#D80027" },
              { maxWidth: size, height: size, fontSize: fontsize },
            ]}
            onFocus={() => setActiveIndex(index)}
            autoFocus={index === 0}
          />
        ))}
      </Animated.View>

      {error && (
        <View style={styles.errorContainer}>
          <AppText style={styles.errorText}>Неправильный код</AppText>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { justifyContent: "center" },
  codeContainer: { flexDirection: "row", justifyContent: "center", gap: 9 },
  input: {
    flex: 1,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#D8DADC",
    backgroundColor: "#fff",
    color: "#000",
    textAlign: "center",
  },
  errorContainer: { flexDirection: "row", alignItems: "center", marginTop: 8, gap: 5, justifyContent: "center" },
  errorText: { color: "#D80027", fontSize: 13 },
});
