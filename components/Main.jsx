import {
  ScrollView,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppText from "../AppText";
import Logo from "../assets/images/svg/logo.svg";
import Notification from "../assets/images/svg/notification.svg";
import Search from "../assets/images/svg/search.svg";
import Settings from "../assets/images/svg/settings.svg";
import { Menu } from "./Menu";
import MapListScreen from "./home/MapListScreen";
import { useState } from "react";
import FilterBottomSheet from "./home/FilterBottomSheet";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DATA = new Array(6).fill(0).map((_, i) => ({
  id: i + "",
  title: "Rash",
  hours: "08:00-23:00",
  address: "Ул. Панфилова, 106",
  rating: "4.1",
  distance: "1.2 km",
}));

export const Main = ({ navigation }) => {
  const [focused, setFocused] = useState(false);
  const [showFilter, setShowFilter] = useState(false);


  

  return (
    <SafeAreaView style={styles.safe}>
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
          />
        </View>
        <TouchableOpacity style={styles.notyfi} onPress={() => setShowFilter(true)}>
          <Settings />
        </TouchableOpacity>
      </View>
      {focused?<ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {DATA.map((item) => (
                    <View key={item.id} style={styles.card}>
                        <Image style={styles.logo}  source={require("../assets/images/image.png")}/>
                        <View style={{ flex: 1, marginLeft: 10 }}>
                          <AppText style={styles.title}>{item.title}</AppText>
                          <AppText style={styles.sub}>{item.hours}</AppText>
                          <AppText style={styles.sub}>{item.address}</AppText>
                        </View>
        
                        <View style={{ alignItems: "flex-end" }}>
                          <AppText style={styles.rating}>
                            ★{" "}
                            <AppText
                              style={{
                                color: "#2B2929",
                                fontSize: 14,
                                fontWeight: 600,
                              }}
                            >
                              {item.rating}
                            </AppText>
                          </AppText>
                          <AppText style={styles.distance}>{item.distance}</AppText>
                        </View>
                    </View>
                  ))}
      </ScrollView>:<MapListScreen DATA={DATA}/>}
      
      
      <Menu />
      <FilterBottomSheet
        visible={showFilter}
        onClose={() => setShowFilter(false)}
        onApply={(filters) => {
          console.log("Выбранные фильтры:", filters);
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
    paddingLeft:10,
    paddingRight:26,
    marginBottom: 10,
    shadowColor: "#959DA5",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 8,
    flexDirection: "row", alignItems: "center" 
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
  distance: { fontWeight: 500, color: "#9EA9B7", marginTop: 32 },
});
