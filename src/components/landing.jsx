import { useState, useEffect } from "react";
import Article from "../assets/articles";

const Homepage = () => {
    const [search, setsearch] = useState("");
    // const [articles, setArticles] = useState([])

    const handleSearch = (e) => {
        setsearch(e.target.value)
    }

    return (
        <>
            <div className="container">
                <div className="search">
                    <input type="text" onChange={(e)=>handleSearch(e)} />
                </div>
                <div className="">
                    <Article/>
                </div>
            </div>
        </>
    )
}

export default Homepage