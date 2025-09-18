import axios from 'axios';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

interface Location {
    id: number;
    latitude: number;
    longitude: number;
    link: string;
    name: string;
    address: string;
}

// Biar marker muncul
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

export default function LocationMap() {
    const [locations, setLocations] = useState<Location[]>([]);

    useEffect(() => {
        axios
            .get<Location[]>('/api/locations')
            .then((response) => setLocations(response.data))
            .catch((error) => console.error('Error fetching locations:', error));
    }, []);

    return (
        <div className="relative z-0 flex h-[75vh] w-full flex-col items-center justify-center bg-black pb-8">
            <div className="mx-auto flex h-full w-full max-w-6xl flex-col items-center justify-center">
                <MapContainer
                    center={[0, 118]}
                    zoom={window.innerWidth < 768 ? 4 : 5}
                    zoomControl={true}
                    scrollWheelZoom={false}
                    doubleClickZoom={true}
                    dragging={true}
                    touchZoom={true}
                    style={{ height: '100%', width: '100%' }}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://carto.com/">CARTO</a>'
                        url="https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
                    />

                    {/* Render API locations */}
                    {locations.map((loc) => (
                        <Marker key={loc.id} position={[loc.latitude, loc.longitude]}>
                            <Popup>
                                <a href={loc.link} target="_blank" rel="noopener noreferrer" className="text-blue-600">
                                    <p className="mb-2 border-b pb-1 text-lg font-bold text-blue-600 hover:text-blue-800 hover:underline">
                                        {loc.name}
                                    </p>
                                </a>
                                <div className="space-y-1.5 text-sm">
                                    <div className="flex items-center justify-center">
                                        <span>{loc.address}</span>
                                    </div>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </div>
    );
}
