import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import dummy from "../assets/dummy.json";
import { divIcon, Icon, point } from "leaflet";
import marker from "../assets/marker.png";
import MarkerClusterGroup from "react-leaflet-cluster";

const MapWithPointers = () => {
  const customIcon = new Icon({
    iconUrl: marker,
    iconSize: [38, 38],
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
      <MapContainer
        center={[26.917443, 75.79074]}
        zoom={15}
        scrollWheelZoom={false}
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
          {dummy.map((data, index) => (
            <Marker
              position={[data.Latitude, data.Longitude]}
              icon={customIcon}
            >
              <Popup>
                Case Id : {index+1} <br /> Status : Pending
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </>
  );
};

export default MapWithPointers;
