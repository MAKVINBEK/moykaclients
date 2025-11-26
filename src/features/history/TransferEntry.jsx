import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import ModalCenter from '../../ui/ModalCenter';
import Succes from "../../assets/images/svg/succes.svg";
import Calendar from '../../ui/Calendar';
import { Menu } from '../../components/Menu'; 
import AppText from '../../components/AppText';


export default function TransferEntry({navigation = null, onConfirm = () => {} }) {


  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const times = ['08:00', '09:00', '10:00', '11:00', '15:00', '16:30', '20:00', '22:20'];

  const confirm = () => {
    if (!selectedDate || !selectedTime) return;

    onConfirm({ date: selectedDate, time: selectedTime });

    setShowModal(true);

    setTimeout(() => {
      setShowModal(false);
      navigation?.goBack();
    }, 10000);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.next} onPress={() => navigation?.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <AppText style={{ color: "#2B2929", fontSize: 20, fontWeight: "700" }}>Запись на мойку</AppText>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}>

        <AppText style={styles.sectionTitle}>Выберите дату</AppText>

        <View style={styles.box}>
          <Calendar
            selectedDate={selectedDate}
            onSelectDate={(d) => setSelectedDate(d)}
          />
        </View>

        <AppText style={styles.sectionTitle}>Выберите время</AppText>
        <View style={styles.timesWrap}>
          {times.map((t) => {
            const active = selectedTime === t;
            return (
              <TouchableOpacity key={t} style={[styles.timePill, active && styles.timePillActive]} onPress={() => setSelectedTime(t)}>
                <AppText style={[styles.timeText, active && styles.timeTextActive]}>{t}</AppText>
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={styles.footer}>
        <TouchableOpacity style={[styles.confirmBtn, !(selectedDate && selectedTime) && styles.confirmBtnDisabled]} onPress={confirm} disabled={!(selectedDate && selectedTime)}>
          <AppText style={styles.confirmText}>Подтвердить запись</AppText>
        </TouchableOpacity>
      </View>
      </ScrollView>
      <Menu/>

      {showModal && (
        <ModalCenter onClose={()=>navigation?.goBack()}>
          <View style={{alignItems:"center",marginBottom:20,}}><Succes/></View>
          <AppText style={{fontSize:20,fontWeight:600,color:"#131313",textAlign:"center",marginBottom:10,}}>Ваша бронь изменена!</AppText>
          <AppText style={{fontSize:16,color:"#9EA9B7",textAlign:"center"}}>Ждём вас в назначенное время в мойке Rash, 20 сентября 2025 в 14:30</AppText>
        </ModalCenter>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F2F2F2', paddingHorizontal: 16, },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  next: {
    width: 60,
    height: 60,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },

  rating: { color: "#FFcc02", fontWeight: "700", fontSize: 18 },
  distance: { fontWeight: "500", color: "#9EA9B7", marginTop: 32 },
  routeBtn: {
    marginTop: 12,
    backgroundColor: '#3083FF',
    borderRadius: 100,
    height: 52,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  routeText: { color: '#fff', fontWeight: '700', fontSize: 16 },

  box: {
    borderRadius: 30,
    backgroundColor: '#fff',
    padding: 10,
  },
  sectionTitle: { fontSize: 18, color: '#2B2929', fontWeight: "600", marginTop: 16, marginBottom: 10, },

  timesWrap: { flexDirection: 'row', flexWrap: 'wrap' },
  timePill: {
    backgroundColor: '#fff',
    borderRadius: 100,
    paddingHorizontal: 24,
    height: 50,
    marginRight: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#EEF1F4',
    justifyContent: "center",
  },
  timePillActive: { backgroundColor: '#3083FF', borderColor: '#3083FF' },
  timeText: { color: '#000', fontWeight: "600", fontSize: 16, },
  timeTextActive: { color: '#fff', },

  footer: {
    marginTop:16,
  },
  confirmBtn: {
    backgroundColor: '#3083FF',
    height: 60,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: 'center',
  },
  confirmBtnDisabled: { backgroundColor: '#9FBDF9' },
  confirmText: { color: '#fff', fontWeight: "600", fontSize: 16 },
});
