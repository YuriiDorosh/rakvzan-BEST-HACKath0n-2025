import L from 'leaflet';
import MarkerIcon from '../assets/images/marker.svg';
import addMarkerIcon from '../assets/images/addMarker.svg';

export const customIcon = L.icon({
    iconUrl: MarkerIcon, 
    iconRetinaUrl: MarkerIcon,
    iconSize: [80, 80],
    iconAnchor: [40, 80],
    popupAnchor: [0, -80],

  });

export const customAddIcon = L.icon({
  iconUrl: addMarkerIcon,
  iconRetinaUrl: addMarkerIcon,
  iconSize: [80, 80],
  iconAnchor: [40, 80],
  popupAnchor: [0, -80],

});