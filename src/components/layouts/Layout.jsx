import React from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <BrowserRouter>
      <Header />
      <main>{children}</main>
      <Footer />
    </BrowserRouter>
  );
};

export default Layout;
