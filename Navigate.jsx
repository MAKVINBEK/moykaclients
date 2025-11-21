import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, ActivityIndicator, } from "react-native";
import { Main } from "./components/Main";
import { useFonts } from "expo-font";
import { Register } from "./components/register/Register";
import { Login } from "./components/register/Login";
import { ConfirmNumber } from "./components/register/ConfirmNumber";
import { ForgotPassword } from "./components/register/ForgotPassword";
import { MailCode } from "./components/register/MailCode";
import { NewPassword } from "./components/register/NewPassword";
import { PasswordUpdated } from "./components/register/PasswordUpdated";
import AsyncStorage from '@react-native-async-storage/async-storage';
import OnboardingScreen from "./OnboardingScreen";
import { Notification } from "./components/ Notifications";
import Recording from "./components/home/Recording";
import { Subscription } from "./components/subscription/Subscription";
import { NoSubscription } from "./components/subscription/NoSubscription";
import { Rates } from "./components/subscription/Rates";
import { RatesDetail } from "./components/subscription/RatesDetail";
import { PaymentOptions } from "./components/payments/PaymentOptions";
import { PaymentSuccesful } from "./components/payments/PaymentSuccessful";
import { PaymentNotСompleted } from "./components/payments/PaymentNotСompleted";
import { PaymentMethod } from "./components/payments/PaymentMethod";
import { ConfirmationCard } from "./components/payments/ConfirmationCard";
import ScannerScreen from "./components/screens/ScannerScreen";
import { Profile } from "./components/profile/Profile";
import { MyNotes } from "./components/profile/MyNotes";
import { VehicleData } from "./components/profile/VehicleData";
import { PersonalData } from "./components/profile/PersonalData";
import { NoCard } from "./components/profile/NoCard";
import { MyCards } from "./components/profile/MyCards";
import { MyCardsDetails } from "./components/profile/MyCardsDetails";
import SupportCenter from "./components/profile/SupportCenter";
import { Settings } from "./components/profile/Settings";
import { History } from "./components/history/History";
import TransferEntry from "./components/history/TransferEntry";

const Stack = createNativeStackNavigator();

export default function Navigate() {
  const [fontsLoaded] = useFonts({
    'Inter-100': require('./assets/fonts/inter/Inter-ExtraLight.ttf'),
    'Inter-300': require('./assets/fonts/inter/Inter-Light.ttf'),
    'Inter-400': require('./assets/fonts/inter/Inter-Regular.ttf'),
    'Inter-500': require('./assets/fonts/inter/Inter-Medium.ttf'),
    'Inter-600': require('./assets/fonts/inter/Inter-SemiBold.ttf'),
    'Inter-700': require('./assets/fonts/inter/Inter-Bold.ttf'),

    'Mulish-400': require('./assets/fonts/mulish/Mulish-Regular.ttf'),
    'Mulish-500': require('./assets/fonts/mulish/Mulish-Medium.ttf'),
    'Mulish-600': require('./assets/fonts/mulish/Mulish-SemiBold.ttf'),
    'Mulish-700': require('./assets/fonts/mulish/Mulish-Bold.ttf'),
  });

  const [isFirstLaunch, setIsFirstLaunch] = React.useState(null);
  const [isLogged, setIsLogged] = React.useState(null); // <--- ДОБАВИЛИ

  // Проверка онбординга
  React.useEffect(() => {
    const checkFirstLaunch = async () => {
      const already = await AsyncStorage.getItem("alreadyLaunched");
      if (!already) {
        await AsyncStorage.setItem("alreadyLaunched", "true");
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    };
    checkFirstLaunch();
  }, []);

  // Проверка токена
  React.useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("access");
      setIsLogged(!!token);
    };
    checkToken();
  }, []);

  // Пока загружаются шрифты и онбординг и токен
  if (!fontsLoaded || isFirstLaunch === null || isLogged === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isFirstLaunch && (
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        )}
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="ConfirmNumber" component={ConfirmNumber} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="MailCode" component={MailCode} />
        <Stack.Screen name="NewPassword" component={NewPassword} />
        <Stack.Screen name="PasswordUpdated" component={PasswordUpdated} />
        <Stack.Screen name="Notification" component={Notification} />
        <Stack.Screen name="Recording" component={Recording} />
        <Stack.Screen name="Subscription" component={Subscription} />
        <Stack.Screen name="NoSubscription" component={NoSubscription} />
        <Stack.Screen name="Rates" component={Rates} />
        <Stack.Screen name="RateDetail" component={RatesDetail} />
        <Stack.Screen name="PaymentOptions" component={PaymentOptions} />
        <Stack.Screen name="PaymentsSuccesful" component={PaymentSuccesful} />
        <Stack.Screen name="PaymentNotСompleted" component={PaymentNotСompleted} />
        <Stack.Screen name="PaymentMethod" component={PaymentMethod} />
        <Stack.Screen name="ConfirmationCard" component={ConfirmationCard} />
        <Stack.Screen name="Scanner" component={ScannerScreen} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="MyNotes" component={MyNotes} />
        <Stack.Screen name="VehicleData" component={VehicleData} />
        <Stack.Screen name="PersonalData" component={PersonalData} />
        <Stack.Screen name="NoCard" component={NoCard} /> 
        <Stack.Screen name="MyCards" component={MyCards} /> 
        <Stack.Screen name="MyCardsDetails" component={MyCardsDetails} /> 
        <Stack.Screen name="SupportCenter" component={SupportCenter} /> 
        <Stack.Screen name="Settings" component={Settings} /> 
        <Stack.Screen name="History" component={History} /> 
        <Stack.Screen name="TransferEntry" component={TransferEntry} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}