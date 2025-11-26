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
  const [modelsLoading, setModelsLoading] = useState(false);
  const [brandId, setBrandId] = useState(null);
  const [modelId, setModelId] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [plate, setPlate] = useState("");
  const [image, setImage] = useState(null);
  const [profileData, setProfileData] = useState();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const [markaList, , bodyList, profile] = await Promise.all([
          getMarkas(),
          getModels(),
          getBodies(),
          getProfile(),
        ]);
  
        setProfileData(profile || []);
        setMarkas(markaList || []);
        setBodies(bodyList || []);
  
        let startBrand = null;
  
        if (profile?.marka || profile?.brand_id) {
          startBrand = profile?.marka?.id ?? profile?.brand_id ?? null;
        } else if (markaList && markaList.length > 0) {
          startBrand = markaList[0].id;    // 👈 первая марка из списка
        }
  
        setBrandId(startBrand);
        setPlate(profile?.gos_number ?? "");
        if (profile?.image) setImage({ uri: profile.image });
      } catch (e) {
        Alert.alert("Ошибка", "Не удалось загрузить данные.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  

  useEffect(() => {
    let mounted = true;
    const loadModelsForBrand = async (brand) => {
      if (!brand) {
        setModels([]);
        setModelId(null);
        return;
      }
      setModelsLoading(true);
      setModels([]);
      setModelId(null);
      try {
        const result = await getModels({ marka: brand });
        if (mounted) setModels(result || []);
      } catch (e) {
        console.warn("getModels error:", e);
        if (mounted) Alert.alert("Ошибка", "Не удалось загрузить модели для выбранной марки");
      } finally {
        if (mounted) setModelsLoading(false);
      }
    };
    loadModelsForBrand(brandId);
    return () => {
      mounted = false;
    };
  }, [brandId]);

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
      navigation.navigate("Profile");
    } catch (err) {
      Alert.alert(
        "Ошибка",
        (err?.response?.data && JSON.stringify(err.response.data)) ||
          "Не удалось сохранить"
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
      const label = it.model ?? it.marka ?? it.kuzov ?? String(id);
      return <Picker.Item key={id} label={label} value={id} />;
    });

  const onBrandChange = (val) => {
    setBrandId(val);
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

      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140 }}
      >
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
            <Picker.Item label={/*profileData?.marka ? profileData?.marka :*/ "Выберите марку"} value={profileData?.marka} />
            {renderItems(markas)}
          </Picker>
        </View>

        <AppText style={styles.label}>Модель</AppText>
        <View style={styles.select}>
          <Picker selectedValue={modelId} onValueChange={setModelId} style={styles.picker}>
            <Picker.Item label={modelsLoading ? "Загрузка моделей..." : "Выберите модель"} value={null} />
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
