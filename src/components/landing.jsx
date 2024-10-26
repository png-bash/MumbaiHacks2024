import { useState } from "react";
import Article from "./articles";
import { useNavigate } from "react-router-dom";
import '../Homepage.css'; // Import the CSS

const Homepage = () => {
    const [search, setsearch] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e) => {
        setsearch(e.target.value);
    };

    const handleSearchButton = (search) => {
        navigate('/search', { state: { search } }); 
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
                <div className="">
                    <Article />
                </div>
            </div>
        </>
    );
};

export default Homepage;
