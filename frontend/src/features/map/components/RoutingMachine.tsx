import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine'; // Імпортуємо плагін
import '../assets/locales/locales'

// Інтерфейс для передачі координат старту та фінішу
interface RoutingProps {
  start: { lat: number; lng: number };
  end: { lat: number; lng: number };
}

const RoutingMachine: React.FC<RoutingProps> = ({ start, end }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;
    //@ts-ignore
    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(start.lat, start.lng),
        L.latLng(end.lat, end.lng)
      ],
      language: 'uk',
      routeWhileDragging: true,
        //@ts-ignore
      createMarker: function(i, wp, nWps) {
        return L.marker(wp.latLng, {
          icon: L.icon({
            iconUrl: i === 0 ? 'start.png' : i === nWps - 1 ? 'end.png' : 'waypoint.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41]
          })
        });
      }
    });

    routingControl.addTo(map);

    // () => map.removeControl(routingControl);
  }, [map, start, end]);

  return null;
};

export default RoutingMachine;
