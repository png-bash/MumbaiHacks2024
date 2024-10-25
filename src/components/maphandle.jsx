import React, { useRef, useState, useEffect } from 'react'; 
import MapComponent from './map.jsx';

const Maphandle = ({ location }) => {
    const [data, setData] = useState(null);  // State to store fetched data
    const [loading, setLoading] = useState(true);  // State for loading
    const [error, setError] = useState(null);  // State for error handling
    const mapRef = useRef();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://api.example.com/data');  // Replace with your API URL
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();  // Parse JSON data
                setData(result);                       // Store data in state
            } catch (error) {
                setError(error.message);               // Set error message
            } finally {
                setLoading(false);                     // Set loading to false when done
            }
        };

        fetchData();
    }, []);  // Empty dependency array to run once on mount

    if (loading) return <p>Loading...</p>;       // Loading message
    if (error) return <p>Error: {error}</p>;

    const handleAddCircle = (lat, long, radius) => {
        mapRef.current.addCircle(lat, long, radius);
    };

    const handleAddRoute = () => {
        const positions = [
            [51.505, -0.09],
            [51.51, -0.1],
            [51.52, -0.12],
        ];
        mapRef.current.addRoute(positions);
    };

    return (
        <div>
            <MapComponent ref={mapRef} latitude={51.505} longitude={-0.09} />

            <div style={{ marginTop: '10px' }}>
                {/* Dynamic Circle Addition */}
                <button onClick={() => handleAddCircle(51.5074, -0.1278, 300)}>Add Circle</button>
                <button onClick={() => mapRef.current.removeCircle()}>Remove Circle</button>

                {/* Dynamic Route Addition */}
                <button onClick={handleAddRoute}>Add Route</button>
                <button onClick={() => mapRef.current.removeRoute()}>Remove Route</button>

                {/* Optionally render the fetched data */}
                <div>
                    {data && data.map((item, index) => (
                        <div key={index}>
                            <p>Location: {item.name}</p>
                            <button onClick={() => handleAddCircle(item.latitude, item.longitude, item.radius)}>Add Circle for {item.name}</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Maphandle;
