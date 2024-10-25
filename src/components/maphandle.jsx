import React, { useRef, useState } from 'react';
import MapComponent from './map.jsx';

const Maphandle = ({ location }) => {
    const [latitude, setLatitude] = useState(51.505); // Default latitude
    const [longitude, setLongitude] = useState(-0.09); // Default longitude

    const mapRef = useRef();

    const handleUpdateMap = () => {
        const lat = parseFloat(latitude);
        const long = parseFloat(longitude);
        mapRef.current.moveMap(lat, long);  // Function to move the map to the new coordinates
    };

    return (
        <div>
            <MapComponent ref={mapRef} latitude={latitude} longitude={longitude} />

            <div style={{ marginTop: '10px' }}>
                <h4>Update Map Location</h4>
                <input
                    type="number"
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                    placeholder="Latitude"
                />
                <input
                    type="number"
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                    placeholder="Longitude"
                />
                <button onClick={handleUpdateMap}>Go to Location</button>
            </div>
        </div>
    );
};

export default Maphandle;
