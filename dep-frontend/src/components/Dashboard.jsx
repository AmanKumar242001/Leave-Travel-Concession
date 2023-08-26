import React, { createContext, useContext } from "react";
import Navbar from "./Navbar.jsx";
import Main from "./Main.jsx";

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <Main />
    </>
  );
}
