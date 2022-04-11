import React from "react";

import Navbar from "./components/NavBar.jsx";
import "../styles/index.css";

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
			{children}
    </div>
  );
};

export default Layout;
