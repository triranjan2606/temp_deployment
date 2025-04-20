import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import dummy from "../assets/dummy.json";
import { divIcon, Icon, point } from "leaflet";
import marker from "../assets/marker.png";
import MarkerClusterGroup from "react-leaflet-cluster";
import { HeatmapLayer } from "react-leaflet-heatmap-layer-v3";

const MapWithPointers = ({ cases, isHeatmap }) => {
  // console.log("sa",cases);
  
  const customIcon = new Icon({
    iconUrl: marker,
    iconSize: [40, 40],
  });
  // custom cluster icon
  const createClusterCustomIcon = function (cluster) {
    return new divIcon({
      html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
      className: "custom-marker-cluster",
      iconSize: point(33, 33, true),
    });
  };
  const heatmapCountMap = {};
  // 🔥 Step 1: Count victims per location
  cases.forEach((item) => {
    item.data?.nodes?.forEach((node) => {
      const lat = node.gps.latitude;
      const lng = node.gps.longitude;
      const key = `${lat},${lng}`;

      if (heatmapCountMap[key]) {
        heatmapCountMap[key].intensity += 1; // You can use node.gas_ppm or other metric if preferred
      } else {
        heatmapCountMap[key] = {
          lat,
          lng,
          intensity: 1,
        };
      }
    });
  });

  const heatmapPoints = Object.values(heatmapCountMap);
  // console.log("Heatmap Points:", heatmapPoints);

  return (
    <>
      {cases.length > 0 ? (
        <MapContainer
          center={[
            cases[0]?.data.nodes[0].gps.latitude,
            cases[0]?.data.nodes[0].gps.longitude,
            // cases[0]?.nodes[0].gps.latitude,
            // cases[0]?.nodes[0].gps.longitude,
          ]}
          zoom={16}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%" }}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {isHeatmap ? (
            <HeatmapLayer
              fitBoundsOnLoad
              fitBoundsOnUpdate
              points={heatmapPoints}
              longitudeExtractor={(m) => m.lng}
              latitudeExtractor={(m) => m.lat}
              intensityExtractor={(m) => m.intensity}
              radius={40}
              blur={15}
              max={5}
            />
          ) : (
            // <MarkerClusterGroup iconCreateFunction={createClusterCustomIcon}>
            <>
              {cases.map((item, i) =>
                // item.data?.nodes?.map((node, j) => (
                  <Marker
                    // key={`${i}-${j}`}
                    position={[item.data.nodes[0].gps.latitude, item.data.nodes[0].gps.longitude]}
                    icon={customIcon}
                  >
                    {/* <Popup>
                      <div>
                        <strong>Node:</strong> {node.node_id}
                        <br />
                        <strong>Status:</strong> {item.data.victim_status}
                        <br />
                        <strong>Gas PPM:</strong> {node.gas_ppm}
                        <br />
                        <strong>Temp:</strong> {node.temperature}°C
                      </div>
                    </Popup> */}
                  </Marker>
                // ))
              )}
            </>
            // </MarkerClusterGroup>
          )}
        </MapContainer>
      ) : (
        ""
      )}
    </>
  );
};

export default MapWithPointers;
