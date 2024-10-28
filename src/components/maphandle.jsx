import React, { useEffect, useRef, useState } from 'react';
import MapComponent from './map.jsx';

const Maphandle = ({ location }) => {
    const [data, setData] = useState(null); // State to store fetched data
    const [loading, setLoading] = useState(true); // State for loading
    const [error, setError] = useState(null);
    const [latitude, setLatitude] = useState(null); // Use null as initial state
    const [longitude, setLongitude] = useState(null);

    useEffect(() => {
        // Define the async function to fetch data from the API
        async function fetchData() {
            const apiUrl = 'http://localhost:4000/api/analyze-safety'; // Corrected API URL

            // Data to be sent in the request body
            const requestData = {
                address: location,
            };

            try {
                // Make a POST request to the API
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestData),
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();

                if (data.safe === 'true') {
                    console.log("Safe");
                } else {
                    setLatitude(data.position.latitude); // Update latitude state
                    setLongitude(data.position.longitude); // Update longitude state
                    console.log(data);
                    handleAddCircle(data.position.latitude,data.position.longitude,1000)
                }
            } catch (error) {
                console.error('Error fetching data:', error.message);
                setError(error.message);
            } finally {
                setLoading(false); // Set loading to false after fetch
            }
        }

        // Fetch data when component mounts
        fetchData();
    }, [location]);

    const mapRef = useRef();

    const handleAddCircle = (lat, long, radius) => {
        if (mapRef.current) {
            mapRef.current.addCircle(lat, long, radius);
        }
    };

    const handleAddRoute = (positions) => {
        if (mapRef.current) {
            mapRef.current.addRoute(positions);
        }
    };

    return (
        <div>
            {(latitude && longitude) ? (
                <MapComponent ref={mapRef} latitude={latitude} longitude={longitude} />
            ) : (
                <p>Loading map data...</p>
            )}

            {/* <div style={{ marginRight: '10px' }}>
                <button onClick={() => handleAddCircle(latitude, longitude, 750)}>Add Circle</button>
                <button onClick={() => mapRef.current.removeCircle()}>Remove Circle</button>
                <button onClick={() => handleAddRoute()}>Add Route</button>
                <button onClick={() => mapRef.current.removeRoute()}>Remove Route</button>
            </div> */}
        </div>
    );
};

export default Maphandle;