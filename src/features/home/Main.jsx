import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import AppText from "../../components/AppText";
import Logo from "../../assets/images/svg/logo.svg";
import Notification from "../../assets/images/svg/notification.svg";
import Search from "../../assets/images/svg/search.svg";
import Settings from "../../assets/images/svg/settings.svg";
import { Menu } from "../../components/Menu";
import MapListScreen from "./MapListScreen";
import FilterBottomSheet from "./FilterBottomSheet";
import { getList } from "../../services/AuthService"; 
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

export const Main = ({ navigation }) => {
  const [focused, setFocused] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [points, setPoints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        setLoading(true);
        const res = await getList();
        if (!mounted) return;
        const normalized = (res || []).map((item) => ({
          ...item,
          img:
            typeof item.img === "string"
              ? { uri: item.img }
              : item.img || require("../../assets/images/image.png"),
        }));
        setPoints(normalized);
      } catch (e) {
        console.warn("getList error", e);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, []);

  const filteredPoints = !query
    ? points
    : points.filter((item) =>
        `${item.name} ${item.address}`
          .toLowerCase()
          .includes(query.toLowerCase())
      );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" backgroundColor={styles.safe.backgroundColor} />
      <View style={styles.header}>
        <Logo />
        <TouchableOpacity
          style={styles.notyfi}
          onPress={() => navigation.navigate("Notification")}
        >
          <Notification />
        </TouchableOpacity>
      </View>

      <View style={styles.header}>
        <View style={styles.search}>
          <Search />
          <TextInput
            style={styles.input}
            placeholder="Найти"
            placeholderTextColor="#000"
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onChangeText={setQuery}
            value={query}
          />
        </View>
        <TouchableOpacity
          style={styles.notyfi}
          onPress={() => setShowFilter(true)}
        >
          <Settings />
        </TouchableOpacity>
      </View>

      {focused ? (
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
        >
          {filteredPoints.map((item) => (
            <View key={item.id} style={styles.card}>
              <Image style={styles.logo} source={item.img} />
              <View style={{ flex: 1, marginLeft: 10 }}>
                <AppText style={styles.title}>{item.name}</AppText>
                <AppText style={styles.sub}>
                  {item.open_time} - {item.closing_time}
                </AppText>
                <AppText style={styles.sub}>{item.address}</AppText>
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
                <AppText style={styles.distance}>1.2 км</AppText>
              </View>
            </View>
          ))}
        </ScrollView>
      ) : (
        <MapListScreen points={points} />
      )}

      <Menu />
      <FilterBottomSheet
        visible={showFilter}
        onClose={() => setShowFilter(false)}
        onApply={(filters) => {
          setShowFilter(false);
        }}
      />
    </SafeAreaView>
  );
};

export const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    paddingHorizontal: 16,
  },
  container: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  notyfi: {
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  search: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 100,
    flex: 1,
    marginRight: 10,
  },
  input: {
    width: "96%",
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 100,
    paddingVertical: 10,
    paddingLeft: 10,
    paddingRight: 26,
    marginBottom: 10,
    shadowColor: "#959DA5",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 69,
    height: 69,
    borderRadius: 100,
    backgroundColor: "#000",
  },
  title: { fontSize: 20, fontWeight: "600" },
  sub: { fontSize: 14, color: "#A4A4A4", marginTop: 4 },

  rating: { color: "#FFcc02", fontWeight: "700", fontSize: 18 },
  distance: { fontWeight: 500, color: "#9EA9B7", marginTop: 24 },
});
