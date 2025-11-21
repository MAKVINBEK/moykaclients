// VehicleData.js
import React, { useEffect, useState, useCallback } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppText from "../../AppText";
import Arrow from "../../assets/images/svg/arrow.svg";
import Change from "../../assets/images/svg/change.svg";
import { Picker } from "@react-native-picker/picker";
import { StatusBar } from "expo-status-bar";
import {
  getMarkas,
  getModels,
  getBodies,
  getProfile,
  patchMyCarProfile,
} from "../../AuthService";

export const VehicleData = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [markas, setMarkas] = useState([]);
  const [models, setModels] = useState([]);
  const [bodies, setBodies] = useState([]);

  const [brandId, setBrandId] = useState(null);
  const [modelId, setModelId] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [plate, setPlate] = useState("");
  const [image, setImage] = useState(null); // { uri }

  const [profileData, setProfileData] = useState();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const [markaList, modelList, bodyList, profile] = await Promise.all([
          getMarkas(),
          getModels(),
          getBodies(),
          getProfile(),
        ]);
        console.log(modelList);
        

        setProfileData(profile || [])
        setMarkas(markaList || []);
        setModels(modelList || []);
        setBodies(bodyList || []);
console.log(profile);

        

        const resolveId = (val) => {
          if (val == null) return null;
          if (typeof val === "object") return val.id ?? null;
          return val;
        };

        setBrandId(resolveId(profile?.brand ?? profile?.marka ?? profile?.brand_id));
        setModelId(resolveId(profile?.model ?? profile?.model_id));
        setCategoryId(resolveId(profile?.category ?? profile?.body ?? profile?.category_id));
        setPlate(profile?.number ?? profile?.number_plate ?? "");
        if (profile?.image) setImage({ uri: profile.image });
      } catch (e) {
        console.warn("Load VehicleData error:", e);
        Alert.alert("Ошибка", "Не удалось загрузить данные. Попробуйте ещё раз.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  

  const onSave = useCallback(async () => {
    setSaving(true);
    try {
      const payload = {
        marka: brandId,
        model: modelId,
        body: categoryId,
        gos_number: plate,
      };

      await patchMyCarProfile(payload);
      navigation.goBack();
    } catch (err) {
      console.warn("PATCH error:", err);
      Alert.alert(
        "Ошибка",
        (err?.response?.data && JSON.stringify(err.response.data)) || "Не удалось сохранить"
      );
    } finally {
      setSaving(false);
    }
  }, [brandId, modelId, categoryId, plate, navigation]);


  if (loading) {
    return (
      <SafeAreaView style={styles.safe}>
        <ActivityIndicator size="large" style={{ marginTop: 120 }} />
      </SafeAreaView>
    );
  }

  const renderItems = (list) =>
    (list || []).map((it) => {
      const id = it.id;
      const label = it.model ?? it.marka ?? it.kuzov ??  String(id);
      return <Picker.Item key={id} label={label} value={id} />;
    });

  // When brand changes, clear model selection (common UX)
  const onBrandChange = (val) => {
    setBrandId(val);
    setModelId(null);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" backgroundColor={styles.safe.backgroundColor} />
      <View style={styles.row}>
        <TouchableOpacity style={styles.next} onPress={() => navigation.goBack()}>
          <Arrow />
        </TouchableOpacity>
        <AppText style={styles.title}>Данные о машине</AppText>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.block}>
          <TouchableOpacity style={styles.change}>
            <Change />
          </TouchableOpacity>
          <Image
            source={image ? { uri: image.uri } : require("../../assets/images/mers.png")}
            style={{ width: 200, height: 120, resizeMode: "contain" }}
          />
        </View>

        <AppText style={styles.label}>Марка</AppText>
        <View style={styles.select}>
          <Picker selectedValue={brandId} onValueChange={onBrandChange} style={styles.picker}>
            <Picker.Item label={profileData?.marka?profileData?.marka:"Выберите марку"} value={null} />
            {renderItems(markas)}
          </Picker>
        </View>

        <AppText style={styles.label}>Модель</AppText>
        <View style={styles.select}>
          <Picker selectedValue={modelId} onValueChange={setModelId} style={styles.picker}>
            <Picker.Item label="Выберите модель" value={null} />
            {renderItems(models)}
          </Picker>
        </View>

        <AppText style={styles.label}>Категория</AppText>
        <View style={styles.select}>
          <Picker selectedValue={categoryId} onValueChange={setCategoryId} style={styles.picker}>
            <Picker.Item label="Выберите категорию" value={null} />
            {renderItems(bodies)}
          </Picker>
        </View>

        <AppText style={styles.label}>Госномер</AppText>
        <TextInput
          style={[styles.select, { paddingHorizontal: 20 }]}
          value={plate}
          onChangeText={setPlate}
          placeholder="01KG123ABC"
        />

        <TouchableOpacity
          style={[styles.button, saving && { opacity: 0.6 }]}
          onPress={onSave}
          disabled={saving}
        >
          {saving ? <ActivityIndicator /> : <AppText style={styles.buttonText}>Изменить</AppText>}
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
    marginBottom: 35,
  },
  next: {
    width: 60,
    height: 60,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },
  title: {
    color: "#2B2929",
    fontSize: 20,
    fontWeight: "700",
  },
  block: {
    backgroundColor: "#fff",
    borderRadius: 30,
    padding: 10,
    marginBottom: 16,
    alignItems: "center",
    height: 180,
  },
  change: {
    width: 52,
    height: 52,
    borderRadius: 100,
    borderColor: "#3083FF",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 10,
    right: 10,
  },
  label: {
    color: "#2B2929",
    fontWeight: "500",
    marginTop: 20,
    marginBottom: 6,
  },
  select: {
    backgroundColor: "#fff",
    height: 60,
    borderRadius: 100,
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  arrow: {
    position: "absolute",
    right: 28,
    top: 22,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    transform: [{ rotate: "270deg" }],
  },
  button: {
    backgroundColor: "#3083FF",
    height: 60,
    borderRadius: 100,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
