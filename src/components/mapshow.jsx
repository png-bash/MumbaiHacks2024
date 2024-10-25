import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import './App.css';
import Maphandle from './maphandle';
import { useLocation } from 'react-router-dom';

function MapSearch() {
    // const { search } = location.state || { search: "" };
    // const location = useLocation();
    const location = useLocation();
    const { search } = location.state || {};

    return (
        <>
        
            <div className="flex justify-center" >
                <div className="w-full" >
                    <div className="flex" >
                        {/* Map Container with 70% width */}
                        < div className="flex-70 p-9" >
                            <Maphandle location={search}/>
                        </div>

                        {/* Content Section with 30% width */}
                        <div className="flex-20 p-2" >
                            <p>
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit.Perspiciatis,
                                molestias iure excepturi natus perferendis a itaque impedit similique,
                                nam atque inventore at repellat libero eveniet mollitia magni corrupti
                                asperiores ex.
                            </p>
                        </div>
                    </div>
                </div>
            </div></>
    )
}

export default MapSearch;
