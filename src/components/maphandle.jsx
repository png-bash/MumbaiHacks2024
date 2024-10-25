import React, { useRef, useState } from 'react';
import MapComponent from './map.jsx';

const Maphandle = ({ location }) => {
    const [data, setData] = useState(null);   // State to store fetched data
    const [loading, setLoading] = useState(true);  // State for loading
    const [error, setError] = useState(null);  // State for error handling

    const mapRef = useRef();

    const handleAddCircle = () => {
        const lat = 51.5074;
        const long = -0.1278;
        const radius = 300;
        mapRef.current.addCircle(lat, long, radius);  // Use parameters to define circle's location and radius
    };

    const handleAddRoute = () => {
        const positions = [
            [51.505, -0.09],
            [51.51, -0.1],
            [51.52, -0.12],
        ];
        mapRef.current.addRoute(positions);  // Pass positions array to add route
    };

    return (
        <div>
            <MapComponent ref={mapRef} latitude={51.505} longitude={-0.09} />

            <div style={{ marginTop: '10px' }}>
                <button onClick={handleAddCircle}>Add Circle</button>
                <button onClick={() => mapRef.current.removeCircle()}>Remove Circle</button>
                <button onClick={handleAddRoute}>Add Route</button>
                <button onClick={() => mapRef.current.removeRoute()}>Remove Route</button>
            </div>
        </div>
    );
};

export default Maphandle;
