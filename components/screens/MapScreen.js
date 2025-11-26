import React, { useMemo } from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity, Text, Linking } from "react-native";
import { WebView } from "react-native-webview";

const { width } = Dimensions.get("window");

const build2gisLinks = (latitude, longitude) => {
  const lat = Number(latitude);
  const lon = Number(longitude);
  if (isNaN(lat) || isNaN(lon)) return null;
  const deep = `dgis://2gis.ru/geo/${lon},${lat}`;
  const web = `https://2gis.ru/geo/${lon},${lat}`;
  return { deep, web };
};

const open2gis = async (latitude, longitude) => {
  const links = build2gisLinks(latitude, longitude);
  if (!links) return;
  try {
    await Linking.openURL(links.deep);
  } catch (e) {
    try {
      await Linking.openURL(links.web);
    } catch (err) {
      console.warn("Cannot open 2GIS:", err);
    }
  }
};

export default function MapScreen({ points = [] }) {
  const apiKey = "d58721d9-cda5-453b-bead-0089419322e6";

  const safePoints = useMemo(
    () =>
      (points || [])
        .map((p) => ({
          id: p.id ?? null,
          name: p.name ?? "",
          latitude: Number(p.latitude),
          longitude: Number(p.longitude),
        }))
        .filter((p) => !isNaN(p.latitude) && !isNaN(p.longitude)),
    [points]
  );

  const html = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <script src="https://maps.api.2gis.ru/2.0/loader.js?pkg=full&key=${apiKey}"></script>
      <style>
        html, body, #map { height:100%; width:100%; margin:0; padding:0; }
        .dot {
  width: 20px;
  height: 20px;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}
.dot-icon {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #2F95FF;
  display: flex;
  align-items: center;
  justify-content: center;
}
.dot-icons {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #ffffff;
}
  .box{ position: absolute; right: 12px; top: 45%; } .navigate{ width:60px; height:60px; background: #fff; border-radius: 100px; margin-bottom:10px; display: flex; align-items: center; justify-content: center; } .zoom-box { width: 60px; height: auto; background: #fff; border-radius: 100px; box-shadow: 0 8px 20px rgba(0,0,0,0.12); display: flex; flex-direction: column; overflow: hidden; z-index: 9999; } .zoom-btn { width: 100%; height: 52px; display: flex; align-items: center; justify-content: center; font-size: 28px; color: #000; user-select: none; }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <div class="box"> <div class="navigate"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M22 2L11 13" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/> <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/> </svg> </div> <div class="zoom-box"> <div id="zoomIn" class="zoom-btn">+</div> <div id="zoomOut" class="zoom-btn">−</div> </div> </div>
      <script>
        (function(){
          try {
            var data = ${JSON.stringify(safePoints)};
            data = Array.isArray(data) ? data : [];
            DG.then(function () {
              var center = data.length ? [data[0].latitude, data[0].longitude] : [42.8746, 74.5698];
              var map = DG.map('map', { center: center, zoom: 13, zoomControl: false });
              var bounds = [];
              data.forEach(function(item){
                var coords = [Number(item.latitude), Number(item.longitude)];
                var icon = L.divIcon({ className: '', html: '<div class="dot"><div class="dot-icon"><div class="dot-icons"></div></div></div>', iconSize: [14, 14], iconAnchor: [7, 7] });
                var marker = DG.marker(coords, { icon: icon }).addTo(map);
                var lon = Number(item.longitude);
                var lat = Number(item.latitude);
                var deep = 'dgis://2gis.ru/geo/' + lon + ',' + lat;
                var web = 'https://2gis.ru/geo/' + lon + ',' + lat;
                var htmlContent = '<div style="padding:6px 8px;font-family:sans-serif;"><div style="margin-bottom:8px;">' + (item.name||'Место') + '</div><a href="' + deep + '" target="_blank" style="text-decoration:none;color:#2F95FF;">Открыть в 2ГИC</a></div>';
                marker.bindPopup(htmlContent);
                bounds.push(coords);
              });
              if (bounds.length > 0) map.fitBounds(bounds, { padding: [40, 40] });
              if (window.ReactNativeWebView && window.ReactNativeWebView.postMessage) window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'map-ready', count: data.length }));
            });
          } catch (err) {
            if (window.ReactNativeWebView && window.ReactNativeWebView.postMessage) window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'error', message: err.message }));
          }
        })();
      </script>
    </body>
  </html>
  `;

  const firstPoint = safePoints.length ? safePoints[0] : null;

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={["*"]}
        source={{ html }}
        javaScriptEnabled
        domStorageEnabled
        key={safePoints.length}
        onMessage={(e) => {
          try {
            const msg = JSON.parse(e.nativeEvent.data);
            console.log("MapScreen WebView:", msg);
          } catch (err) {
            console.log("MapScreen WebView parse err:", err);
          }
        }}
      />
      {/* {firstPoint && (
        <TouchableOpacity style={styles.openBtn} onPress={() => open2gis(firstPoint.latitude, firstPoint.longitude)}>
          <Text style={styles.openBtnText}>Открыть в 2ГИС</Text>
        </TouchableOpacity>
      )} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, width: width - 32, alignSelf: "center", borderRadius: 20, overflow: "hidden" },
  openBtn: { position: "absolute", left: 16, bottom: 16, backgroundColor: "#fff", paddingHorizontal: 14, paddingVertical: 10, borderRadius: 12, elevation: 3 },
  openBtnText: { fontSize: 15, color: "#2F95FF" },
})