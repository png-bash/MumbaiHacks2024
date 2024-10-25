import { useState, useEffect } from "react";
import Article from "../assets/articles";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
    const [search, setsearch] = useState("");
    const navigate = useNavigate();
    // const [articles, setArticles] = useState([])

    const handleSearch = (e) => {
        setsearch(e.target.value)
    }
    const handleSearchButton = (e) => {
        navigate('/search'); 
        
    }

    return (
        <>
            <div className="container">
                <div className="search">
                    <input type="text" onChange={(e) => handleSearch(e)} />
                    <button onClick={(e) => { handleSearchButton(e)}}>search</button>
                </div>
                <div className="">
                    <Article/>
                </div>
            </div>
        </>
    )
}

export default Homepage