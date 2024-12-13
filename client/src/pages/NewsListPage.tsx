import React, { useState, useEffect } from "react";
import { urlFor } from "../sanity/client";
import "../styles/newsList.css";

interface NewsItem {
  _id: string;
  title: string;
  slug: any;
  body: any;
  description: string;
  publishedAt: string;
  image: any; 
}

const NewsListPage: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      const response = await fetch("http://localhost:4422/api/newslist");
      // const response = await fetch("/api/newslist");
      const { newsList } = await response.json();

      console.log("smth is fuccing w me");
      setNews(newsList);
    };

    fetchNews();
  }, []);

  console.log(news);
  return (
    <div className="alt-bg-white">
      <div className="banner">
        <div className="container ">
          <h1>News</h1>
        </div>
      </div>

      <div className="news-list container">
        <h3>Latest News</h3>
        <div className="news-list-wrapper">
          {news.map((item) => (
            <div key={item._id} className="news-card">
              {item.image ? (
                <div className="card-image-wrapper">
                  <img
                  src={urlFor(item.image)
                    .width(400)
                    .height(300)
                    .fit("crop")
                    .url()} // Generate the URL
                  alt={item.title}
                  className="news-list-image"
                />
                </div>
              ) : (
                <div className="card-image-wrapper">
                  <img
                  src="/client/default-image.webp"
                  alt={item.title}
                  className="news-list-image"
                />
                </div>
              )}

              <div className="news-card-text">
                <div className="card-text-head">
                  <h2 className="news-card-title">{item.title}</h2>
                  <small>
                    Published on {" "}
                    {new Date(item.publishedAt.split("T")[0]).toDateString()}
                  </small>
                </div>

                <div className="news-card-body">
                  <div className="news-card-description">
                    {/* <PortableText value={item.body} /> */}
                    <p>{item.description}</p>
                  </div>

                  <div className="news-card-more">
                    <a href={`/news/${item.slug.current}`}>Read more</a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsListPage;
