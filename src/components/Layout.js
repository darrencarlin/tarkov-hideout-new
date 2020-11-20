import React from "react";
// Components
import Navigation from "./Navigation";
// Styles
import "./styles/layout.scss";

function Layout() {
  return (
    <div className="page-container">
      <div className="page-content">
        <Navigation />
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
