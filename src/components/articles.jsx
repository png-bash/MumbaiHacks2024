import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../ArticleDetails.css'; // Import the CSS file

const Article = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(0); // New state for current page
    const articlesPerPage = 2; // Number of articles to show per page
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

    if (loading) return <div className="text-center text-gray-600 mt-6">Loading...</div>;
    if (error) return <div className="text-center text-red-600 mt-6">Error: {error.message}</div>;

    const handleCardClick = (article) => {
        navigate('/article', { state: { article } }); // Pass the article data to the next component
    };

    const nextPage = () => {
        if ((currentPage + 1) * articlesPerPage < (data && data.length)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const startIndex = currentPage * articlesPerPage;
    const endIndex = startIndex + articlesPerPage;
    const displayedArticles = data && data.slice(startIndex, endIndex);

    return (
        <div className="flex items-center justify-between">
            <button
                onClick={prevPage}
                className="px-4 py-2 bg-black-300 rounded-md hover:bg-gray-400"
                disabled={currentPage === 0}
            >
                {'<-'}
            </button>

            <div className="scrollable-container flex-grow">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 p-4">
                    {displayedArticles.map((article, index) => (
                        <div
                            key={index}
                            className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96 cursor-pointer transition-shadow duration-300 ease-in-out"
                            onClick={() => handleCardClick(article)}
                        >
                            <div className="p-4">
                                <h5 className="mb-2 text-slate-800 text-xl font-semibold">
                                    {article.title}
                                </h5>
                                <p className="text-slate-600 leading-normal font-light">
                                    {article.body.substring(0, 100)}...
                                </p>
                                <button
                                    className="rounded-md bg-slate-800 py-2 px-4 mt-6 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                    type="button"
                                >
                                    Read more
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <button
                onClick={nextPage}
                className="px-4 py-2 bg-black-300 rounded-md hover:bg-gray-400"
                disabled={(currentPage + 1) * articlesPerPage >= (data && data.length)}
            >
                {'->'}
            </button>
        </div>
    );
};

export default Article;
