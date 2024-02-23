import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';


// eslint-disable-next-line react/prop-types
const MapComponent = ({ nombre }) => {
   useEffect(() => {
      // eslint-disable-next-line no-undef
      const map = L.map('map-id').setView([40.965, -5.664], 15);
     // eslint-disable-next-line no-undef
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
         attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
    // eslint-disable-next-line no-undef
      L.marker([40.965, -5.664])
         .addTo(map)
         .bindPopup(nombre)
         .openPopup();

      return () => {
         // Limpiar el mapa cuando el componente se desmonta
         map.remove();
      };
   }, [nombre]);

   return <div id="map-id" style={{ height: '400px', width: '100%' }} />;
};

export default MapComponent;
