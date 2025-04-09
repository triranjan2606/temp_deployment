import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import dummy from "../assets/dummy.json";
import { divIcon, Icon, point } from "leaflet";
import marker from "../assets/marker.png";
import MarkerClusterGroup from "react-leaflet-cluster";

const MapWithPointers = ({ cases }) => {
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
  return (
    <>
      {cases.length > 0 ? (
        <MapContainer
          center={[
            cases[0]?.data.nodes[0].gps.latitude,
            cases[0]?.data.nodes[0].gps.longitude,
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
          <MarkerClusterGroup
            chunkedLoading
            iconCreateFunction={createClusterCustomIcon}
          >
            {cases.map((data, caseIndex) =>
              data.data.nodes.map((node, nodeIndex) => (
                <Marker
                  key={`${caseIndex}-${node.node_id}`}
                  position={[node.gps.latitude, node.gps.longitude]}
                  icon={customIcon}
                >
                  <Popup>
                    <div>
                      <strong>Case ID:</strong> {caseIndex + 1}
                      <br />
                      <strong>Node:</strong> {node.node_id}
                      <br />
                      <strong>Doppler:</strong> {node.doppler_speed}
                      <br />
                      <strong>Gas PPM:</strong> {node.gas_ppm}
                      <br />
                      <strong>Temp (°C):</strong> {node.temperature}
                      <br />
                      <strong>Status:</strong> {data.victim_status}
                    </div>
                  </Popup>
                </Marker>
              ))
            )}
          </MarkerClusterGroup>
        </MapContainer>
      ) : (
        ""
      )}
    </>
  );
};

export default MapWithPointers;
