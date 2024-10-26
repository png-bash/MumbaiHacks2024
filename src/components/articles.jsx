import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../ArticleDetails.css'; // Import the CSS file
const Article = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const response = await fetch('/articlestxt.json'); // Replace with your API URL
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const jsonData = await response.json();
            setData(jsonData);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const handleCardClick = (article) => {
        navigate('/article', { state: { article } }); // Pass the article data to the next component
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
            {data && data.map((article, index) => (
                <div
                    key={index}
                    className="bg-white border rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg"
                    onClick={() => handleCardClick(article)}
                >
                    <h2 className="text-lg font-bold">{article.title}</h2>
                    <h3 className="text-sm ">{article.subtitle}</h3>
                    <p className="mt-2">{article.body.substring(0, 100)}...</p>
                    <p className="mt-2 ">{article.date}</p>
                </div>
            ))}
        </div>
    );
};

export default Article;
