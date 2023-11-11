import React, { useEffect, useState } from "react";
import "./News.css";
import {newss} from "./info"

const News = () => {
  const [mynews, setMyNews] = useState([]);

  const fetchData = async () => {
    try {
      // Encode the URL to handle spaces in query parameters
      // const apiUrl = "https://blogbackend-12nr.onrender.com/news";
      // let response = await fetch(apiUrl);
      // let data = await response.json();
      // setMyNews(data.articles);
      setMyNews(newss.articles);
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