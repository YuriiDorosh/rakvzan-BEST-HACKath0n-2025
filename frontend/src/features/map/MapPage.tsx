import { Box } from "@mui/material"
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useLazyGetPointsQuery } from "./mapSLice";


const positions = [
    { lat: 50.4501, lng: 30.5234 }, // Київ
    { lat: 49.8397, lng: 24.0297 }, // Львів
    { lat: 48.4647, lng: 35.0462 }  // Одеса
  ];

const MapPage = () => {
  const [tempMark, setTempMark] = useState<{lng: number, lat: number} | null>(null)

  const [triggerGetPoints] = useLazyGetPointsQuery({})

  useEffect(() => {
    triggerGetPoints({})
  }, [])

    return (
        <MapContainer center={[49.8397, 24.0297]} zoom={16} style={{ height: "100svh", width: "100%", borderRadius: '15px' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {positions.map((position, idx) => (
            <Marker key={`marker-${idx}`} position={[position.lat, position.lng]}>
              <Popup>
                Точка: {position.lat}, {position.lng}
              </Popup>
            </Marker>
          ))}
          {tempMark &&
            <Marker position={[tempMark.lat, tempMark.lng]}>
            <Popup>
              Точка: {tempMark.lat}, {tempMark.lng}
            </Popup>
          </Marker>
          }
          <Polyline positions={positions.map(pos => [pos.lat, pos.lng])} />
        </MapContainer>
      );
}
export default MapPage