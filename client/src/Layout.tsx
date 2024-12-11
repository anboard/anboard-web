import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import './styles/layout.css'

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout">
    <Header />      
      <main className="main-content">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
