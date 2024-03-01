import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';

interface DjerbaMapProps {
  center: LatLngExpression;
  zoom: number;
}

const DjerbaMap: React.FC<DjerbaMapProps> = ({ center, zoom }) => {
  return (
    <div style={{ height: '500px', width: '100%', overflow: 'hidden' }}>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%', position: 'relative' }}
        scrollWheelZoom={false} // Disable scroll wheel zoom
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={center}>
          <Popup>Djerba, Tunisia</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default DjerbaMap;
