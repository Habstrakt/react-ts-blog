import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/HeaderBlogComponent";
import Aside from "./components/AsideComponent";
import PostList from "./components/PostList";
import Post from "./pages/PostPage";
import Portfolio from "./pages/PortfolioPage";

const App: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <div className="container">
          <div className="row">
            <Aside />
            <Routes>
              <Route path="/" element={<PostList />} end />
              <Route path="/post/:id" element={<Post />} />
              <Route path="/portfolio" element={<Portfolio />} />
            </Routes>
          </div>
        </div>
      </main>
    </>
  );
};

export default App;
