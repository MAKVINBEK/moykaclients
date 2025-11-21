// MapScreen.js
import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { WebView } from "react-native-webview";

const { width } = Dimensions.get("window");

export default function MapScreen() {
  const apiKey = "d58721d9-cda5-453b-bead-0089419322e6";

  const html = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <script src="https://maps.api.2gis.ru/2.0/loader.js?pkg=full&key=${apiKey}"></script>

      <style>
        html, body, #map { height:100%; width:100%; margin:0; padding:0; }

        /* маркеры */
        .dot-icon {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #ffffff;
          border: 2px solid #2F95FF;
          box-shadow: 0 0 0 4px rgba(47,149,255,0.16);
        }

        /* КРАСИВЫЕ КНОПКИ + - */
        .box{
        position: absolute;
          right: 12px;
          top: 45%;
        }
          .navigate{
          width:60px;
          height:60px;
          background: #fff;
          border-radius: 100px;
          margin-bottom:10px;
          display: flex;
          align-items: center;
          justify-content: center;
          }
        .zoom-box {
          width: 60px;
          height: auto;
          background: #fff;
          border-radius: 100px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.12);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          z-index: 9999;
        }

        .zoom-btn {
          width: 100%;
          height: 52px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          color: #000;
          user-select: none;
        }
      </style>
    </head>

    <body>
      <div id="map"></div>


       <div class="box">
       <div class="navigate"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"
     xmlns="http://www.w3.org/2000/svg">
  <path d="M22 2L11 13" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

</div>
      <div class="zoom-box">
        <div id="zoomIn" class="zoom-btn">+</div>
        <div id="zoomOut" class="zoom-btn">−</div>
      </div>
      </div>

      <script>
        DG.then(function () {
          var map = DG.map('map', {
            center: [42.8746, 74.5698],
            zoom: 14,
            zoomControl: false
          });

          // Маркеры
          var points = [
            [42.8802, 74.6193],
            [42.8746, 74.5698],
            [42.8675, 74.5750],
            [42.8620, 74.6040],
            [42.8490, 74.5980],
            [42.8780, 74.5880]
          ];

          var bounds = [];

          points.forEach(function(coords){
            var icon = L.divIcon({
              className: '',
              html: '<div class="dot-icon"></div>',
              iconSize: [14, 14],
              iconAnchor: [7, 7]
            });
            DG.marker(coords, { icon: icon }).addTo(map);
            bounds.push(coords);
          });

          map.fitBounds(bounds, { padding: [40, 40] });

          // наши кнопки зума
          document.getElementById('zoomIn').onclick = () => map.zoomIn();
          document.getElementById('zoomOut').onclick = () => map.zoomOut();
        });
      </script>
    </body>
  </html>
  `;

  return (
    <View style={styles.container}>
      <WebView originWhitelist={["*"]} source={{ html }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width - 32,
    alignSelf: "center",
    borderRadius: 20,
    overflow: "hidden",
  },
});
