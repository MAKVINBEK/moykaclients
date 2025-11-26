import {
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
  } from "react-native";
  import { SafeAreaView } from "react-native-safe-area-context";
  import AppText from "../../components/AppText";
  import { useState } from "react";
  import { Ionicons } from "@expo/vector-icons";
  import MBank from "../../assets/images/svg/mbank.svg"
import RadioButton from "../../ui/RadioButton";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
  
  
  export const PaymentOptions = ({ navigation }) => {
    const [selected, setSelected] = useState("a");
  
    return (
      <SafeAreaView style={styles.safe}>
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.row}>
                <TouchableOpacity style={styles.next} onPress={()=> navigation.goBack()}><Ionicons name="chevron-back" size={24} color="#000" /></TouchableOpacity>
                <AppText style={styles.title}>Выбор оплаты</AppText>
                <View style={{width:60,}}/>
            </View>
            <View style={styles.block}>
                <View style={styles.rowBlock}>
                <MBank/>
                <AppText style={styles.number}>**** **** **** 0000</AppText>
                </View>
                <RadioButton
          selected={selected === "a"}
          onPress={() => setSelected("a")}/>
            </View>
            <View style={styles.block}>
                <View style={styles.rowBlock}>
                <MBank/>
                <AppText style={styles.number}>**** **** **** 0000</AppText>
                </View>
                <RadioButton
          selected={selected === "b"}
          onPress={() => setSelected("b")}/>
            </View>
            <View style={styles.block}>
                <View style={styles.rowBlock}>
                <MBank/>
                <AppText style={styles.number}>**** **** **** 0000</AppText>
                </View>
                <RadioButton
          selected={selected === "c"}
          onPress={() => setSelected("c")}/>
            </View>
            <TouchableOpacity style={styles.add} activeOpacity={0.5} onPress={()=> navigation.navigate("PaymentMethod")}>
              <View style={{flexDirection:"row",alignItems:"center",gap:12, }}> 
              <FontAwesome6 name="add" size={20} color="#B8B8BA" />
              <AppText style={styles.addText}> Добавить карту</AppText>
              </View>
            </TouchableOpacity>
        
        </ScrollView>
        <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate("PaymentsSuccesful")}>
            <AppText style={styles.buttonText} >Оплатить</AppText>
        </TouchableOpacity>
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
    add:{
      height:60,
      borderRadius:100,
      backgroundColor:"#DFDFDF",
      alignItems:"center",
      justifyContent:"center",
      paddingHorizontal:20,
      marginTop:6,
      },
    addText:{
      color:"#B8B8BA",
      fontSize:16,
      fontWeight:600,
    },
    button:{
        height:60,
        borderRadius:100,
        backgroundColor:"#3083FF",
        alignItems:"center",
        justifyContent:"center",
        paddingHorizontal:20,
        position:"absolute",
        left:0,
        right:0,
        bottom:70,
        marginHorizontal:16,
    },
    buttonText:{
        fontSize:16,
        fontWeight:600,
        color:"#fff"
    }
  });
  