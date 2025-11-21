import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
  UIManager,
  Animated,
  LayoutAnimation,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "../../assets/images/svg/logo.svg";
import Notification from "../../assets/images/svg/notification.svg";
import { Menu } from "../Menu";
import AppText from "../../AppText";
import { StatusBar } from "expo-status-bar";
import Calendar from "../../ui/Calendar";
import Send from "../../assets/images/svg/Send.svg";
import Calendars from "../../assets/images/svg/Calendar.svg";
import Time from "../../assets/images/svg/time.svg";
import Car from "../../assets/images/svg/car.svg";
import { useEffect, useRef, useState } from "react";
import { DATAs } from "../profile/MyNotes";

const { width } = Dimensions.get("window");

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export const History = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTab, setSelectedTab] = useState("Архив");
  const [openId, setOpenId] = useState(null);

  const [segmentWidth, setSegmentWidth] = useState(width - 32);

  const anim = useRef(
    new Animated.Value(selectedTab === "Будущие" ? 1 : 0)
  ).current;

  useEffect(() => {
    setOpenId(null);
  }, [selectedTab]);

  const toggleItem = (id) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpenId((prev) => (prev === id ? null : id));
  };

  const toggleTab = (tab) => {
    Animated.spring(anim, {
      toValue: tab === "Будущие" ? 1 : 0,
      useNativeDriver: false,
      friction: 8,
      tension: 60,
    }).start();

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSelectedTab(tab);
  };

  const half = segmentWidth / 2 - 2;
  const activeWidth = half - 4;

  const translateX = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, half],
  });

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
      <ScrollView  contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <View style={styles.row}>
            <View style={{ flexDirection: "row", gap: 6 }}>
              <Image
                style={styles.logo}
                source={require("../../assets/images/image.png")}
              />
              <View>
                <AppText
                  style={{ fontSize: 18, fontWeight: 500, marginBottom: 4 }}
                >
                  Rash
                </AppText>
                <AppText
                  style={{ fontSize: 14, fontWeight: 500, color: "#9EA9B7" }}
                >
                  ​Улица Панфилова, 106, Бишкек
                </AppText>
              </View>
            </View>
            <View style={styles.send}>
              <Send />
            </View>
          </View>
          <View style={styles.flex}>
            <View style={styles.miniBlock}>
              <View style={styles.icons}>
                <Calendars />
              </View>
              <AppText style={styles.text}>25.09.25</AppText>
            </View>
            <View style={styles.miniBlock}>
              <View style={styles.icons}>
                <Time />
              </View>
              <AppText style={styles.text}>20:00</AppText>
            </View>
            <View style={styles.miniBlock}>
              <View style={styles.icons}>
                <Car />
              </View>
              <AppText style={styles.text}>20 min</AppText>
            </View>
          </View>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <TouchableOpacity style={styles.button}>
              <AppText style={{ fontSize: 16, fontWeight: 600 }}>
                Отменить
              </AppText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate("TransferEntry")}>
              <AppText style={{ fontSize: 16, fontWeight: 600 }}>
                Перенести
              </AppText>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.box}>
          <Calendar
            selectedDate={selectedDate}
            onSelectDate={(d) => setSelectedDate(d)}
          />
        </View>
        <View style={styles.segmentWrap}>
          <View
            style={styles.segmentOuter}
            onLayout={(e) => {
              const w = e.nativeEvent.layout.width;
              if (w && w !== segmentWidth) setSegmentWidth(w);
            }}
          >
            <Animated.View
              pointerEvents="none"
              style={[
                styles.activeBg,
                {
                  width: activeWidth,
                  transform: [{ translateX }],
                },
              ]}
            />

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.segmentItem}
              onPress={() => toggleTab("Архив")}
            >
              <AppText
                style={[
                  styles.segmentText,
                  selectedTab === "Архив" && styles.segmentTextSelected,
                ]}
              >
                Архив
              </AppText>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.segmentItem}
              onPress={() => toggleTab("Будущие")}
            >
              <AppText
                style={[
                  styles.segmentText,
                  selectedTab === "Будущие" && styles.segmentTextSelected,
                ]}
              >
                Будущие
              </AppText>
            </TouchableOpacity>
          </View>
        </View>
        {DATAs.map((item) => (
          <View key={item.id} style={styles.cards}>
            <Image
              style={styles.logo}
              source={require("../../assets/images/image.png")}
            />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <AppText style={styles.title}>{item.title}</AppText>
              <AppText style={styles.sub}>{item.address}</AppText>
            </View>

            <View style={{ alignItems: "flex-end" }}>
              <AppText style={styles.rating}>{item.time}</AppText>
              <AppText style={styles.sub}>{item.data}</AppText>
            </View>
          </View>
        ))}
      </ScrollView>
      <Menu />
    </SafeAreaView>
  );
};

export const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#E7E8EA",
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
    marginTop: 10,
  },
  notyfi: {
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    padding: 10,
    borderRadius: 30,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f5f5f5",
    padding: 4,
    borderRadius: 100,
  },
  logo: {
    width: 52,
    height: 52,
    borderRadius: 100,
  },
  send: {
    width: 52,
    height: 52,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3083FF",
  },
  box: {
    borderRadius: 30,
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 10,
  },
  flex: {
    flexDirection: "row",
    gap: 10,
    marginVertical: 10,
  },
  miniBlock: {
    backgroundColor: "#f5f5f5",
    borderRadius: 100,
    padding: 4,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    flex: 1,
  },
  icons: {
    width: 36,
    height: 36,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  text: {
    color: "#2B2929",
    fontSize: 16,
    fontWeight: 500,
  },
  button: {
    height: 52,
    flex: 1,
    borderRadius: 100,
    borderColor: "#a8a8a8",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  segmentOuter: {
    width: width - 32,
    height: 60,
    backgroundColor: "#FFFFFF",
    borderRadius: 100,
    padding: 4,
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "space-between",
    overflow: "hidden",
    marginBottom:10,
  },
  activeBg: {
    position: "absolute",
    top: 4,
    left: 4,
    height: 52,
    backgroundColor: "#007BFF",
    borderRadius: 100,
    zIndex: 1,
  },
  segmentItem: {
    flex: 1,
    height: 52,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  segmentText: {
    fontSize: 16,
    color: "#000",
  },
  segmentTextSelected: {
    color: "#fff",
    fontSize: 16,
  },
  cards: {
    backgroundColor: "#fff",
    borderRadius: 100,
    paddingVertical: 10,
    paddingLeft:10,
    paddingRight:26,
    marginBottom: 10,
    flexDirection: "row", alignItems: "center" 
  },
  logo: {
    width: 52,
    height: 52,
    borderRadius: 100,
  },
  title: { fontSize: 18, fontWeight: "600" },
  sub: { fontWeight:500, color: "#9EA9B7", marginTop: 6 },

  rating: { color: "#2B2929", fontWeight: 500, fontSize: 16 },
});
