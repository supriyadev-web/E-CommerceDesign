import React from "react";
import Navbar from "../components/Navbar";
import { Helmet } from "react-helmet"; // ✅ Using react-helmet now
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";

function Layout({
  children,
  title = "Forever - Ecommerce App",
  description = "MERN stack project",
  keywords = "mern, react, node, mongodb",
  author = "Supriya"
}) {
  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta charSet="UTF-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
      </Helmet>

      <Navbar />
      <SearchBar />
      <main style={{ minHeight: "70vh" }} className="my-10">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
