import React from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <BrowserRouter>
      <Header />
      <main className="flex justify-center items-center w-full max-w-screen-lg mx-auto px-4">
        {children}
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default Layout;
