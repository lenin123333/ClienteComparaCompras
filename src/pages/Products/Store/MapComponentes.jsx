/* eslint-disable no-undef */
import { useEffect, useRef } from 'react';
import {  } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import clienteAxios from '../../../config/axios';

// eslint-disable-next-line react/prop-types
const MapComponent = ({ setLat, setLong,stores,setStores }) => {
   const markerRef = useRef(null);
   const navigate = useNavigate();
   
   useEffect(() => {
      const getData = async () => {
         const token = localStorage.getItem('token');
         if (!token) {
            console.log("error");
         }
         const config = {
            headers: {
               'Content-Type': 'application/json',
               Authorization: `Bearer ${token}`
            }
         };

         try {
            const { data } = await clienteAxios('/products/store', config);
            setStores(data);
         } catch (error) {
            navigate('/productos');
         }
      };

        // Llamar a getData solo si products está vacío
        // eslint-disable-next-line react/prop-types
        if (stores.length === 0) {
         getData();
      }

      
      const map = L.map('map-id').setView([17.555095, -99.506300], 14);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
         attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

     // Agregar marcadores y popups para cada producto
     // eslint-disable-next-line react/prop-types
     stores.forEach((store) => {
      const { lat, long, name } = store;

      const marker = L.marker([lat, long]).addTo(map);
         marker.bindPopup(`<h2 class=" text-sky-600 font-bold text-xl">${name}</h2>`)
      });
     
      // Agregar evento de clic al mapa
      map.on('click', (e) => {
         const { lat, lng } = e.latlng;

         // Actualizar posición del marcador
         if (markerRef.current) {
            markerRef.current.setLatLng([lat, lng]);
         } else {
            // Crear un nuevo marcador si no existe
            const newMarker = L.marker([lat, lng]).addTo(map);
            newMarker.bindPopup('<h2 class=" text-sky-600 font-bold text-xl">Agrega una nueva tienda aquí</h2>').openPopup();
            markerRef.current = newMarker;
         }

         // Actualizar coordenadas en el estado
         setLat(lat);
         setLong(lng);
      });

      return () => {
         // Limpiar el mapa cuando el componente se desmonta
         map.remove();
      };
   }, [setLat, setLong, navigate, stores]);

   return <div id="map-id" style={{ height: '400px', width: '100%' }} />;
};

export default MapComponent;
