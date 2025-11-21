import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

export default function CheckBox({ initial = false, onChange }) {
  const [checked, setChecked] = useState(initial);

  const toggle = () => {
    const next = !checked;
    setChecked(next);
    onChange && onChange(next);
  };

  return (
    <TouchableOpacity onPress={toggle} activeOpacity={0.8} style={styles.touch}>
      <View style={[styles.box, checked && styles.boxChecked]}>
        {checked && <FontAwesome5 name="check" size={10} color="#fff" />}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  touch: {
    padding: 4, // увеличивает кликабельную область
  },
  box: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#C7C7CC",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  boxChecked: {
    backgroundColor: "#3083FF",
    borderColor: "#3083FF",
  },
});
