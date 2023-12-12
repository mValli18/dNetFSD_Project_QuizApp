// Layout.js
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import QuizResults from "./QuizResults";
import Leaderboard from "./Leaderboard";

const Layout = () => {
  const location = useLocation();
  const showNavbar = location.pathname === "/quizResult" || location.pathname === "/leaderboard";

  return (
    <div>
      {showNavbar && <Navbar />}
      <Outlet />
    </div>
  );
};

export default Layout;
