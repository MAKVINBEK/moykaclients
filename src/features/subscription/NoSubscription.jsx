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
import { Menu } from "../../components/Menu";
import AppText from "../../components/AppText";
import { StatusBar } from "expo-status-bar";

export const NoSubscription = ({ navigation }) => {

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
      <View style={styles.no}><No/></View>
       <AppText style={styles.title}>Похоже, у вас пока нет подписки. Хотите оформить прямо сейчас?</AppText>
       <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate("Rates")}>
        <AppText style={styles.buttonText}>Выбрать подписку</AppText>
       </TouchableOpacity>
      <Menu />
    </SafeAreaView>
  );
};

export const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F2F2F2",
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
    marginTop:"30%",
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
    height: 52,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: 700,
    fontSize: 16,
  },

});
