import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
    );
};

export default App;
