import {
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
  } from "react-native";
  import { SafeAreaView } from "react-native-safe-area-context";
  import AppText from "../../AppText";
  import { useState } from "react";
  import { Ionicons } from "@expo/vector-icons";
  import Icons from "../../assets/images/succesfull.svg"  
  export const PasswordUpdated = ({ navigation }) => {
    const [hidden, setHidden] = useState(true);
    
  
    return (
      <SafeAreaView style={styles.safe}>
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View><TouchableOpacity style={styles.next} onPress={()=> navigation.goBack()}><Ionicons name="chevron-back" size={24} color="#000" /></TouchableOpacity></View>
            <View style={{marginTop:166,alignItems:"center"}}><Icons/></View>
          <AppText style={styles.title}>
          Пароль обновлён!
          </AppText>
          <AppText style={styles.subTitle}>Ваш пароль был успешно изменён.</AppText>
          
          <TouchableOpacity style={styles.submit} onPress={()=>navigation.reset({index:0,routes:[{name:"Login"}]})}>
              <AppText style={styles.submitText}>На главную</AppText>
          </TouchableOpacity>
        </ScrollView>
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
    next:{
        width:60,
        height:60,
        backgroundColor:"#fff",
        alignItems:"center",
        justifyContent:"center",
        borderRadius:100,
    },
    title: {
      fontSize: 30,
      fontWeight: 700,
      marginBottom: 20,
      textAlign:"center",
      marginTop:30,
    },
    subTitle:{
        fontSize:18,
        color:"#000000B2",
        marginBottom:34,
        textAlign:"center",
      },
    submit:{
      backgroundColor:"#3083FF",
      alignItems:"center",
      justifyContent:"center",
      borderRadius:100,
      height:60,
      marginTop:50,
    },
    submitText:{
      color:"#FEFEFE",
      fontSize:16,
      fontWeight:700
    },
  });
  