import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Maphandle from './maphandle';
import './mapshow.css';

function MapSearch() {
    const location = useLocation();
    const { search } = location.state || {};
    const [data2, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const apiUrl = 'http://localhost:4000/api/analyze-safety'; // Corrected API URL

            // Data to be sent in the request body
            const requestData = { address: search };

            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(requestData),
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                // Check if data is safe or not and set state accordingly
                if (data) {
                    setData(data);
                } else {
                    throw new Error('Invalid response data');
                }
            } catch (error) {
                console.error('Error fetching data:', error.message);
                setError(error.message);
            }
        }

        // Fetch data when component mounts
        fetchData();
    }, [search]);

    return (
        <div className='mappage'>
            <div className='mappage2'>
                {/* Map Container with 70% width */}
                <div className='maphadlediv'>
                    <Maphandle location={search} />
                </div>

                {/* Content Section with 30% width */}
                <div className='mapsidebar bg-gray-600 text-white p-4'>
                    {error ? (
                        <div className="text-red-400">
                            <strong>Error:</strong> {error}
                        </div>
                    ) : (
                        <div className="border rounded-lg shadow-md bg-gray-700 p-4 max-w-lg mx-auto mt-6">
                            <h1 className="text-xl font-semibold mb-4">Crime Safety Analysis</h1>
                            {data2 ? (
                                <>
                                    <p>
                                        <strong>Status:</strong>
                                        <span className={data2.safe ? 'text-green-400' : 'text-red-400'}>
                                            {data2.safe ? 'Safe' : 'Unsafe'}
                                        </span>
                                    </p>
                                    {/* Show Latitude and Longitude for both safe and unsafe */}
                                    <p>
                                        <strong>Position:</strong> Latitude: {data2.position?.latitude}, Longitude: {data2.position?.longitude}
                                    </p>
                                    {/* Only show total cases and risk details if unsafe */}
                                    {!data2.safe && (
                                        <>
                                            <p>
                                                <strong>Total Cases Nearby:</strong> {data2.total_cases_nearby}
                                            </p>
                                            <p>
                                                <strong>Average Severity:</strong> {data2.average_severity?.toFixed(2)}
                                            </p>

                                            <div className="mt-4 border-t pt-4">
                                                <h2 className="text-lg font-medium">Highest Risk Area Details</h2>
                                                <p>
                                                    <strong>No. of Cases:</strong> {data2.highest_risk?.no_of_cases}
                                                </p>
                                                <p>
                                                    <strong>Severity Score:</strong> {data2.highest_risk?.severity_score}
                                                </p>
                                                <p>
                                                    <strong>Description:</strong> {data2.highest_risk?.description}
                                                </p>
                                            </div>
                                        </>
                                    )}
                                </>
                            ) : (
                                <p>Loading data...</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MapSearch;
