import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Article from './components/articles'; // Adjust the path as necessary
// import Home from './Home'; // If you have a separate Home component
// import About from './About';
import ArticleDetail from './components/showarticle';
import Homepage from './components/landing';
import MapSearch from './components/mapshow';
import ChatBot from './components/ChatBot';

const App = () => {
    return (
        <div>
            {/* <h1>Welcome to My App</h1> */}
            <Routes>
                <Route path="/" element={<Homepage />} /> {/* Display Article on the homepage */}
                <Route path="/article" element={<ArticleDetail />} />
                <Route path="/search" element={<MapSearch />} />
                <Route path="/ChatBot" element={<ChatBot />} />
                {/* Add other routes as necessary */}
            </Routes>
        </div>
    );
};


export default App;
