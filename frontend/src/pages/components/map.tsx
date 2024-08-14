import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, FeatureGroup, Polygon } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';

interface LatLng {
    lat: number;
    lng: number;
}

interface PolygonData {
    id: number;
    latlngs: LatLng[];
}

interface TileData {
    id: number;
    coordinates: [number, number][]; // Updated: coordinates as an array of [number, number]
    name: string;
    resolution: string;
    description: string;
}

const Map = () => {
    const [polygons, setPolygons] = useState<PolygonData[]>([]);
    const [tiles, setTiles] = useState<TileData[]>([]);

    const sendAOIToBackend = async (aoiData: PolygonData) => {
        try {
            const response = await fetch('http://localhost:5000/api/aoi', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(aoiData),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const result = await response.json();
            console.log('Response from backend:', result);

            // Assuming result.intersectingTiles contains the array of tiles
            setTiles(result.intersectingTiles);

        } catch (error) {
            console.error('Failed to send AOI to backend:', error);
        }
    };

    const handleDrawCreated = (e: any) => {
        const newPolygon: PolygonData = {
            id: polygons.length + 1,
            latlngs: e.layer.getLatLngs()[0].map((latlng: any) => ({ lat: latlng.lat, lng: latlng.lng })),
        };
        setPolygons([...polygons, newPolygon]);
        sendAOIToBackend(newPolygon);
        console.log(newPolygon);
    };

    const handleEdited = (e: any) => {
        const editedPolygons = e.layers.getLayers().map((layer: any) => {
            return {
                id: layer.options.id,
                latlngs: layer.getLatLngs()[0].map((latlng: any) => ({ lat: latlng.lat, lng: latlng.lng })),
            };
        });
        setPolygons((prevPolygons) =>
            prevPolygons.map((polygon) => {
                const editedPolygon = editedPolygons.find((p: PolygonData) => p.id === polygon.id);
                return editedPolygon ? editedPolygon : polygon;
            })
        );

        editedPolygons.forEach(sendAOIToBackend);
    };

    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <h1 className='text-4xl font-bold mb-8'>Map</h1>
            <MapContainer
                center={[14.5995, 75.9179]}
                zoom={7}
                scrollWheelZoom={false}
                className='w-4/5 h-3/4 rounded-lg shadow-lg'
            >
                <TileLayer
                    attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                />
                <Marker position={[14.5995, 75.9179]}>
                    <Popup>Karnataka, India</Popup>
                </Marker>
                <FeatureGroup>
                    <EditControl
                        position="topright"
                        onCreated={handleDrawCreated}
                        onEdited={handleEdited}
                        draw={{
                            marker: false,
                            polyline: false,
                            circle: false,
                            rectangle: true,
                            circlemarker: false,
                        }}
                    />
                    {polygons.map((polygon) => (
                        <Polygon
                            key={polygon.id}
                            // @ts-ignore
                            id={polygon.id.toString()}
                            positions={polygon.latlngs.map(({ lat, lng }) => [lat, lng] as [number, number])}
                            pathOptions={{ color: 'blue' }}
                        />
                    ))}
                    {tiles.map((tile) => (
                        <Polygon
                            key={tile.id}
                            // @ts-ignore
                            positions={tile.coordinates.map(([lng, lat]) => [lat, lng] as [number, number])} // Fixed: Switched lat and lng for correct positioning
                            pathOptions={{ color: 'red' }}
                        >
                            <Popup>
                                <strong>{tile.name}</strong><br />
                                Resolution: {tile.resolution}<br />
                                {tile.description}
                            </Popup>
                        </Polygon>
                    ))}
                </FeatureGroup>
            </MapContainer>
        </div>
    );
};

export default Map;
