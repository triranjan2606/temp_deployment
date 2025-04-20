import { Icon } from "leaflet";
import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import marker from "../assets/marker.png";

const SinglePointMap = ({ gps }) => {
  const customIcon = new Icon({
    iconUrl: marker,
    iconSize: [50, 50],
  });
  console.log("gio", gps);

  return (
    <>
      <MapContainer
        center={[gps.latitude, gps.longitude]}
        zoom={20}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[gps.latitude, gps.longitude]} icon={customIcon}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </>
  );
};

export default SinglePointMap;
