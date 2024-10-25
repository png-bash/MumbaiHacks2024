import React from 'react';
import { useLocation } from 'react-router-dom';

const ArticleDetail = () => {
    const location = useLocation();
    const { article } = location.state || {};

    if (!article) {
        return <div>No article found!</div>;
    }

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold">{article.title}</h1>
            <h2 className="text-xl text-gray-600">{article.subtitle}</h2>
            <p className="mt-4">{article.body}</p>
            <p className="mt-4 text-gray-500">{article.date}</p>
        </div>
    );
};

export default ArticleDetail;
