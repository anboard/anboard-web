import React, { useState, useEffect } from "react";
import { PortableText } from "@portabletext/react";
import { urlFor } from "../sanity/client";

interface NewsItem {
  _id: string;
  title: string;
  body: any;
  publishedAt: string;
  image: any; // Add the image field
}

const NewsPage: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      const response = await fetch("http://localhost:4422/api/news");
      const { newsList } = await response.json();

      console.log("smth is fuccing w me");
      setNews(newsList);
    };

    fetchNews();
  }, []);

  console.log(news);
  return (
    <div>
      <h1>News</h1>
      {news.map((item) => (
        <div key={item._id} style={{ marginBottom: "20px" }}>
          <h2>{item.title}</h2>
          {item.image && (
            <img
              src={urlFor(item.image).width(400).height(300).fit("crop").url()} // Generate the URL
              alt={item.title}
              style={{ maxWidth: "100%", height: "auto" }}
            />
          )}
          <PortableText value={item.body} />
          <small>Published at: {item.publishedAt.split("T")[0]}</small>
        </div>
      ))}
    </div>
  );
};

export default NewsPage;
