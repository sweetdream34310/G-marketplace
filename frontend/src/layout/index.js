import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";
import React from 'react';

function Layout({socket}) {
  return (
    <>
      <div>
        <Header socket={socket}/>
      </div>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
