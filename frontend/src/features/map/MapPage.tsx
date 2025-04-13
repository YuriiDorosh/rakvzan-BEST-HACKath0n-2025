import { Box, Button } from "@mui/material"
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useLazyGetPointsQuery } from "./slices/mapSLice";
import { ReactComponent as MarkerIcon } from './assets/images/marker.svg'
import { customAddIcon, customIcon } from "./components/CustomMarker";
import { BaseCoorsType } from "../../types/baseCoorsType";
import MarkerIconComponent from "./components/MarkerIconComponent";
import MarkerDetailView from "./components/MarkerDetailView";
import { useDispatch } from "react-redux";
import { chaneIsOpen } from "../../app/store/detailMarkerSlice";
import CreateMarkerModal from "./components/CreateMarkerModal";
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import RoutingMachine from "./components/RoutingMachine";
import MapFilterPanel from "./components/MapFilterPanel";
import { AccessibilityListEnum } from "../../utils/getAccessibilityList";
import TuneIcon from '@mui/icons-material/Tune';


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
  const [userPosition, setUserPosition] = useState<BaseCoorsType | null>(null);
  const [endPosition, setEndPosition] = useState<BaseCoorsType | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [accessibilityChecked, setAccessibilityChecked] = useState<boolean>(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState<boolean>(false)

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // setUserPosition({
          //   lat: position.coords.latitude,
          //   lng: position.coords.longitude,
          // });
          setUserPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Помилка отримання геолокації:', error);
          alert('Помилка отримання геолокації')
        }
      );
    } else {
      alert('Ваш браузер не підтримує геолокацію')
      console.error('Ваш браузер не підтримує геолокацію');
    }
  }, []);

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
          '& .leaflet-routing-container: last-child' :{
            display: 'none'
          },
        }}
      >
        <TuneIcon
          sx={{
            position: 'absolute',
            top: '100px',
            zIndex: 500,
            right: '50px'
          }}
          onClick={()=>{
            setIsFiltersOpen(!isFiltersOpen)
          }}
        />
        <MapFilterPanel
          categories={Object.values(AccessibilityListEnum)}
          selectedCategories={selectedCategories}
          onChangeCategories={setSelectedCategories}
          accessibilityChecked={accessibilityChecked}
          onChangeAccessibility={setAccessibilityChecked}
          isOpen={isFiltersOpen}
          handleClose={()=>{
            setIsFiltersOpen(false)
          }}
          onApply={()=>{
            console.log(selectedCategories)
            let filteredKeys: any = []
            console.log(Object.keys(AccessibilityListEnum).forEach((value: string) =>{
              console.log(selectedCategories.includes(AccessibilityListEnum[value as keyof typeof AccessibilityListEnum]))
              if(selectedCategories.includes(AccessibilityListEnum[value as keyof typeof AccessibilityListEnum])){
                filteredKeys[value as keyof typeof filteredKeys] = true
              }
            }))
            triggerGetPoints(filteredKeys)
          }}
          onCancel={()=>{

          }}
        />
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
                      setEndPosition={setEndPosition}
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
            
            {userPosition && endPosition && <RoutingMachine start={userPosition} end={endPosition} />}
            {/* <Polyline positions={positions.map(pos => [pos.lat, pos.lng])} /> */}
          </MapContainer>
      </Box>
      );
}
export default MapPage