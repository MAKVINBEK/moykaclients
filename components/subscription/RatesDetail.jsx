import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "../../assets/images/svg/logo.svg";
import Notification from "../../assets/images/svg/notification.svg";
import { Menu } from "../Menu";
import AppText from "../../AppText";
import Succes from "../../assets/images/svg/succes.svg";

export const RatesDetail = ({ navigation,route }) => {
  const { plan } = route.params;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Logo />
        <TouchableOpacity
          style={styles.notyfi}
          onPress={() => navigation.navigate("Notification")}
        >
          <Notification />
        </TouchableOpacity>
      </View>
      <AppText style={styles.titlePlans}>Тариф {plan.title}</AppText>
      <View style={styles.cardBlock}>
        <View style={styles.headerBlock}>
          <View style={[styles.badge, { backgroundColor: plan.badgeColor }]}>
            <AppText style={styles.badgeText}>{plan.title}</AppText>
          </View>

          <View style={styles.price}>
            <AppText style={styles.priceVal}>{plan.price}</AppText>
            <AppText style={styles.pricePeriod}> {plan.period}</AppText>
          </View>
        </View>

        {plan.features.map((feature, i) => (
          <View key={i} style={styles.featureRow}>
            <AppText style={styles.check}>
              <Succes width={16} height={16} />
            </AppText>
            <AppText style={styles.includeTitle}>{feature}</AppText>
          </View>
        ))}
      </View>
      <TouchableOpacity
          activeOpacity={0.8}
          style={styles.buttons}
          onPress={() => navigation.navigate("PaymentOptions")}
        >
          <AppText
            style={styles.buttonTexts}
          >
            Оплатить
          </AppText>
        </TouchableOpacity>

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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  notyfi: {
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  titlePlans: {
    fontSize: 24,
    fontWeight: 600,
    color: "#000",
    marginTop: 25,
    marginBottom: 15,
  },
  flatList: {
    paddingBottom: 130,
  },
  cardBlock: {
    backgroundColor: "#f5f5f5",
    borderRadius: 30,
    padding: 20,
  },
  headerBlock: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  badge: {
    backgroundColor: "#3083FFB2",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 100,
  },
  badgeText: {
    color: "#fff",
    fontWeight: 500,
    fontSize: 14,
  },
  price: {
    flexDirection: "row",
    alignItems: "flex-end",
    fontSize: 18,
    fontWeight: 700,
  },
  priceVal: {
    fontSize: 24,
    fontWeight: 700,
    lineHeight: 24,
  },
  pricePeriod: {
    fontSize: 14,
    color: "#000",
  },
  includeTitle: {
    fontSize: 14,
    color: "#000",
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  check: {
    marginRight: 6,
  },
  buttons: {
    marginTop: 16,
    backgroundColor: "#1E90FF",
    borderRadius: 28,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonTexts: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  buttonInactive: {
    backgroundColor: "transparent",
  },
  buttonTextInactive: {
    color: "#1E90FF",
  },
});
