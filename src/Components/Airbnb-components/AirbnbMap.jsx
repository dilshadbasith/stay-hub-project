// WorldMap.js
import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../Airbnb-components/Airbnb.css'

const AirbnbMap = () => {
  const asiaCenter = [34.0479, 100.6197]; // Center of Asia
  const defaultZoom = 4;

  return (
    <MapContainer className="MapContainer1" center={asiaCenter} zoom={defaultZoom}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {/* Add more layers or features here as needed */}
    </MapContainer>
  );
};

export default AirbnbMap;
