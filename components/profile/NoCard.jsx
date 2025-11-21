import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "../../assets/images/svg/logo.svg";
import Notification from "../../assets/images/svg/notification.svg";
import No from "../../assets/images/svg/no.svg";
import { Menu } from "../Menu";
import AppText from "../../AppText";
import { FontAwesome6 } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

export const NoCard = ({ navigation }) => {

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" backgroundColor={styles.safe.backgroundColor} />
      <View style={styles.header}>
        <Logo />
        <TouchableOpacity
          style={styles.notyfi}
          onPress={() => navigation.navigate("Notification")}>
          <Notification />
        </TouchableOpacity>
      </View>
      <View style={styles.no}><No/></View>
       <AppText style={styles.title}>У вас пока не привязана карта. Добавьте её прямо сейчас. Чтобы совершать оплату</AppText>
       <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate("MyCards")}>
       <FontAwesome6 name="add" size={22} color="#fff" />
        <AppText style={styles.buttonText}>Добавить карту</AppText>
       </TouchableOpacity>
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
    marginBottom: 10,
    marginTop:10,
  },
  notyfi: {
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  no:{
    alignItems:"center",
    marginTop:"35%",
    marginBottom:20,
  },
  title:{
    fontSize:18,
    fontWeight:500,
    color:"#000",
    marginBottom:22,
    textAlign:"center"
  },
  button: {
    backgroundColor: "#3083FF",
    height: 60,
    borderRadius: 100,
    flexDirection:"row",
    alignItems: "center",
    justifyContent: "center",
    gap:10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: 600,
    fontSize: 16,
  },

});
