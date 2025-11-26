import {
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
  } from "react-native";
  import { SafeAreaView } from "react-native-safe-area-context";
  import AppText from "../../components/AppText";
  import { FontAwesome6, Ionicons } from "@expo/vector-icons";
  import MBank from "../../assets/images/svg/mbank.svg"
import { Menu } from "../../components/Menu"; 
import { StatusBar } from "expo-status-bar";
  
  
  export const MyCards = ({ navigation }) => {
  
    return (
      <SafeAreaView style={styles.safe}>
        <StatusBar style="dark" backgroundColor={styles.safe.backgroundColor} />
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.row}>
                <TouchableOpacity style={styles.next} onPress={()=> navigation.goBack()}><Ionicons name="chevron-back" size={24} color="#000" /></TouchableOpacity>
                <AppText style={styles.title}>Мои карты</AppText>
                <View style={{width:60,}}/>
            </View>
            <TouchableOpacity style={styles.block} onPress={()=> navigation.navigate("MyCardsDetails")}>
                <View style={styles.rowBlock}>
                <MBank/>
                <AppText style={styles.number}>**** **** **** 0000</AppText>
                </View>
            </TouchableOpacity>
        
        </ScrollView>
        <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate("PaymentsSuccesful")}>
        <FontAwesome6 name="add" size={22} color="#fff" />
            <AppText style={styles.buttonText} >Оплатить</AppText>
        </TouchableOpacity>
        <Menu/>
      </SafeAreaView>
    );
  
  };
  
  const styles = StyleSheet.create({
    safe: {
      flex: 1,
      backgroundColor: "#E7E8EA",
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
    block:{
        height:68,
        paddingHorizontal:20,
        borderRadius:100,
        backgroundColor:"#fff",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        marginBottom:14,
    },
    rowBlock:{
        flexDirection:"row",
        alignItems:"center",
    },
    number:{
        color:"#2B2929",
        fontSize:16,
        marginLeft:18,
    },
    button:{
        height:60,
        borderRadius:100,
        backgroundColor:"#3083FF",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        gap:10,
        paddingHorizontal:20,
        position:"absolute",
        left:0,
        right:0,
        bottom:110,
        marginHorizontal:16,
    },
    buttonText:{
        fontSize:16,
        fontWeight:600,
        color:"#fff"
    }
  });
  