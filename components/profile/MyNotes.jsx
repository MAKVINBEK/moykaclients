import {
  ActivityIndicator,
    Image,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
  } from "react-native";
  import { SafeAreaView } from "react-native-safe-area-context";
  import AppText from "../../AppText";
  import { useEffect, useState } from "react";
  import { Ionicons } from "@expo/vector-icons";
  import Arrow from "../../assets/images/svg/arrow.svg";
import { StatusBar } from "expo-status-bar";
import { getHistory } from "../../AuthService";

  export const DATAs = new Array(6).fill(0).map((_, i) => ({
    id: i + "",
    title: "Rash",
    time: "20:00",
    address: "Ул. Панфилова, 106",
    data: "25.09.25",
  }));
  
  export const MyNotes = ({ navigation }) => {

    const [response, setResponse] = useState(true);
          const [loading, setLoading] = useState(true);
          const [err, setErr] = useState(null);
      
        useEffect(() => {
          const load = async () => {
            try {
              setLoading(true);
              const res = await getHistory();
              setResponse(res);
              console.log(res);
              
              
            } catch (e) {
              console.warn(e);
            } finally {
              setLoading(false);
            }
          };
          load();
        }, []);

        if (loading) {
            return (
              <SafeAreaView style={styles.safe}>
                <ActivityIndicator size="large" style={{ marginTop: 120 }} />
              </SafeAreaView>
            );
          }
    
    return (
      <SafeAreaView style={styles.safe}>
        <StatusBar style="dark" backgroundColor={styles.safe.backgroundColor} />
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.next}
              onPress={() => navigation.goBack()}
            >
              <Arrow/>
            </TouchableOpacity>
            <AppText style={styles.title}>Мои записи</AppText>
            <View style={{ width: 60 }} />
          </View>
          <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          {DATAs.map((item) => (
                              <View key={item.id} style={styles.card}>
                                  <Image style={styles.logo}  source={require("../../assets/images/image.png")}/>
                                  <View style={{ flex: 1, marginLeft: 10 }}>
                                    <AppText style={styles.title}>{item.title}</AppText>
                                    <AppText style={styles.sub}>{item.address}</AppText>
                                  </View>
                  
                                  <View style={{ alignItems: "flex-end" }}>
                                  <AppText style={styles.rating}>{item.time}</AppText>
                                    <AppText style={styles.sub}>{item.data}</AppText>
                                  </View>
                              </View>
                            ))}
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
      marginBottom: 35,
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
    card: {
        backgroundColor: "#fff",
        borderRadius: 100,
        paddingVertical: 10,
        paddingLeft:10,
        paddingRight:26,
        marginBottom: 10,
        flexDirection: "row", alignItems: "center" 
      },
      logo: {
        width: 52,
        height: 52,
        borderRadius: 100,
      },
      title: { fontSize: 18, fontWeight: "600" },
      sub: { fontWeight:500, color: "#9EA9B7", marginTop: 6 },
    
      rating: { color: "#2B2929", fontWeight: 500, fontSize: 16 }, 
  });
  