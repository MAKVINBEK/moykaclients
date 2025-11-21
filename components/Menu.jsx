import { StyleSheet, TouchableOpacity, View } from "react-native";
import AppText from "../AppText";
import Home from "../assets/images/svg/home.svg";
import HomeActive from "../assets/images/svg/homeActive.svg";
import Scan from "../assets/images/svg/scan.svg";
import Time from "../assets/images/svg/time.svg";
import Profile from "../assets/images/svg/profile.svg";
import Star from "../assets/images/svg/star.svg";
import TimeActive from "../assets/images/svg/timeActive.svg";
import ProfileActive from "../assets/images/svg/profileActive.svg";
import StarActive from "../assets/images/svg/starActive.svg";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export const Menu = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const isActive = (...names) => names.includes(route.name);
  const [token, setToken] = useState(null);

useEffect(() => {
  const loadToken = async () => {
    const t = await AsyncStorage.getItem("access");
    setToken(t);
  };
  loadToken();
}, []);

  
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.block}
        onPress={() => navigation.reset({index:0,routes:[{name:"Main"}]})}
      >
        {isActive("Main", "Notification") ? <HomeActive /> : <Home />}
        <AppText
          style={[
            styles.title,
            isActive("Main", "Notification") && { color: "#3083FF" },
          ]}
        >
          Главная
        </AppText>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.block}
        onPress={() => navigation.navigate("NoSubscription")}
      >
        {isActive("Subscription", "NoSubscription", "Rates", "RateDetail") ? (
          <StarActive />
        ) : (
          <Star />
        )}
        <AppText
          style={[
            styles.title,
            isActive(
              "Subscription",
              "NoSubscription",
              "Rates",
              "RateDetail"
            ) && { color: "#3083FF" },
          ]}
        >
          Подписка
        </AppText>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.scan}
        onPress={() => navigation.navigate("Scanner")}
      >
        <Scan />
      </TouchableOpacity>
      <TouchableOpacity style={styles.block} onPress={() => navigation.navigate(token?"History":"Register")}>
        {isActive("History") ? <TimeActive /> : <Time />}
        <AppText
          style={[styles.title, isActive("History") && { color: "#3083FF" }]}
        >
          История
        </AppText>
      </TouchableOpacity>
      <TouchableOpacity style={styles.block} onPress={() => navigation.navigate(token ? "Profile" : "Register")}>
        {isActive("Profile") ? <ProfileActive /> : <Profile />}
        <AppText
          style={[styles.title, isActive("Profile") && { color: "#3083FF" }]}
        >
          Профиль
        </AppText>
      </TouchableOpacity>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    height: 90,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between", 
    alignItems: "flex-end",
    gap: 20,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    shadowColor: "#959DA5",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 8,
  },
  block: {
    alignItems: "center",
    gap: 8,
  },
  title: {
    color: "#484C52",
    fontSize: 12,
  },
  scan: {
    backgroundColor: "#3083FF",
    width: 60,
    height: 60,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
});
