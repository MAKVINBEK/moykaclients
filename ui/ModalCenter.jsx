import React, { useRef, useEffect } from "react";
import {
  View,
  Modal,
  Animated,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
  Easing,
  TouchableOpacity
} from "react-native";

const { width } = Dimensions.get("window");

const ModalCenter = ({ visible, onClose, children }) => {
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const openAnim = Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 300,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: false,
      }),
    ]);

    const closeAnim = Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 200,
        easing: Easing.in(Easing.exp),
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }),
    ]);

    if (visible) openAnim.start();
    else closeAnim.start();
  }, [visible]);

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      statusBarTranslucent
    >
      <View style={styles.centerContainer}>
        <TouchableWithoutFeedback onPress={onClose}>
          <Animated.View style={[styles.overlay, ]} />
        </TouchableWithoutFeedback>

        <Animated.View
          style={[styles.container, { transform: [{ scale: scaleAnim }] }]}
        >
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#00000066",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  container: {
    backgroundColor: "#fff",
    borderRadius: 30,
    paddingHorizontal: 14,
    paddingTop: 26,
    paddingBottom: 20,
    width: "100%",
    shadowColor: "#959DA5",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 8,
  },
});

export default ModalCenter;