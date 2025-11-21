import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
  Dimensions,
  Animated,
  TextInput,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Menu } from "../Menu";
import AppText from "../../AppText";
import Document from "../../assets/images/svg/Document.svg";
import { StatusBar } from "expo-status-bar";
import Arrow from "../../assets/images/svg/arrow.svg";
import { getFaq, supportMessage } from "../../AuthService";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const FAQ_DATA = [
  {
    id: "1",
    q: "Как работает подписка?",
    a:
      "Подписка позволяет пользоваться мойками без дополнительной оплаты за каждую услугу. " +
      "Просто приезжайте и показывайте активную подписку в приложении.",
  },
  {
    id: "2",
    q: "Можно ли вернуть деньги за подписку?",
    a: "Да, в течение 14 дней при соблюдении условий возврата.",
  },
  {
    id: "3",
    q: "Как изменить данные автомобиля?",
    a: "Перейдите в Профиль → Мои автомобили → Редактировать.",
  },
  {
    id: "4",
    q: "Как записаться на мойку?",
    a: 'Найдите ближайшую мойку на карте и нажмите "Записаться".',
  },
];

export default function SupportCenter({ navigation }) {
  const [selectedTab, setSelectedTab] = useState("FAQ");
  const [openId, setOpenId] = useState(null);

  const [segmentWidth, setSegmentWidth] = useState(width - 32);

  const anim = useRef(
    new Animated.Value(selectedTab === "FAQ" ? 1 : 0)
  ).current;

  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");
  

  const handleSend = async () => {

    const tok = await AsyncStorage.getItem("access");
    console.log("TOKEN >>>", tok);

    try {
      const payload = {
        subject: topic,
        message: message,
      };

      await supportMessage(payload);
     
      setTopic("")
      setMessage("")
    } catch (e) {
      console.log(e, "Не удалось отправить");
    }

  };

  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await getFaq();
        setResponse(res);
        console.log(res);
      } catch (e) {
        console.warn(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  useEffect(() => {
    setOpenId(null);
  }, [selectedTab]);

  const toggleItem = (id) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpenId((prev) => (prev === id ? null : id));
  };

  const toggleTab = (tab) => {
    Animated.spring(anim, {
      toValue: tab === "FAQ" ? 1 : 0,
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
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.next}
          onPress={() => navigation.goBack()}
        >
          <Arrow />
        </TouchableOpacity>
        <AppText style={styles.title}>Центр поддержки</AppText>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
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
              onPress={() => toggleTab("Обратная связь")}
            >
              <Text
                style={[
                  styles.segmentText,
                  selectedTab === "Обратная связь" &&
                    styles.segmentTextSelected,
                ]}
              >
                Обратная связь
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.segmentItem}
              onPress={() => toggleTab("FAQ")}
            >
              <Text
                style={[
                  styles.segmentText,
                  selectedTab === "FAQ" && styles.segmentTextSelected,
                ]}
              >
                FAQ
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ height: 20 }} />

        {selectedTab === "FAQ" && (
          <View style={styles.list}>
            {response.map((item) => {
              const open = openId === item.id;
              return (
                <View key={item.id} style={styles.cardWrap}>
                  <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={() => toggleItem(item.id)}
                    style={styles.cardHeader}
                  >
                    <Text style={styles.question}>{item.question}</Text>
                    <View
                      style={[styles.caret, open ? styles.caretOpen : null]}
                    >
                      <Arrow />
                    </View>
                  </TouchableOpacity>
                  {open && (
                    <View style={styles.cardBody}>
                      <Text style={styles.answer}>{item.answer}</Text>
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        )}

        {selectedTab === "Обратная связь" && (
          <View style={styles.feedbackBox}>
            <AppText style={styles.label}>Тема</AppText>
            <TextInput
              style={[styles.input, { height: 60 }]}
              placeholder="Вопрос по подписке"
              placeholderTextColor="#9EA9B7"
              value={topic}
              onChangeText={setTopic}
            />
            <AppText style={styles.label}>Сообщение</AppText>
            <TextInput
              style={[styles.input, { height: 166 }]}
              placeholder="Опишите вашу проблему или предложение…"
              placeholderTextColor="#9EA9B7"
              value={message}
              onChangeText={setMessage}
              multiline
            />

            <TouchableOpacity style={styles.button} onPress={handleSend}>
              <AppText style={styles.buttonText}>Отправить</AppText>
            </TouchableOpacity>
          </View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
      <TouchableOpacity style={styles.instruction}>
        <Document />
        <AppText style={{ fontSize: 16 }}>Инструкция</AppText>
      </TouchableOpacity>

      <Menu />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#E7E8EA",
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 16,
  },
  next: {
    width: 60,
    height: 60,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    gap: 18,
    borderRadius: 100,
  },
  title: {
    color: "#2B2929",
    fontSize: 20,
    fontWeight: 700,
  },

  container: {
    paddingTop: 16,
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

  label: {
    color: "#2B2929",
    marginBottom: 6,
  },
  input: {
    borderRadius: 30,
    backgroundColor: "#fff",
    padding: 20,
    fontSize: 16,
    marginBottom: 20,
    textAlignVertical: "top",
  },
  button: {
    flex: 1,
    height: 60,
    borderRadius: 100,
    backgroundColor: "#3083FF",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 600,
    color: "#fff",
  },

  cardWrap: {
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 30,
    padding: 20,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  question: {
    fontSize: 16,
    fontWeight: 500,
    flex: 1,
    paddingRight: 10,
  },
  caret: {
    transform: [{ rotate: "-90deg" }],
  },
  caretOpen: {
    transform: [{ rotate: "90deg" }],
  },

  cardBody: {
    backgroundColor: "#ffffff",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginTop: 10,
  },
  answer: {
    color: "#9EA9B7",
    fontSize: 15,
  },

  instruction: {
    position: "absolute",
    backgroundColor: "#fff",
    borderRadius: 100,
    height: 60,
    width: "100%",
    bottom: 108,
    left: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 13,
  },
});
