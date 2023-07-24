import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/HeaderBlogComponent";
import Aside from "./components/AsideComponent";
import PostList from "./components/PostList";
import Post from "./pages/PostPage";
import Portfolio from "./pages/PortfolioPage";
import Counter from "./pages/CounterPage";
import WeatherPage from "./pages/WeatherPage";
import ToDo from "./pages/TodoPage";

import Pizza from "./pages/pizzas/PizzaPage";

const App: React.FC = () => {
  const location = useLocation();

  function hideAside() {
    return !location.pathname.startsWith("/portfolio/pizzas");
  }

  return (
    <>
      <Header />
      <main>
        <div className="container">
          <div className="row">
            {hideAside() && (
              <div className="col-lg-3">
                <Aside />
              </div>
            )}
            <Routes>
              <Route path="/" element={<PostList />} end />
              <Route path="/post/:id" element={<Post />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/portfolio/counter" element={<Counter />} />
              <Route path="/portfolio/weather" element={<WeatherPage />} />
              <Route path="/portfolio/todo" element={<ToDo />} />
              <Route path="/portfolio/pizzas" element={<Pizza />} />
            </Routes>
          </div>
        </div>
      </main>
    </>
  );
};

export default App;
