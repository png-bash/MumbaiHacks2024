import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
<<<<<<< HEAD
import Article from './assets/articles';
import ArticleDetail from './assets/showarticle';
import Homepage from './components/landing';
import MapSearch from './components/mapshow';
import ChatBot from './components/ChatBot'; // Import the ChatBot component

const App = () => {
    return (
        <BrowserRouter>
            <div>
                {/* Optional: Global Chatbot Icon */}
                <ChatBot />

                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/article" element={<ArticleDetail />} />
                    <Route path="/search" element={<MapSearch />} />
                    <Route path="/chatbot" element={<ChatBot />} /> {/* Add route for chatbot */}
                </Routes>
            </div>
        </BrowserRouter>
=======
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
>>>>>>> pavan
    );
};

export default App;
