import React, { useState, useEffect } from "react";
import { useRoutes, RouteObject, Navigate } from "react-router-dom";
import Layout from "./layout/index.js";
import Customer from "./pages/Customer.js";
import Home from "./pages/Home";
import Inventory from "./pages/Inventory";
import Vendor from "./pages/Vendor";
import Calendar from "./pages/Calendar";
import Pricing from "./pages/Pricing";
import Settings from "./pages/Settings.js";
import TaskList from "./pages/TaskList";
import Tag from "./pages/Tag.js";
import SignIn from "./pages/SignIn.js";
import io from "socket.io-client";
import { BACKEND_URL } from "../src/constants/index";
import PriceAuthorization from "./pages/PriceAuthorization.js";
import Log from "./pages/Log.js";
import ForgetPassword from "./pages/ForgetPass";

let newSocket = io.connect(BACKEND_URL, {
  'reconnection': true,
  'reconnectionDelay': 500,
  'reconnectionAttempts': 10
});

export default function Router() {
  const [socket, setSocket] = useState(newSocket);

  const socketManage = async () => {

    socket.on("disconnect", )
    // if (!socket.connected) {
    //   let reSocketConnect = io.connect(BACKEND_URL);
    //   setSocket(reSocketConnect)
    // }
  };

  useEffect(() => {
    socketManage();
  }, []);
  const router = [
    {
      element: <Layout socket={socket} />,
      children: [
        {
          path: "/dashboard",
          element: <Home />,
        },
        {
          path: "/inventory",
          element: <Inventory />,
        },
        {
          path: "/vendor",
          element: <Vendor />,
        },
        {
          path: "/customer",
          element: <Customer />,
        },
        {
          path: "/calendar",
          element: <Calendar />,
        },
        {
          path: "/pricing",
          element: <Pricing socket={socket} />,
        },
        {
          path: "/settings",
          element: <Settings />,
        },
        {
          path: "/tasklist",
          element: <TaskList />,
        },
        {
          path: "/tag",
          element: <Tag />,
        },
        {
          path: "/priceauthorisation",
          element: <PriceAuthorization socket={socket} />,
        },
        {
          path: "/log",
          element: <Log />,
        },
      ],
    },
    {
      path: "/login",
      element: <SignIn />,
    },
    {
      path: "/forgotpassword",
      element: <ForgetPassword />,
    },
    {
      path: "/",
      element: <SignIn />,
    },
  ];
  return useRoutes(router);
}
