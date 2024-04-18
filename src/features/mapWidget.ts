import 'leaflet/dist/leaflet.css';
import * as L from 'leaflet';

export function createMapWidget(containerDomNode: HTMLElement) {
  const lMap = L.map(containerDomNode);
  lMap.setView([49.575, 32.091], 6);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(lMap);
  return lMap;
}

export function addPopupToMapWidget(map: L.Map) {
  const popup = document.createElement('div');
  L.popup().setLatLng([50.4488, 30.5222]).setContent(popup).openOn(map);
  return popup;
}
