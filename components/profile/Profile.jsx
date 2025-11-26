import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "../../assets/images/svg/logo.svg";
import Notification from "../../assets/images/svg/notification.svg";
import Change from "../../assets/images/svg/change.svg";
import Wallet from "../../assets/images/svg/wallet.svg";
import Setting from "../../assets/images/svg/setting.svg";
import Arrow from "../../assets/images/svg/arrow.svg";
import Circle from "../../assets/images/svg/circle.svg";
import ProfileIcon from "../../assets/images/svg/profile.svg";
import Time from "../../assets/images/svg/time.svg";
import { Menu } from "../Menu";
import AppText from "../../AppText";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { getProfile } from "../../AuthService";

export const Profile = ({ navigation }) => {

  const [response, setResponse] = useState(true);
      const [loading, setLoading] = useState(true);
      const [err, setErr] = useState(null);
  
    useEffect(() => {
      let mounted = true;
      const load = async () => {
        try {
          setLoading(true);
          const res = await getProfile();
          if (!mounted) return;
          setResponse(res);
          console.log(res);
          
        } catch (e) {
          console.warn(e);
          if (mounted) setErr(e);
        } finally {
          if (mounted) setLoading(false);
        }
      };
      load();
      return () => { mounted = false; };
    }, []);

    
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
      <ScrollView 
      contentContainerStyle={{ paddingBottom: 140 }}
          showsVerticalScrollIndicator={false}>
        <View style={styles.block}>
            <TouchableOpacity style={styles.change} onPress={()=>navigation.navigate("VehicleData")}><Change/></TouchableOpacity>
            <View style={{alignItems:"center"}}>
                <Image resizeMode="contain" style={{width:270,height:160,}} source={response.avatar?response.avatar:require("../../assets/images/mers.png")}/>
          <AppText style={styles.model}>Toyota Camry</AppText>
            </View>
          <View
            style={{
              paddingHorizontal: 16,
              paddingVertical: 10, 
              marginTop: 20,
              flex: 1,
            }} >
            <View style={{ flexDirection: "row", justifyContent: "space-between",marginBottom:20 }}>
              <View style={{flex:1,}}>
                <AppText style={styles.label}>Марка</AppText>
                <AppText style={styles.title}>{response.marka?response.marka:"-"}</AppText>
              </View>
              <View style={{flex:1,}}>
                <AppText style={styles.label}>Модель</AppText>
                <AppText style={styles.title}>{response.model?response.model:"-"}</AppText>
              </View>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <View style={{flex:1,}}>
                <AppText style={styles.label}>Категория</AppText>
                <AppText style={styles.title}>{response.body?response.body:"-"}</AppText>
              </View>
              <View style={{flex:1,}}>
                <AppText style={styles.label}>Госномер</AppText>
                <AppText style={styles.title}>{response.gos_number?response.gos_number:"-"}</AppText>
              </View>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.page} onPress={()=>navigation.navigate("VehicleData")}>
            <View style={styles.icon}><ProfileIcon/></View>
            <AppText style={styles.text}>Личные данные</AppText>
            <View style={styles.arrow}><Arrow/></View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.page}  onPress={()=>navigation.navigate("NoCard")}>
            <View style={styles.icon}><Wallet/></View>
            <AppText style={styles.text}>Метод оплаты</AppText>
            <View style={styles.arrow}><Arrow/></View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.page} onPress={()=>navigation.navigate("MyNotes")}>
            <View style={styles.icon}><Time/></View>
            <AppText style={styles.text}>Мои записи </AppText>
            <View style={styles.arrow}><Arrow/></View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.page} onPress={()=>navigation.navigate("SupportCenter")}>
            <View style={styles.icon}><Circle/></View>
            <AppText style={styles.text}>Центр поддержки</AppText>
            <View style={styles.arrow}><Arrow/></View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.page} onPress={()=>navigation.navigate("Settings")}>
            <View style={styles.icon}><Setting/></View>
            <AppText style={styles.text}>Настройки</AppText>
            <View style={styles.arrow}><Arrow/></View>
        </TouchableOpacity>
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
  block: {
    backgroundColor: "#fff",
    borderRadius: 30,
    padding: 10,
    marginBottom:16,
  },
  change:{
    width:52,
    height:52,
    borderRadius:100,
    borderColor:"#3083FF",
    borderWidth:1,
    alignItems:"center",
    justifyContent:"center",
    position:"absolute",
    top:10,
    right:10,
  },
  model: {
    color: "#2B2929",
    fontWeight: 600,
    fontSize: 20,
  },
  label: {
    color: "#9EA9B7",
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 500,
    color: "#2B2929",
  },
  page:{
    marginBottom:10,
    borderRadius:100,
    backgroundColor:"#fff",
    padding:4,
    flexDirection:"row",
    alignItems:"center",
    height:60,
  },
  icon:{
    backgroundColor:"#f5f5f5",
    width:52,
    height:52,
    borderRadius:100,
    alignItems:"center",
    justifyContent:"center",
    marginRight:10,
  },
  text:{
    fontSize:16,
  },
  arrow:{
    transform:[{rotate:"180deg"}],
    position:"absolute",
    right:26,
  }
});
