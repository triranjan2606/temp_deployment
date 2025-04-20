import React from "react";
import { MapContainer, TileLayer, Polygon, Tooltip } from "react-leaflet";
import * as turf from "@turf/turf";

const DashbordMap = ({ cases }) => {
  // This should be inside your component or outside if data is static
  const positions = cases.flatMap((item) =>
    item.data?.nodes?.map((node) => [node.gps.longitude, node.gps.latitude])
  );
  console.log(positions);

  // Convert points to GeoJSON Features
  const features = positions.map((coord) => turf.point(coord));

  // Create a FeatureCollection
  const featureCollection = turf.featureCollection(features);

  // Get the convex hull
  const hull = turf.convex(featureCollection);

  // Convert back to Leaflet format: [lat, lng]
  const outerBoundary = hull.geometry.coordinates[0].map(([lng, lat]) => [
    lat,
    lng,
  ]);
  return (
    <>
      <MapContainer
        center={[positions[0][1], positions[0][0]]}
        zoom={20}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.png"
        />
        <Polygon
          positions={outerBoundary}
          pathOptions={{
            color: "red",
            fillColor: "red",
            fillOpacity: 0.2,
          }}
        >
          <Tooltip sticky direction="top">
            <span className="text-2xl">Affected Area</span>
          </Tooltip>
        </Polygon>
      </MapContainer>
    </>
  );
};

export default DashbordMap;
