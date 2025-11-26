import {
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppText from "../../components/AppText";
import Arrow from "../../assets/images/svg/arrow.svg";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { getPerson, updatePerson } from "../../services/AuthService";

export const PersonalData = ({ navigation }) => {
  const [form, setForm] = useState({
    first_name: "",
    sur_name: "",
    phone: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getPerson();
        setForm({
          first_name: data.sur_name || "",
          sur_name: data.first_name || "",
          phone: data.phone || "",
          email: data.email || "",
        });
      } catch (e) {
        console.log("PROFILE ERROR:", e);
      }
    };

    load();
  }, []);

  const onSave = async () => {
    setLoading(true);

    try {
      await updatePerson(form);
      navigation.goBack();
    } catch (e) {
      console.log("UPDATE ERROR:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" backgroundColor={styles.safe.backgroundColor} />

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.next}
          onPress={() => navigation.goBack()}
        >
          <Arrow />
        </TouchableOpacity>
        <AppText style={styles.title}>Личные данные</AppText>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <AppText style={styles.label}>Имя</AppText>
        <TextInput
          style={styles.select}
          value={form.first_name}
          onChangeText={(t) => setForm({ ...form, first_name: t })}
        />

        <AppText style={styles.label}>Фамилия</AppText>
        <TextInput
          style={styles.select}
          value={form.sur_name}
          onChangeText={(t) => setForm({ ...form, sur_name: t })}
        />

        <AppText style={styles.label}>Номер телефона</AppText>
        <TextInput
          style={styles.select}
          value={form.phone}
          onChangeText={(t) => setForm({ ...form, phone: t })}
        />

        <AppText style={styles.label}>Электронная почта</AppText>
        <TextInput
          style={styles.select}
          value={form.email}
          onChangeText={(t) => setForm({ ...form, email: t })}
        />

        <TouchableOpacity style={styles.button} onPress={onSave}>
          <AppText style={styles.buttonText}>
            {loading ? "Сохранение..." : "Изменить"}
          </AppText>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};
  
  const styles = StyleSheet.create({
    safe: {
      flex: 1,
      backgroundColor: "#E7E8EA",
      paddingHorizontal: 16,
    },
    container: {
      paddingBottom: 20,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: 10,
      marginBottom: 16,
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
    label:{
      color:"#2B2929",
      fontWeight:500,
      marginTop:20,
      marginBottom:6,
    },
    select:{
      backgroundColor:"#fff",
      height:60,
      borderRadius:100,
      paddingHorizontal:20,
    },
    arrow:{
      position:"absolute",
      right:28,
      top:22,
      backgroundColor:'#fff',
      alignItems:"center",
      justifyContent:"center",
      transform:[{rotate:"270deg"}],
    },
    button:{
        backgroundColor:"#3083FF",
        height:60,
        borderRadius:100,
        marginTop:20,
        alignItems:"center",
        justifyContent:"center"
    },
    buttonText:{
        color:"#fff",
        fontSize:16,
        fontWeight:600,
    }
  });
  