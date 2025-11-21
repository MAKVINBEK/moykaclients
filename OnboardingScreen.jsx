import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Dimensions, ImageBackground } from "react-native";
import AppText from "./AppText";
import Logo from "./assets/images/svg/logo.svg";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const slides = [
  {
    id: "1",
    title: "Чистая машина в один клик",
    subtitle: "Забудьте про очереди. Мытьё и уход за авто прямо в вашем телефоне.",
    image: require("./assets/images/onbording1.png"),
  },
  {
    id: "2",
    title: "Ваша машина сияет",
    subtitle: "Оцените сервис и получайте бонусы за каждую мойку",
    image: require("./assets/images/onbording2.png"),
  },
];

export default function OnboardingScreen({ navigation }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { title, subtitle, image } = slides[currentIndex];

  const nextSlide = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigation.replace("Main");
    }
  };

  const skip = () => navigation.replace("Main");

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Logo />
          </View>
          <TouchableOpacity onPress={skip}>
            <AppText style={styles.skipText}>Пропустить</AppText>
          </TouchableOpacity>
        </View>

        {/* ImageBackground */}
        <ImageBackground
          source={image}
          style={styles.textContainer}
          imageStyle={{ borderRadius: 30 }}
        >
          <AppText style={styles.title}>{title}</AppText>
          <AppText style={styles.subtitle}>{subtitle}</AppText>
        </ImageBackground>

        {/* Button */}
        <TouchableOpacity style={styles.nextButton} onPress={nextSlide}>
          <AppText style={styles.nextText}>
            {currentIndex === slides.length - 1 ? "Начать" : "Далее"}
          </AppText>
          <View style={styles.arrowCircle}>
            <Feather name="arrow-right" size={16} color="#fff" />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#E7E8EA",
  },
  container: {
    paddingHorizontal: 16,
    flex: 1,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  skipText: {
    color: "#000",
    fontSize: 18,
  },
  textContainer: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 24,
    paddingVertical: 26,
  },
  title: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "700",
    marginBottom: 20,
  },
  subtitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "500",
  },
  nextButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 25,
    marginVertical: 17,
  },
  nextText: {
    color: "#0F141A",
    fontSize: 16,
    fontWeight: "600",
  },
  arrowCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
});
