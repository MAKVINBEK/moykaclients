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
  import Delet from "../../assets/images/svg/delete.svg"
  import Edit from "../../assets/images/svg/edit.svg"
import ModalCenter from "../../ui/ModalCenter";

  export const MyCardsDetails = ({ navigation }) => {
    const [showModal, setShowModal] = useState(false);
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
            <AppText style={styles.title}>Мои карты</AppText>
            <View style={{ width: 60 }} />
          </View>
          <View style={styles.block}>
            <AppText style={styles.label}>Card number</AppText>
            <View style={styles.input}>
              <TextInput
                placeholder="Card number"
                placeholderTextColor="#9EA9B7"
                value="1234 5678 9000 0000"
                style={styles.vod}
                keyboardType="number-pad"
              />
            </View>
            <View
              style={{ flexDirection: "row", gap: 10, marginTop: 10, flex: 1 }}
            >
              <View style={{ flex: 1 }}>
                <AppText style={styles.label}>Expiration date</AppText>
                <View style={styles.input}>
                  <TextInput
                    placeholder="Expiration date"
                    placeholderTextColor="#9EA9B7"
                    style={styles.vod}
                    value="12/28"
                  />
                </View>
              </View>
              <View style={{ flex: 1 }}>
                <AppText style={styles.label}>CVV</AppText>
                <View style={styles.input}>
                  <TextInput
                    placeholder="CVV"
                    placeholderTextColor="#9EA9B7"
                    style={styles.vod}
                    maxLength={3}
                    keyboardType="number-pad"
                    value="224"
                  />
                </View>
              </View>
            </View>
          </View>
          <View style={{flexDirection:"row",gap:10,flex:1,}}>
          <TouchableOpacity
            style={[styles.button,{backgroundColor:"#E64646"}]}
            onPress={() => setShowModal(true)}
            activeOpacity={0.6}
          >
            <Delet/>
            <AppText style={styles.buttonText}>Удалить</AppText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("ConfirmationCard")}
            activeOpacity={0.6}
          >
            <Edit/>
            <AppText style={styles.buttonText}>Сохранить</AppText>
          </TouchableOpacity>
          </View>
          
        </ScrollView>
        {showModal && (
  <ModalCenter onClose={()=>setShowModal(false)}> 
      <AppText style={{fontSize:20,fontWeight:600,color:"#131313",textAlign:"center",marginBottom:10,}}>Удалить карту?</AppText>
      <AppText style={{fontSize:16,color:"#9EA9B7",textAlign:"center"}}>Вы уверены? Удаление карты сделает её недоступной для оплаты.</AppText>
      <TouchableOpacity style={{backgroundColor:"#E64646",paddingHorizontal:20,height:60,borderRadius:100,marginTop:20,alignItems:"center",justifyContent:"center",}}>
        <AppText style={{fontSize:18,color:"#fff"}}>Удалить</AppText>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>setShowModal(false)} style={{backgroundColor:"#9EA9B7",paddingHorizontal:20,height:60,borderRadius:100,marginTop:10,alignItems:"center",justifyContent:"center",}}>
        <AppText style={{fontSize:18,color:"#fff"}}>Отмена</AppText>
      </TouchableOpacity>
  </ModalCenter>
)}
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
    block: {
      backgroundColor: "#fff",
      borderRadius: 30,
      padding: 20,
    },
    label: {
      color: "#2B2929",
      fontSize: 14,
      marginBottom: 6,
    },
    input: {
      height: 60,
      borderRadius: 100,
      backgroundColor: "#f5f5f5",
      paddingHorizontal: 20,
      flex: 1,
    },
    vod: {
      height: 60,
      width: "85%",
      color:"#9EA9B7"
    },
    button:{
        flex:1,
      height:60,
      borderRadius:100,
      backgroundColor:"#3083FF",
      flexDirection:"row",
      alignItems:"center",
      justifyContent:"center",
      gap:10,
      paddingHorizontal:20,
      marginTop:20,
  },
  buttonText:{
      fontSize:16,
      fontWeight:600,
      color:"#fff"
  }
  });
  