// home/MapListScreen.js
import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Animated,
  Image,
} from "react-native";
import AppText from "../../AppText";
import Categoty from "../../assets/images/svg/category.svg";
import CategotyLigh from "../../assets/images/svg/categotyLigh.svg";
import Vector from "../../assets/images/svg/vector.svg";
import VectorDark from "../../assets/images/svg/vectorDark.svg";
import { useNavigation } from "@react-navigation/native";
import MapScreen from "../screens/MapScreen";

const { width, height } = Dimensions.get("window");

const MapPlaceholder = ({ points = [] }) => (
  <View style={styles.mapPlaceholder}>
    <MapScreen
      points={points.map((p) => ({
        id: p.id,
        name: p.name || p.title,
        latitude: p.latitude != null ? Number(p.latitude) : undefined,
        longitude: p.longitude != null ? Number(p.longitude) : undefined,
      }))}
    />
  </View>
);

export default function MapListScreen({ points = [] }) {
  const [mode, setMode] = React.useState("list");  

  const anim = React.useRef(new Animated.Value(mode === "list" ? 1 : 0)).current;
  const navigation = useNavigation();

  React.useEffect(() => {
    Animated.timing(anim, {
      toValue: mode === "list" ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [mode, anim]);

  const listTranslateY = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [height, 0],
  });

  const mapOpacity = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  return (
    <View style={styles.safe}>
      <Animated.View style={[styles.mapContainer, { opacity: mapOpacity }]}>
        <MapPlaceholder points={points} />
      </Animated.View>

      <Animated.View
        style={[
          styles.animatedList,
          { transform: [{ translateY: listTranslateY }] },
        ]}
      >
        <ScrollView
          style={styles.listScroll}
          contentContainerStyle={{ paddingBottom: 140 }}
          showsVerticalScrollIndicator={false}
        >
          {points.map((item) => {
            return (
              <View key={item.id} style={styles.card}>
                <View style={styles.row}>
                  <Image style={styles.logo} source={item.img} />
                  <View style={{ flex: 1, marginLeft: 10 }}>
                    <AppText style={styles.title}>
                      {item.name}
                    </AppText>
                    <AppText style={styles.sub}>
                      {item.open_time} - {item.closing_time}
                    </AppText>
                    <AppText style={styles.sub}>
                      {item.address }
                    </AppText>
                  </View>

                  <View style={{ alignItems: "flex-end" }}>
                    <AppText style={styles.rating}>
                      ★{" "}
                      <AppText
                        style={{
                          color: "#2B2929",
                          fontSize: 14,
                          fontWeight: "600",
                        }}
                      >
                        {item.rating}
                      </AppText>
                    </AppText>
                    <AppText style={styles.distance}>
                      {item.distance || "1.2 км"}
                    </AppText>
                  </View>
                </View>

                <View style={styles.buttonsRow}>
                  <TouchableOpacity
                    style={styles.btnPrimary}
                    onPress={() => navigation.navigate("Recording")}
                  >
                    <AppText style={styles.btnPrimaryText}>Записаться</AppText>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.btnOutline}>
                    <AppText style={styles.btnOutlineText}>Маршрут</AppText>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </Animated.View>

      {/* Нижняя панель переключателя */}
      <View style={styles.bottomContainer}>
        <View style={styles.switchWrap}>
          <TouchableOpacity
            onPress={() => setMode("list")}
            style={[styles.switchBtn, mode === "list" ? styles.switchActive : null]}
          >
            {mode === "list" ? <CategotyLigh /> : <Categoty />}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setMode("map")}
            style={[
              styles.switchBtn,
              mode === "map" ? styles.switchActive : null,
              { marginLeft: 8 },
            ]}
          >
            {mode === "map" ? <Vector /> : <VectorDark />}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    height: height * 0.76,
  },
  // карта на весь экран
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "transparent",
    borderRadius: 30,
    overflow: "hidden",
  },
  mapPlaceholder: {
    flex: 1,
  },
  // анимированный список, поверх карты, с радиусом сверху
  animatedList: {
    position: "absolute",
    left: 0,
    right: 0,
    height: height * 0.785,
  },
  listScroll: {
    marginTop: 0,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
    shadowColor: "#959DA5",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 8,
  },
  row: { flexDirection: "row", alignItems: "center" },
  logo: {
    width: 69,
    height: 69,
    borderRadius: 100,
    backgroundColor: "#000",
  },
  title: { fontSize: 20, fontWeight: "600" },
  sub: { fontSize: 14, color: "#A4A4A4", marginTop: 4 },

  rating: { color: "#FFcc02", fontWeight: "700", fontSize: 18 },
  distance: { fontWeight: "500", color: "#9EA9B7", marginTop: 32 },

  buttonsRow: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btnPrimary: {
    flex: 1,
    backgroundColor: "#3083FF",
    paddingVertical: 10,
    borderRadius: 100,
    alignItems: "center",
    marginRight: 10,
  },
  btnPrimaryText: { color: "#fff", fontWeight: "700", fontSize: 16 },

  btnOutline: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#3083FF",
    paddingVertical: 10,
    borderRadius: 999,
    alignItems: "center",
    marginLeft: 8,
    backgroundColor: "#fff",
  },
  btnOutlineText: { color: "#3083FF", fontWeight: "700", fontSize: 16 },

  bottomContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  switchWrap: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 999,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
  },
  switchBtn: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  switchActive: {
    backgroundColor: "#1E90FF",
  },
});
