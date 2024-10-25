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
    const handleSearchButton = (search) => {
        navigate('/search', { state: { search } }); 
        
    }

    return (
        <>
            <div className="container">
                <div className="search">
                    <input type="text" onChange={(e) => handleSearch(e)} />
                    <button onClick={(e) => { handleSearchButton(search)}}>search</button>
                </div>
                <div className="">
                    <Article/>
                </div>
            </div>
        </>
    )
}

export default Homepage