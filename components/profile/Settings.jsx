import { ScrollView, StyleSheet, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Menu } from "../Menu";
import AppText from "../../AppText";
import { StatusBar } from "expo-status-bar";
import Arrow from "../../assets/images/svg/arrow.svg";
import Arroww from "../../assets/images/svg/arrowarrow.svg";
import Notify from "../../assets/images/svg/notification.svg";
import Language from "../../assets/images/svg/language.svg";
import Delet from "../../assets/images/svg/delete.svg";
import Logout from "../../assets/images/svg/logout.svg";
import SwitchToggle from "../../ui/SwitchToggle";
import { useState } from "react";
import ModalCenter from "../../ui/ModalCenter";
import { deleteAccount, logoutUser } from "../../AuthService";

export const Settings = ({ navigation }) => {
  const [isNotifications, setNotifications] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);

  const handleLogout = async () => {
    await logoutUser();
    navigation.reset({ index: 0, routes: [{ name: "Login" }] });
  };

  const handleDelete = async () => {
    try {
      await deleteAccount();
      await logoutUser();
      navigation.reset({ index: 0, routes: [{ name: "Login" }] });
    } catch (e) {
      console.log("DELETE ERROR:", e.response?.data || e);
    }
  };
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
        <AppText style={styles.title}>Настройки</AppText>
        <View style={{ width: 60 }} />
      </View>
      <View style={styles.container}>
        <View>
          <View style={styles.page}>
            <View style={styles.icon}>
              <Notify />
            </View>
            <AppText style={styles.text}>Уведомления</AppText>
            <View style={styles.arrow}>
              <SwitchToggle
                value={isNotifications}
                onValueChange={setNotifications}
              />
            </View>
          </View>
          <TouchableOpacity style={styles.page}>
            <View style={styles.icon}>
              <Language />
            </View>
            <AppText style={styles.text}>Язык</AppText>
            <View style={styles.arrow}>
              <AppText style={styles.lagu}>Русский</AppText>
              <Arrow style={{ transform: [{ rotate: "-90deg" }] }} />
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={styles.page}
            onPress={() => setShowModal1(true)}
          >
            <View style={[styles.icon, { backgroundColor: "#3083FF" }]}>
              <Logout />
            </View>
            <AppText style={styles.text}>Выйти с аккаунта</AppText>
            <View style={styles.arrow}>
              <Arroww />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.page}
            onPress={() => setShowModal2(true)}
          >
            <View style={[styles.icon, { backgroundColor: "#E64646" }]}>
              <Delet />
            </View>
            <AppText style={styles.text}>Удалить аккаунт</AppText>
            <View style={styles.arrow}>
              <Arroww />
            </View>
          </TouchableOpacity>
          <AppText style={{ color: "#2B2929", fontWeight: 500 }}>
            При удалении аккаунта ваша подписка будет аннулирована ⚠️
          </AppText>
        </View>
      </View>
      {showModal1 && (
        <ModalCenter onClose={() => setShowModal1(false)}>
          <AppText
            style={{
              fontSize: 20,
              fontWeight: 600,
              color: "#131313",
              textAlign: "center",
              marginBottom: 10,
            }}
          >
            Выйти с аккаунта?
          </AppText>
          <AppText
            style={{ fontSize: 16, color: "#9EA9B7", textAlign: "center" }}
          >
            Вам придется повторно выполнить авторизацию
          </AppText>
          <TouchableOpacity
            style={{
              backgroundColor: "#E64646",
              paddingHorizontal: 20,
              height: 60,
              borderRadius: 100,
              marginTop: 20,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={handleLogout}
          >
            <AppText style={{ fontSize: 18, color: "#fff" }}>Выйти</AppText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setShowModal1(false)}
            style={{
              backgroundColor: "#9EA9B7",
              paddingHorizontal: 20,
              height: 60,
              borderRadius: 100,
              marginTop: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AppText style={{ fontSize: 18, color: "#fff" }}>Отмена</AppText>
          </TouchableOpacity>
        </ModalCenter>
      )}
      {showModal2 && (
        <ModalCenter onClose={() => setShowModal2(false)}>
          <AppText
            style={{
              fontSize: 20,
              fontWeight: 600,
              color: "#131313",
              textAlign: "center",
              marginBottom: 10,
            }}
          >
            Удалить аккаунт?
          </AppText>
          <AppText
            style={{ fontSize: 16, color: "#9EA9B7", textAlign: "center" }}
          >
            {" "}
            Ваш аккаунт удалится навсегда, и вам придется зарегистрироваться и
            выполнить авторизацию заново.
          </AppText>
          <TouchableOpacity
            style={{
              backgroundColor: "#E64646",
              paddingHorizontal: 20,
              height: 60,
              borderRadius: 100,
              marginTop: 20,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={handleDelete}
          >
            <AppText style={{ fontSize: 18, color: "#fff" }}>Удалить</AppText>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setShowModal2(false)}
            style={{
              backgroundColor: "#9EA9B7",
              paddingHorizontal: 20,
              height: 60,
              borderRadius: 100,
              marginTop: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AppText style={{ fontSize: 18, color: "#fff" }}>Отмена</AppText>
          </TouchableOpacity>
        </ModalCenter>
      )}
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
    flex: 1,
    justifyContent: "space-between",
    paddingBottom: 115,
  },
  page: {
    marginBottom: 10,
    borderRadius: 100,
    backgroundColor: "#fff",
    padding: 4,
    flexDirection: "row",
    alignItems: "center",
    height: 60,
  },
  icon: {
    backgroundColor: "#f5f5f5",
    width: 52,
    height: 52,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  text: {
    fontSize: 16,
  },
  arrow: {
    position: "absolute",
    right: 23,
    flexDirection: "row",
    alignItems: "center",
    gap: 23,
  },
  lagu: {
    color: "#9EA9B7",
    fontSize: 16,
  },
});
