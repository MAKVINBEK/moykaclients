import React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  Pressable,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "../../assets/images/svg/logo.svg";
import Notification from "../../assets/images/svg/notification.svg";
import Svg, { Path } from "react-native-svg";
import { Menu } from "../../components/Menu"; 
import AppText from "../../components/AppText";
import Succes from "../../assets/images/svg/succes.svg" 

const { width } = Dimensions.get("window");

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

function describeArc(x, y, radius, startAngle, endAngle) {
  const start = polarToCartesian(x, y, radius, startAngle);
  const end = polarToCartesian(x, y, radius, endAngle);

  const diff = (endAngle - startAngle + 360) % 360;
  const largeArcFlag = diff > 180 ? "1" : "0";
  const sweepFlag = diff === 0 ? "0" : "1";

  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} ${sweepFlag} ${end.x} ${end.y}`;
}

export const PLANS = [
  {
    id: "standard",
    title: "Standard",
    badgeColor: "#6AA9FF",
    price: "$15",
    period: "/ месяц",
    features: ["10 моек", "Запись в любое время", "Доступ во всех точках сети"],
    ctaText: "Ваш текущий план",
    isCurrent: true,
  },
  {
    id: "premium",
    title: "Premium",
    badgeColor: "#1FAA23B2",
    price: "$35",
    period: "/ 3 месяца",
    features: ["40 моек", "Приоритетное бронирование", "Доступ во всех точках"],
    ctaText: "Подробнее",
    isCurrent: false,
  },
  {
    id: "unlimited",
    title: "Unlimited",
    badgeColor: "#FF871FB2",
    price: "$120",
    period: "/ год",
    features: [
      "Безлимит моек",
      "VIP-запись без очереди",
      "Бонус: бесплатная полировка 1 раз в год",
    ],
    ctaText: "Подробнее",
    isCurrent: false,
  },
  {
    id: "family",
    title: "Family",
    badgeColor: "#9030FFB2",
    price: "$200",
    period: "/ год",
    features: [
      "Безлимит моек для 2 машин",
      "Доступ во всех точках",
      "Подарочный ваучер на 1 месяц для друга",
    ],
    ctaText: "Подробнее",
    isCurrent: false,
  },
];

export const Subscription = ({
  navigation,
  plan = "Standard",
  price = "$15",
  period = "/ месяц",
  used = 7,
  limit = 10,
  nextCharge = "16 октября 2025",
  active = true,
  onCancel = () => {},
}) => {
  const progress = Math.max(0, Math.min(1, used / limit));

  const startAngle = 270;
  const endAngle = 90;

  const totalSweep = (endAngle - startAngle + 360) % 360;
  const filledSweep = totalSweep * progress;
  const filledEndAngle = (startAngle + filledSweep) % 360;

  const size = width - 72;
  const cx = size / 2;
  const cy = size / 2;
  const strokeWidth = 36;
  const radius = size / 2 - strokeWidth / 2;

  const bgPath = describeArc(cx, cy, radius, startAngle, endAngle);
  const fgPath = describeArc(cx, cy, radius, startAngle, filledEndAngle);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Logo />
        <TouchableOpacity
          style={styles.notyfi}
          onPress={() => navigation?.navigate?.("Notification")}
        >
          <Notification />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <View style={styles.headerRow}>
            <View style={styles.leftHeader}>
              <AppText style={styles.title}>Моя подписка</AppText>
              <View style={styles.badge}>
                <AppText style={styles.badgeText}>{plan}</AppText>
              </View>
            </View>

            <View style={styles.rightHeader}>
              <AppText
                style={[
                  styles.status,
                  active ? styles.statusActive : styles.statusInactive,
                ]}
              >
                {active ? "Активна" : "Неактивна"}
              </AppText>
              <View style={styles.price}>
                <AppText style={styles.priceVal}>{price}</AppText>
                <AppText style={styles.pricePeriod}> {period}</AppText>
              </View>
            </View>
          </View>

          <View style={styles.svgWrap}>
            <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
              <Path
                d={bgPath}
                stroke="#ECEFF1"
                strokeWidth={strokeWidth}
                strokeLinecap="butt"
                fill="none"
              />
              <Path
                d={fgPath}
                stroke="#3083FF"
                strokeWidth={strokeWidth}
                strokeLinecap="butt"
                fill="none"
              />
            </Svg>

            <View style={styles.centerText}>
              <AppText style={styles.countText}>
                {used}/{limit}
              </AppText>
              <AppText style={styles.subText}>
                Осталось: {Math.max(0, limit - used)} моек из {limit}
              </AppText>
            </View>
          </View>

          <AppText style={styles.nextText}>
            Следующее списание: {nextCharge}
          </AppText>

          <Pressable style={styles.button} onPress={onCancel}>
            <AppText style={styles.buttonText}>Отменить автопродление</AppText>
          </Pressable>
        </View>
        <AppText style={styles.titlePlans}>Другие тарифы</AppText>
           <FlatList
          data={PLANS}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          snapToAlignment="center"
          contentContainerStyle={styles.flatList}
          renderItem={({ item }) => (
            <View style={styles.cardBlock}>
              <View style={styles.headerBlock}>
                <View
                  style={[styles.badge, { backgroundColor: item.badgeColor }]}
                >
                  <AppText style={styles.badgeText}>{item.title}</AppText>
                </View>

                <View style={styles.price}>
                  <AppText style={styles.priceVal}>{item.price}</AppText>
                  <AppText style={styles.pricePeriod}> {item.period}</AppText>
                </View>
              </View>

              <AppText style={styles.includeTitle}>Включено:</AppText>

              {item.features.map((feature, i) => (
                <View key={i} style={styles.featureRow}>
                  <AppText style={styles.check}><Succes width={16} height={16}/></AppText>
                  <AppText style={styles.includeTitle}>{feature}</AppText>
                </View>
              ))}

              <TouchableOpacity
                activeOpacity={0.8}
                style={[styles.buttons, item.isCurrent && styles.buttonInactive]}
                onPress={() => navigation.navigate("RateDetail", { plan: item })}
              >
                <AppText
                  style={[
                    styles.buttonTexts,
                    item.isCurrent && styles.buttonTextInactive,
                  ]}
                >
                  {item.ctaText}
                </AppText>
              </TouchableOpacity>
            </View>
          )}
        /> 
        
      </ScrollView>
      <Menu />
    </SafeAreaView>
  );
};

export const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F2F2F2",
  },
  container: {
    paddingBottom: 130,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  notyfi: {
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  card: {
    width: width-32,
    backgroundColor: "#fff",
    borderRadius: 30,
    padding: 20,
    marginTop: 20,
    marginHorizontal: 16,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  leftHeader: {
    alignItems: "flex-start",
  },
  title: {
    fontSize: 20,
    fontWeight: 500,
    marginBottom: 20,
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
  rightHeader: {
    alignItems: "flex-end",
  },
  status: {
    fontSize: 16,
    fontWeight: 600,
    marginBottom: 20,
  },
  statusActive: {
    color: "#24B65A",
  },
  statusInactive: {
    color: "#B0BEC5",
  },
  price: {
    flexDirection:"row",
    alignItems:"flex-end",
    fontSize: 18,
    fontWeight: 700,
  },
  priceVal: {
    fontSize: 24,
    fontWeight: 700,
    lineHeight:24
  },
  pricePeriod: {
    fontSize: 14,
    color: "#000",
  },
  svgWrap: {
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 20,
    overflow: "hidden",
    maxHeight: (width - 72) / 2,
  },
  centerText: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  countText: {
    fontSize: 32,
    fontWeight: 700,
    color: "#000",
  },
  subText: {
    marginTop: 30,
    fontSize: 16,
    fontWeight: 600,
    color: "#000",
  },
  nextText: {
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10,
    color: "#000",
    fontSize: 14,
  },
  button: {
    backgroundColor: "#3083FF",
    height: 60,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: 700,
    fontSize: 16,
  },


  titlePlans:{
    fontSize:24,
    fontWeight:600,
    color:"#000",
    marginHorizontal:16,
    marginTop:40,
  },
  flatList:{
    paddingTop:10,
    paddingBottom:20,
    paddingHorizontal:16,
  },
  cardBlock: {
    width: width*0.813,
    backgroundColor: "#fff",
    borderRadius: 30,
    padding: 20,
    marginRight:10,
    shadowColor: "#959DA5",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 8,
  },
  headerBlock: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom:10,
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
    height:52,
    alignItems: "center",
    justifyContent:"center",
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
