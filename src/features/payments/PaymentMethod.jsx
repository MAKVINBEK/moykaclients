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
import { StatusBar } from "expo-status-bar";

export const PaymentMethod = ({ navigation }) => {
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
          <AppText style={styles.title}>Метод оплаты</AppText>
          <View style={{ width: 60 }} />
        </View>
        <View style={styles.block}>
          <AppText style={styles.label}>Card number</AppText>
          <View style={styles.input}>
            <TextInput
              placeholder="Card number"
              placeholderTextColor="#9EA9B7"
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
                />
              </View>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("ConfirmationCard")}
          activeOpacity={0.6}
        >
          <AppText style={styles.buttonText}>Добавить карту</AppText>
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
  },
  button:{
    height:60,
    borderRadius:100,
    backgroundColor:"#3083FF",
    alignItems:"center",
    justifyContent:"center",
    paddingHorizontal:20,
    marginTop:20,
},
buttonText:{
    fontSize:16,
    fontWeight:600,
    color:"#fff"
}
});
