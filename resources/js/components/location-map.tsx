import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

// Biar marker muncul
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

export default function LocationMap() {
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
                    maxBounds={[
                        [-11, 94],
                        [6, 141],
                    ]}
                    maxBoundsViscosity={1}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://carto.com/">CARTO</a>'
                        url="https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
                    />
                    {[
                        {
                            position: [-6.117160858656681, 106.77083705355722],
                            link: 'https://maps.app.goo.gl/xyBjwypbdDLiSVi4A',
                            name: 'PT Mitra Teknindo Sejati',
                            address:
                                'Komplek Galeri Niaga Mediterania, Pantai Indah No.1 Blok. X3 No. G8A-8B, Kapuk, Kecamatan Penjaringan, Jkt Utara, Daerah Khusus Ibukota Jakarta 14460',
                        },
                        {
                            position: [-6.252559999741867, 106.4908825],
                            link: 'https://maps.app.goo.gl/8LiV92KiyBbp2EKu8',
                            name: 'PT. MITRA TEKNINDO SEJATI (Tangerang Warehouse)',
                            address:
                                'Millenium Industrial Estate, Jl. Pemda Tigaraksa No.3 Blok P2, Mata Gara, Kec. Tigaraksa, Kabupaten Tangerang, Banten 15710',
                        },
                        {
                            position: [-0.5380671770893356, 117.1505966761656],
                            link: 'https://maps.app.goo.gl/WzC1UBWAfN8f2XsJ6',
                            name: 'PT. MITRA TEKNINDO SEJATI (Samarinda Branch)',
                            address: ' Jl. Ampera Pergudangan Mangkupalas Bisnis Center Blok D20 Simpang Pasir Palaran, Samarinda, Kalimantan Timur.',
                        },
                        {
                            position: [-7.360232545742982, 112.67532153761434],
                            link: 'https://maps.app.goo.gl/rBQXgFDrTd3Qcuqg9',
                            name: 'PT. MITRA TEKNINDO SEJATI (Surabaya Branch)',
                            address: 'Jl. Raya Gilang 8, Gilang, Kec. Taman, Sidoarjo, Jawa Timur.',
                        },
                        {
                            position: [-4.7274475866691805, 119.68996582684022],
                            link: 'https://maps.app.goo.gl/Fed3z69hbaVyuoHz6',
                            name: 'PT. MITRA TEKNINDO SEJATI (Makassar Branch)',
                            address: 'Kawasan Ruko Insignia Residence No A12B, Jl. Perintis Kemerdekaan KM16, Makassar - Sulawesi',
                        },
                    ].map((loc, idx) => (
                        <Marker key={idx} position={loc.position as [number, number]}>
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
