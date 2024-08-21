// components/Map.tsx
'use strict';
import dynamic from 'next/dynamic';
import { useState, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';

const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });
const FeatureGroup = dynamic(() => import('react-leaflet').then(mod => mod.FeatureGroup), { ssr: false });
const Polygon = dynamic(() => import('react-leaflet').then(mod => mod.Polygon), { ssr: false });
const EditControl = dynamic(() => import('react-leaflet-draw').then(mod => mod.EditControl), { ssr: false });

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
    coordinates: [number, number][];
    name: string;
    resolution: string;
    description: string;
}

const MapComponent = () => {
    const [polygons, setPolygons] = useState<PolygonData[]>([]);
    const [tiles, setTiles] = useState<TileData[]>([]);
    const mapRef = useRef<any>(null);

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
        <MapContainer
            center={[14.5995, 75.9179]}
            zoom={7}
            scrollWheelZoom={false}
            className='w-4/5 h-3/4 rounded-lg shadow-lg'
            ref={mapRef}
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
                        positions={tile.coordinates.map(([lng, lat]) => [lat, lng] as [number, number])}
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
    );
};

export default MapComponent;
