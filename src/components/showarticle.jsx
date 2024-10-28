import React from 'react'; 
import { useLocation } from 'react-router-dom'; 
import '../ArticleDetail.css'; // Import the CSS file

const ArticleDetail = () => {
    const location = useLocation();
    const { article } = location.state || {};

    if (!article) {
        return <div>No article found!</div>;
    }

    return (
        <div className="article-container">
            <div className="article-box">
                <h1 className="article-title">{article.title}</h1>
                <h2 className="article-subtitle">{article.subtitle}</h2>
                <p className="article-body">{article.body}</p>
                <p className="article-date">{article.date}</p>
            </div>
        </div>
    );
};

export default ArticleDetail;
