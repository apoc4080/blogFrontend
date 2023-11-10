import React, { useEffect, useState } from "react";
import "./News.css";

const News = () => {
  const [mynews, setMyNews] = useState([]);

  const fetchData = async () => {
    try {
      let response = await fetch(
        "https://newsapi.org/v2/everything?q=queer lgbtq india&sortBy=popularity&apiKey=4cec2561e3e34b0dbfa0fd9d7d470899"
      );
      let data = await response.json();
      setMyNews(data.articles);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="news-header">
        <h1>Queer News</h1>
      </div>
      <div className="mainDiv">
        {mynews
          .filter((news) => news.urlToImage !== null) // Filter out items with null urlToImage
          .map((news, index) => (
            <div className="news-card" key={index}>
              <img src={news.urlToImage} alt={news.title} />
              <h2>{news.title}</h2>
              <p>{news.description}</p>
              <a href={news.url} target="_blank" rel="noopener noreferrer">
                Read More
              </a>
            </div>
          ))}
      </div>
    </div>
  );
};

export default News;