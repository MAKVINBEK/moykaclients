import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Menu } from "../../components/Menu";
import { Ionicons } from "@expo/vector-icons";
import AppText from "../../components/AppText";
import Check from "../../assets/images/svg/check.svg" 

const notifications = [
    { id: "1", text: "Вы успешно записаны на 14 сентября, 15:00", date: "09.09.24" },
    { id: "2", text: "Ваше бронирование в CarWash через 1 час (12:00)", date: "09.09.24" },
    { id: "3", text: "С вашего счёта списано $15 за продление подписки Standard", date: "09.09.24" },
    { id: "4", text: "Ваша подписка заканчивается 20 сентября", date: "09.09.24" },
    { id: "5", text: "Оплата не прошла. Пожалуйста, обновите данные карты", date: "09.09.24" },
  ];

export const Notification = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
          <TouchableOpacity
            style={styles.next}
            onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color="#000" />
          </TouchableOpacity>
          <AppText style={{color:"#2B2929",fontSize:20,fontWeight:700,}}>Уведомления</AppText>
          <TouchableOpacity
            style={styles.next}>
            <Check/>
          </TouchableOpacity>
      </View>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {notifications.map((el)=>(
            <View style={styles.item} key={el.id}>
            <View style={styles.iconWrap}>
              <Ionicons name="alert-circle-outline" size={24} color="#000" />
            </View>
        
            <View style={styles.textWrap}>
              <AppText style={styles.text}>{el.text}</AppText>
              <AppText style={styles.date}>{el.date}</AppText>
            </View>
        
            <View style={styles.dot} />
          </View>
        ))}
      </ScrollView>
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
  container: {
    paddingBottom: 20,
  },
  header:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
    marginBottom:16,
    marginTop:10,
  },
  next: {
    width: 60,
    height: 60,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 100,
    paddingVertical: 10,
    paddingLeft:10,
    paddingRight:20,
    marginBottom: 12,
    shadowColor: '#959DA5',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 8,
  },
  iconWrap: {
    width: 60,
    height: 60,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F4F4F4",
  },
  textWrap: {
    flex: 1,
    marginLeft: 10,
  },
  text: {
    fontSize: 16,
    fontWeight:500,
    color: "#000",
  },
  date: {
    fontWeight:500,
    color: "#A4A4A4",
    marginTop: 2,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#3083FF",
    marginLeft: 10,
  },
});
