import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

    

const MapComponent = (latitude, longitude) => {
    
    const [circles, setCircles] = useState([]);
    const [routes, setRoutes] = useState([]);

    // Function to add a circle
    const addCircle = () => {
        const newCircle = {
            center: [51.508, -0.11], // Random or dynamically generated coordinates
            radius: 200,             // Adjust radius as needed
            id: Date.now()           // Unique ID for each circle
        };
        setCircles([...circles, newCircle]);
    };

    // Function to remove the last circle
    const removeCircle = () => {
        setCircles(circles.slice(0, -1));
    };

    // Function to add a route
    const addRoute = () => {
        const newRoute = {
            positions: [
                [51.505, -0.09],
                [51.51, -0.1],
                [51.51, -0.12]
            ],                 // Adjust positions or make them dynamic
            id: Date.now()     // Unique ID for each route
        };
        setRoutes([...routes, newRoute]);
    };

    // Function to remove the last route
    const removeRoute = () => {
        setRoutes(routes.slice(0, -1));
    };
    
    return (
        <>
        <MapContainer center={[latitude, longitude]} zoom={13} style={{ height: "100vh", width: "100%" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {/* <Marker position={[51.505, -0.09]}> */}
                {/* <Popup> */}
                    {/* A pretty CSS3 popup. <br /> Easily customizable. */}
                {/* </Popup> */}
            {/* </Marker> */}

            {circles.map(circle => (
          <Circle
            key={circle.id}
            center={circle.center}
            radius={circle.radius}
            pathOptions={{ color: 'blue', fillColor: 'lightblue', fillOpacity: 0.5 }}
          />
        ))}

        {/* Render routes from state */}
        {routes.map(route => (
          <Polyline
            key={route.id}
            positions={route.positions}
            pathOptions={{ color: 'red', weight: 4, dashArray: '5, 5' }}
          />
        ))}
            
        </MapContainer>
    
        <div style={{ marginTop: '10px' }}>
        <button onClick={addCircle}>Add Circle</button>
        <button onClick={removeCircle}>Remove Circle</button>
        <button onClick={addRoute}>Add Route</button>
        <button onClick={removeRoute}>Remove Route</button>
            </div>
            
        </>
        
    );
}

export default MapComponent;
