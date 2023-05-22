import "../../style/header.css";
import Search from "./Search";
import CartIcon from "./CartIcon";
import Date from "./Date";
import React, { useState, useEffect } from 'react';
import jwt_decode from "jwt-decode";
import { useSelector } from "react-redux";
import HeaderMenu from "./HeaderMenu"
import { getNotification } from "../../api/notification";
import { toast } from "react-hot-toast";

function Header({ socket }) {
  const tokenDecode = jwt_decode(localStorage.getItem("token"))
  const [notificationNum, setNotificationNum] = useState(0);
  const [notificationData, setNotificationData] = useState([]);

  const getNotificationStatus = useSelector((state) => state.notificationReducer.notificationStatus);

  if (getNotificationStatus) {
    notification();
  }
  
  const notification = async () => {
    const data = { email: tokenDecode.email }
    const res = await getNotification(data);

    if (res.message == 'no') {
      setNotificationNum(0);
    } else if (res.message == 'success') {
      setNotificationNum(res.data.length)
      setNotificationData(res.data)
    } else {
      console.log(res.data, 'error')
      toast.error(res.data)
    }
  }

  const socketManage = async () => {
    socket.emit('joinRoom', { email: tokenDecode.email, room: 'room' })
    socket.on('notification', async () => {
      notification()
    })
  }

  useEffect(() => {
    notification();
  }, [])

  useEffect(() => {
    socketManage();
  }, [])

  return (
    <div className="header-body">
      <div style={{ display: "flex" }}>
        <Search />
        <Date />
      </div>
      <div
        className="header-items"
        style={{
          marginTop: "7px",
          minWidth: "400px",
          height: "40px",
          float: "right",
          display: "flex",
          justifyContent: "space-around"
        }}
      >
        <CartIcon notificationData={notificationData} notificationNum={notificationNum} update={notification} socket={socket} />
        <div className="user-name">{tokenDecode.username}</div>
        <div className="header-list">
          <HeaderMenu />
          <div className="com-icon"></div>
          <span style={{ width: "5px" }}></span>
        </div>
      </div>
    </div>
  );
}

export default Header;
