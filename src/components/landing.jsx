import { useState } from "react";
import Article from "./articles";
import { useNavigate } from "react-router-dom";
import '../Homepage.css'; // Import the CSS
import chatbotImage from '../assets/chatbot.jpg'; // Import your chatbot image

const Homepage = () => {
    const [search, setsearch] = useState("");
    const navigate = useNavigate();


    const handleSearch = (e) => {
        setsearch(e.target.value);
    };

    const handleSearchButton = (search) => {
        navigate('/search', { state: { search } }); 
    };

    const handleChatbotClick = () => {
        // Define what happens when the chatbot is clicked
        // alert("Chatbot clicked!"); // Example action
        navigate('/ChatBot'); 
    };

    return (
        <>
            <div className="container">
                <div className="search">
                    <input 
                        type="text" 
                        onChange={handleSearch} 
                        placeholder="Enter your location here" // Placeholder text
                    />
                    <button onClick={() => handleSearchButton(search)}>Search</button>
                </div>
                <div className="articlediv">
                    <Article />
                </div>
                
                {/* Chatbot Image */}
                <img 
                    src={chatbotImage} 
                    alt="Chatbot" 
                    className="chatbot-image" 
                    onClick={handleChatbotClick}
                />
            </div>
        </>
    );
};

export default Homepage;
