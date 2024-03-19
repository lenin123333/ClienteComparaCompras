import  { useEffect, useState, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

import useShoopingCart from '../../hooks/useShoopingCart';

const MapShoopingCar = () => {
    const { ubiStore } = useShoopingCart();
    const [userLocation, setUserLocation] = useState(null);
    const mapRef = useRef(null);
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setUserLocation([latitude, longitude]);
            },
            (error) => {
                console.error('Error obteniendo la ubicación del usuario:', error.message);
            }
        );
    }, []);

    useEffect(() => {
        if (!userLocation) return;
        const map = L.map('map-id').setView(userLocation, 14);
        mapRef.current = map;

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        const waypoints = ubiStore.map((store) => ({
            lat: store.lat[0],
            lon: store.long[0],
        }));

        L.Routing.control({
            show: false,
            addWaypoints: false,
            draggableWaypoints: false,
            fitSelectedRoutes: false,
            waypoints: [userLocation, ...waypoints],
        }).addTo(map);

        ubiStore.forEach((store) => {
            const { lat, long, storeName } = store;
            const marker = L.marker([lat[0], long[0]]).addTo(map);
           
            marker.bindPopup(`<h2 class="text-sky-600 z-auto relative font-bold text-xl">${storeName[0]}</h2>`);
        });
        const marker = L.marker([userLocation[0],userLocation[1]]).addTo(map);
           
        marker.bindPopup(`<h2 class="text-sky-600 z-auto relative font-bold text-xl">Mi Ubicación</h2>`);
        return () => {
            map.remove();
        };
    }, [userLocation, ubiStore]);

    

    return (
        <div className='lg:mt-28 lg:ml-10 md:mt-60 md:ml-0   ' style={{ 
            position: 'relative', 
            height: '90%', 
            width: '100%',
            
              }}
              >
            <div id="map-id"  style={{ height: '100%', width: '100%' }} />
            
        </div>
    );
};

export default MapShoopingCar;
