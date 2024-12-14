import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PortableText } from "@portabletext/react";
import { urlFor } from "../sanity/client";
import '../styles/news.css'

interface NewsItem {
  _id: string;
  title: string;
  slug: any;
  body: any;
  description: string;
  publishedAt: string;
  image: any;
}

const NewsPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [content, setContent] = useState<NewsItem>({} as NewsItem);

  useEffect(() => {
    const fetchNews = async () => {
      // const response = await fetch(`http://localhost:4422/api/news/${slug}`);
      const response = await fetch(`/api/news/${slug}`);
      const { article } = await response.json();

      if (!article) {
        
      }

      console.log(article[0]);
      setContent(article[0]);
    };

    fetchNews();
  }, []);

  return (
    <div className="news-page">
      <div className="container">
        <div className="article-wrapper">
          <div className="post-header">
            {content.image ? (
              <img
                src={urlFor(content.image)
                  // .width(400)
                  // .height(300)
                  // .fit("crop")
                  .url()} // Generate the URL
                alt={content.title}
                className="article-head-image"
              />
            ) : (
              <img
                src="/client/default-image.webp"
                alt={content.title}
                className="article-head-image"
              />
            )}

            <div className="header-text">
              <h1>{content.title}</h1>
              <time> on { content.publishedAt && new Date(content.publishedAt.split('T')[0]).toDateString()}</time>
            </div>
          </div>

          <div className="article-body">
          {content && <PortableText value={content.body}  />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsPage;