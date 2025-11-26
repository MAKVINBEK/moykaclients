import {
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
  } from "react-native";
  import { SafeAreaView } from "react-native-safe-area-context";
  import AppText from "../../components/AppText";
  import { Ionicons } from "@expo/vector-icons";
import No from "../../assets/images/svg/no.svg";
import { StatusBar } from "expo-status-bar";
  
  
  export const PaymentNotСompleted = ({ navigation }) => {
  
    return (
      <SafeAreaView style={styles.safe}>
        <StatusBar style="dark" backgroundColor={styles.safe.backgroundColor} />
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.row}>
                <TouchableOpacity style={styles.next} onPress={()=> navigation.goBack()}><Ionicons name="chevron-back" size={24} color="#000" /></TouchableOpacity>
                <AppText style={styles.title}>Оплаты</AppText>
                <View style={{width:60,}}/>
            </View>
            <View style={styles.no}><No/></View>
                   <AppText style={styles.titles}><AppText style={{color:"#C00000"}}>Оплата не выполнена.</AppText> {`\n`} Пожалуйста, проверьте данные карты или попробуйте снова.</AppText>
                   <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate("Main")}>
                    <AppText style={styles.buttonText}>Главная страница</AppText>
                   </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  
  };
  
  const styles = StyleSheet.create({
    safe: {
      flex: 1,
      backgroundColor: "#F2F2F2",
    },
    container: {
      paddingHorizontal: 16,
      paddingBottom: 20,
    },
    row:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        marginTop:10,
        marginBottom:40,
    },
    next:{
        width:60,
        height:60,
        backgroundColor:"#fff",
        alignItems:"center",
        justifyContent:"center",
        gap:18,
        borderRadius:100,
    },
    title:{
        color:"#2B2929",
        fontSize:20,
        fontWeight:700,
    },
    no:{
        alignItems:"center",
        marginTop:"30%",
        marginBottom:20,
      },
      titles:{
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
  