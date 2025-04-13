import { Box, Button } from "@mui/material"
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useLazyGetPointsQuery } from "./components/slices/mapSLice";
import { ReactComponent as MarkerIcon } from './assets/images/marker.svg'
import { customAddIcon, customIcon } from "./components/CustomMarker";
import { BaseCoorsType } from "../../types/baseCoorsType";
import MarkerIconComponent from "./components/MarkerIconComponent";
import MarkerDetailView from "./components/MarkerDetailView";
import { useDispatch } from "react-redux";
import { chaneIsOpen } from "../../app/store/detailMarkerSlice";
import CreateMarkerModal from "./components/CreateMarkerModal";

function ClickHandler({ onMapClick }: any) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      onMapClick(e.latlng);
    }
  });
  return null;
}

const MapPage = () => {
  const [tempMark, setTempMark] = useState<BaseCoorsType | null>(null)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)

  const [triggerGetPoints, data] = useLazyGetPointsQuery({})

  const dispatch = useDispatch()

  useEffect(() => {
    triggerGetPoints({})
  }, [])

  useEffect(() => {
    dispatch(chaneIsOpen(false))
  }, [tempMark])

    return (
      <Box
        sx={{
          '& .leaflet-popup-content-wrapper' :{
            width: '600px',
            display: 'flex',
            justifyContent: 'center'
          },
          '& .leaflet-popup-content' :{
            width: 'calc(100% - 60px) !important',
            display: 'flex',
            justifyContent: 'center'
          },
        }}
      >
        <CreateMarkerModal
          isOpen={isCreateModalOpen}
          handleClose={()=>{
            setIsCreateModalOpen(false)
          }}
          lat={tempMark?.lat || 0}
          lng={tempMark?.lng || 0}
        />
          <MarkerDetailView/>
          <MapContainer center={[49.8397, 24.0297]} zoom={16} style={{ height: "100svh", width: "100%", borderRadius: '15px' }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <ClickHandler onMapClick={(coors: BaseCoorsType)=>{
              if (tempMark) {
                setTempMark(null)
              } else {
                setTempMark({lng: coors.lng, lat: coors.lat})
              }
            }} />
            {data?.data?.data?.length > 0 && data?.data?.data?.map((position: any, idx: number) => {
              return ( <Marker key={`marker-${idx}`} position={[position.latitude, position.longitude]} icon={customIcon}>
                  <Popup>
                    <MarkerIconComponent
                      id={position.id}
                    />
                  </Popup>
                </Marker>)
              })
            }
            {tempMark &&
              <Marker position={[tempMark.lat, tempMark.lng]} icon={customAddIcon}>
                <Popup>
                    <Button
                      variant="contained"
                      onClick={()=>{
                        setIsCreateModalOpen(true)
                      }}
                    >
                      Запропонувати локацію
                    </Button>
                  </Popup>
              </Marker>
            }
            {/* <Polyline positions={positions.map(pos => [pos.lat, pos.lng])} /> */}
          </MapContainer>
      </Box>
      );
}
export default MapPage