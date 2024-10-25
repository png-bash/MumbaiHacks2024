import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { MapContainer, TileLayer, Circle, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = forwardRef(({ latitude, longitude }, ref) => {
    const [circles, setCircles] = useState([]);
    const [routes, setRoutes] = useState([]);

    // Function to add a circle with custom latitude, longitude, and radius
    const addCircle = (lat, long, radius) => {
        const newCircle = {
            center: [lat, long],
            radius: radius,
            id: Date.now(),
        };
        setCircles((prevCircles) => [...prevCircles, newCircle]);
    };

    // Function to remove the last added circle
    const removeCircle = () => {
        setCircles((prevCircles) => prevCircles.slice(0, -1));
    };

    // Function to add a route with custom positions
    const addRoute = (positions) => {
        const newRoute = {
            positions: positions,
            id: Date.now(),
        };
        setRoutes((prevRoutes) => [...prevRoutes, newRoute]);
    };

    // Function to remove the last added route
    const removeRoute = () => {
        setRoutes((prevRoutes) => prevRoutes.slice(0, -1));
    };

    // Expose functions to the parent component using useImperativeHandle
    useImperativeHandle(ref, () => ({
        addCircle,
        removeCircle,
        addRoute,
        removeRoute,
    }));

    return (
        <div className=''>
            <MapContainer center={[latitude, longitude]} zoom={13} style={{ height: '100vh', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                />

                {/* Render circles */}
                {circles.map(circle => (
                    <Circle
                        key={circle.id}
                        center={circle.center}
                        radius={circle.radius}
                        pathOptions={{ color: 'blue', fillColor: 'lightblue', fillOpacity: 0.5 }}
                    />
                ))}

                {/* Render routes */}
                {routes.map(route => (
                    <Polyline
                        key={route.id}
                        positions={route.positions}
                        pathOptions={{ color: 'red', weight: 4, dashArray: '5, 5' }}
                    />
                ))}
            </MapContainer>
        </div>
    );
});

export default MapComponent;