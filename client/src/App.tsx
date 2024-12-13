import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import NewsListPage from "./pages/NewsListPage";
import EventsPage from "./pages/EventsPage";
import HomePage from "./pages/HomePage";
import NewsPage from "./pages/NewsPage";

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* <Route path="/" element={<HomePage />} /> */}
          <Route path="/news" element={<NewsListPage />} />
          <Route path="/news/:slug" element={<NewsPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
