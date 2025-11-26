// OnboardingScreen.js
import React, { useRef, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Animated,
  PanResponder,
  TouchableWithoutFeedback,
  Easing,
} from "react-native";
import AppText from "./AppText";
import Logo from "./assets/images/svg/logo.svg";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import Arrow from "./assets/images/svg/arrowarrow.svg"

const { width: SCREEN_W } = Dimensions.get("window");

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
    subtitle: "Оцените сервис и получайте бонусы за каждую мойки",
    image: require("./assets/images/onbording2.png"),
  },
];

export default function OnboardingScreen({ navigation }) {
  const [index, setIndex] = useState(0);
  const slide = slides[Math.min(index, slides.length - 1)];

  const [btnWidth, setBtnWidth] = useState(Math.round(SCREEN_W * 0.82));
  const CIRCLE_SIZE = 56;
  const PADDING = 14;
  const maxDrag = btnWidth - CIRCLE_SIZE - PADDING * 2; 
  const TRIGGER = Math.round(maxDrag * 0.6); 

  const translateX = useRef(new Animated.Value(0)).current;
  const circleScale = useRef(new Animated.Value(1)).current; 
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    translateX.setValue(0);
    progress.setValue(0);
  }, [index, translateX, progress]);

  const pan = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, g) => Math.abs(g.dx) > 4,
      onPanResponderGrant: () => {
        Animated.spring(circleScale, { toValue: 0.96, useNativeDriver: true }).start();
      },
      onPanResponderMove: (_, g) => {
        const dx = Math.max(0, Math.min(g.dx, maxDrag));
        translateX.setValue(dx);
        progress.setValue(dx / maxDrag);
      },
      onPanResponderRelease: (_, g) => {
        Animated.spring(circleScale, { toValue: 1, useNativeDriver: true }).start();
        const finalDx = Math.max(0, Math.min(g.dx, maxDrag));
        if (finalDx >= TRIGGER) {
          Animated.parallel([
            Animated.timing(translateX, {
              toValue: maxDrag,
              duration: 160,
              easing: Easing.out(Easing.quad),
              useNativeDriver: true,
            }),
            Animated.timing(progress, {
              toValue: 1,
              duration: 160,
              useNativeDriver: false,
            }),
          ]).start(() => {
            goNext();
          });
        } else {
          Animated.parallel([
            Animated.spring(translateX, { toValue: 0, useNativeDriver: true, bounciness: 10 }),
            Animated.timing(progress, { toValue: 0, duration: 220, useNativeDriver: false }),
          ]).start();
        }
      },
    })
  ).current;

  const goNext = () => {
    if (index < slides.length - 1) setIndex((s) => s + 1);
    else navigation.replace("Main");
  };

  const onCirclePress = () => {
    Animated.sequence([
      Animated.timing(circleScale, { toValue: 0.9, duration: 90, useNativeDriver: true }),
      Animated.timing(circleScale, { toValue: 1, duration: 120, useNativeDriver: true }),
      Animated.timing(translateX, {
        toValue: maxDrag,
        duration: 200,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(progress, { toValue: 1, duration: 200, useNativeDriver: false }),
    ]).start(goNext);
  };

  const progressWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, btnWidth],
  });

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Logo />
          </View>
          <Animated.Text style={styles.skipText} onPress={() => navigation.replace("Main")}>
            Пропустить
          </Animated.Text>
        </View>

        <ImageBackground source={slide?.image} style={styles.imageBg} imageStyle={styles.imageStyle}>
          <View style={styles.textWrap}>
            <Animated.Text style={styles.title}>{slide?.title}</Animated.Text>
            <Animated.Text style={styles.subtitle}>{slide?.subtitle}</Animated.Text>
          </View>
        </ImageBackground>

        <View
          style={styles.footer}
          onLayout={(e) => {
            const w = Math.round(e.nativeEvent.layout.width || SCREEN_W * 0.82);
            setBtnWidth(w);
          }}
        >
          <View style={[styles.buttonShell, { width: btnWidth }]}>
            <Animated.View style={[styles.progressFill, { width: progressWidth }]} />

            {/* text centered */}
            <View style={styles.centerText}>
              <AppText style={styles.nextText}>{index === slides.length - 1 ? "Далее" : "Далее"}</AppText>
            </View>

            <Animated.View
              style={[
                styles.circleWrapper,
                {
                  transform: [{ translateX }, { scale: circleScale }],
                },
              ]}
              {...pan.panHandlers}
            >
              <TouchableWithoutFeedback onPress={onCirclePress}>
                <Animated.View style={styles.circle}>
                  <Feather name="arrow-right" size={20} color="#fff" />
                </Animated.View>
              </TouchableWithoutFeedback>
            </Animated.View>

            <View style={styles.rightChevron}>
              <Arrow/>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#E7E8EA" },
  container: { paddingHorizontal: 16, flex: 1 },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 6,
  },
  logoContainer: { paddingVertical: 8 },
  skipText: { color: "#000", fontSize: 16 },
  imageBg: {
    flex: 1,
    marginTop: 12,
    borderRadius: 24,
    overflow: "hidden",
    justifyContent: "flex-end",
  },
  imageStyle: { borderRadius: 24 },
  textWrap: { paddingHorizontal: 24, paddingVertical: 28 },
  title: { color: "#fff", fontSize: 34, fontWeight: "700", marginBottom: 10 },
  subtitle: { color: "#fff", fontSize: 16, fontWeight: "500" },
  footer: { paddingVertical: 16, alignItems: "center" },

  buttonShell: {
    height: 72,
    borderRadius: 42,
    backgroundColor: "#fff",
    overflow: "hidden",
    justifyContent: "center",
  },
  progressFill: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "#e6f0ff",
  },
  centerText: {
    position: "absolute",
    left: 90,
    right: 0,
  },
  nextText: {
    color: "#0F141A",
    fontSize: 20,
    fontWeight: "600",
  },

  circleWrapper: {
    position: "absolute",
    left: 12,
    top: 8,
    bottom: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#2F86FF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#2F86FF",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.14,
    shadowRadius: 20,
    elevation: 6,
  },

  rightChevron: {
    position: "absolute",
    right: 18,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});
