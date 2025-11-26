import React, { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Text,
  Alert,
  Platform,
} from "react-native";
import * as Camera from "expo-camera";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { StatusBar } from "expo-status-bar";
import Add from "../../assets/images/svg/add.svg"
import Remove from "../../assets/images/svg/remove.svg"
import Document from "../../assets/images/svg/Document.svg"
import Flash from "../../assets/images/svg/flash.svg"

const { width, height } = Dimensions.get("window");
const SCAN_BOX = width * 0.65;

export default function ScannerScreen({ navigation }) {
  const cameraRef = useRef(null);
  const [torchOn, setTorchOn] = useState(false);
  const [zoom, setZoom] = useState(0);

  const CameraView = Camera.CameraView;
  const [permission, requestPermission] = Camera.useCameraPermissions();

  if (!permission) return null;

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={{ color: "#fff", marginBottom: 12 }}>
          Нужен доступ к камере
        </Text>
        <TouchableOpacity
          onPress={requestPermission}
          style={{
            backgroundColor: "#3083FF",
            paddingHorizontal: 20,
            paddingVertical: 12,
            borderRadius: 12,
          }}
        >
          <Text style={{ color: "#fff" }}>Разрешить доступ</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
        <StatusBar
                  style="light" 
                  backgroundColor={styles.container.backgroundColor}
                />
      <CameraView
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        facing="back"
        enableTorch={torchOn}
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
        zoom={zoom}
        onBarcodeScanned={(data) =>
          Alert.alert("QR", JSON.stringify(data, null, 2))
        }
      />

      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.closeBtn}
      >
        <Ionicons name="close" size={26} color="#000" />
      </TouchableOpacity>

      <View style={styles.overlay}>
        <View style={styles.maskTop} >
        <Text style={styles.scanText}>Наведите камеру на QR</Text>
        </View>
        <View style={styles.centerRow}>
          <View style={styles.maskSide} />
          <View style={styles.scanBox}>
            <View style={styles.scanFrame} />
          </View>
          <View style={styles.maskSide} />
        </View>
        <View style={styles.maskBottom}>

          <View style={styles.absolute}>
            <View style={styles.zoomRow}>
            <Remove/>
            <Slider
              style={{ flex: 1, marginHorizontal: 10 }}
              minimumValue={0}
              maximumValue={1}
              value={zoom}
              onValueChange={setZoom}
              minimumTrackTintColor="#3083FF"
              maximumTrackTintColor="#fff"
            />
            <Add/>
          </View>

          <View style={styles.bottomRow}>
            <TouchableOpacity
              style={styles.instructionBtn}
              onPress={() =>
                Alert.alert("Инструкция", "Поднесите QR-код к центру рамки")
              }
            >
              <Document/>
              <Text style={styles.instructionText}>Инструкция</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.flashBtn}
              onPress={() => setTorchOn((prev) => !prev)}
            >
              <Flash/>
            </TouchableOpacity>
          </View>
          </View>
          
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000000B8" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },

  overlay: { flex: 1 },
  maskTop: {
    flex: 1,
    backgroundColor: "#000000B8",
    maxHeight:"30%",
    alignItems:"center",

  },
  centerRow: { flexDirection: "row" },
  maskSide: {
    flex: 1,
    backgroundColor: "#000000B8",
  },
  scanBox: {
    width: SCAN_BOX,
    height: SCAN_BOX,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  scanFrame: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderWidth: 4,
    borderRadius: 20,
    borderColor: "#fff",
    opacity: 0.9,
  },
  maskBottom: {
    flex: 1,
    backgroundColor: "#000000B8",
    alignItems: "center",
    paddingTop: 16,
  },
  absolute:{
    alignItems:"center",
    width:"100%",
    position:"absolute",
    bottom:25,
  },
  scanText: {
    color: "#fff",
    fontSize: 16,
    fontWeight:500,
    position:"absolute",
    bottom:90,
  },
  zoomRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
    marginBottom: 33,
  },
  bottomRow: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  instructionBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    height: 60,
    borderRadius: 100,
    marginRight: 8,
  },
  instructionText: { color: "#000", marginLeft: 10, fontSize: 16 },
  flashBtn: {
    width: 60,
    height: 60,
    borderRadius: 28,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  closeBtn: {
    position: "absolute",
    top: Platform.OS === "ios" ? 60 : 40,
    right: 16,
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
});
