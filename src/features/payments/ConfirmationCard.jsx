import {
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
  } from "react-native";
  import { SafeAreaView } from "react-native-safe-area-context";
  import AppText from "../../components/AppText";
  import { Ionicons } from "@expo/vector-icons";
import CodeInput from "../../ui/CodeInput";
import { StatusBar } from "expo-status-bar";
  
  export const ConfirmationCard = ({ navigation }) => {
    return (
      <SafeAreaView style={styles.safe}>
        <StatusBar style="dark" backgroundColor={styles.safe.backgroundColor} />
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.next}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="chevron-back" size={24} color="#000" />
            </TouchableOpacity>
            <AppText style={styles.title}>Подтверждение</AppText>
            <View style={{ width: 60 }} />
          </View>
          <AppText style={styles.text}>Мы отправили вам код-подтверждения, введите его</AppText>
          <CodeInput length={5} size={64} fontsize={24}/>
          <View style={{flexDirection:"row",justifyContent:"center",marginTop:52,}}>
            <AppText style={{color:"#000000B2",fontSize:16,}}>Не пришёл код?</AppText>
            <AppText style={{fontSize:16,fontWeight:600,}}>Отправить снова через 60 сек.</AppText>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("PaymentOptions")}
            activeOpacity={0.6}
          >
            <AppText style={styles.buttonText}>Подтвердить</AppText>
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
    row: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: 10,
      marginBottom: 40,
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
    text:{
        color:"#000000B2",
        fontSize:18,
        marginBottom:30,
    },
    button:{
      height:60,
      borderRadius:100,
      backgroundColor:"#3083FF",
      alignItems:"center",
      justifyContent:"center",
      paddingHorizontal:20,
      marginTop:30,
  },
  buttonText:{
      fontSize:16,
      fontWeight:600,
      color:"#fff"
  }
  });
  