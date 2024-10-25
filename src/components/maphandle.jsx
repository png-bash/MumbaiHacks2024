import React, { useRef, useState } from 'react';
import MapComponent from './map.jsx';

const Maphandle = ({location}) => {



    const [data, setData] = useState(null);   // State to store fetched data
    const [loading, setLoading] = useState(true);  // State for loading
    const [error, setError] = useState(null);  // State for error handling

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

    const mapRef = useRef();

    const handleAddCircle = (lat,long,radius) => {
        const lat = 51.5074;
        const long = -0.1278;
        const radius = 300;
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
                <button onClick={handleAddCircle}>Add Circle</button>
                <button onClick={() => mapRef.current.removeCircle()}>Remove Circle</button>
                <button onClick={handleAddRoute}>Add Route</button>
                <button onClick={() => mapRef.current.removeRoute()}>Remove Route</button>
            </div>
        </div>
    );
};

export default Maphandle;
