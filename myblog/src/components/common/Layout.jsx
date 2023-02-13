import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../footer/Footer";
import NavBar from "../navBar/NavBar";
import ScrollButton from "./ScrollButton";

const Layout = () => {
  return (
    <div>
      <NavBar />
      <ScrollButton />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
