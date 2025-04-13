import L from 'leaflet';
import 'leaflet-routing-machine';

//@ts-ignore
L.Routing.Localization['uk'] = {
  directions: {
    N: 'північ',
    NE: 'північний схід',
    E: 'схід',
    SE: 'південний схід',
    S: 'південь',
    SW: 'південний захід',
    W: 'захід',
    NW: 'північний захід',
    SlightRight: 'злегка праворуч',
    Right: 'праворуч',
    SharpRight: 'різко праворуч',
    SlightLeft: 'злегка ліворуч',
    Left: 'ліворуч',
    SharpLeft: 'різко ліворуч',
    Uturn: 'розворот'
  },
  instructions: {
    Head: 'Рухайтеся',
    Continue: 'Продовжуйте',
    SlightRight: 'Злегка праворуч',
    Right: 'Праворуч',
    SharpRight: 'Різко праворуч',
    TurnAround: 'Розверніться',
    SlightLeft: 'Злегка ліворуч',
    Left: 'Ліворуч',
    SharpLeft: 'Різко ліворуч',
    WaypointReached: 'Точка досягнута',
    Roundabout: 'на кільці',
    DestinationReached: 'Пункт призначення досягнуто'
  }
};
