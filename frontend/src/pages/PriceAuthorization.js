import "../style/home.css";
import React, { useState, useEffect } from 'react';
import PriceAuthorizationComponent from '../components/priceAuthorization'
import { getNotification } from "../api/notification";
import jwt_decode from "jwt-decode";
import { toast } from "react-hot-toast";
import { getPermissions } from "../api/user";
import { useNavigate } from 'react-router-dom';

function PriceAuthorization({socket}) {

  const tokenDecode = jwt_decode(localStorage.getItem("token"))

  const [notificationData, setNotificationData] = useState([{sku:'a'}]);

  const Navigate = useNavigate();

  const socketManage = async () => {
    // socket.emit('joinRoom', { email: tokenDecode.email, room: 'room' })
    socket.on('notification', async () => {
      notification()
    })
  }

  const notification = async () => {
    const data = { email: tokenDecode.email }
    const res = await getNotification(data);

    if (res.message == 'no') {
    } else if (res.message == 'success') {
      setNotificationData(res.data)
    } else {
      toast.error(res.data)
    }
  }

  const isLoginSuccess = async () => {

    try {
      const res = await getPermissions();

      if (res.includes(5)) {
        const tokenDecode = jwt_decode(localStorage.getItem("token"));
        if (!tokenDecode) {
          Navigate("/login");
        }
      } else {
        Navigate("/dashboard");
      }
    } catch (error) {
      Navigate("/login");
    }
  }

  useEffect(() => {
    isLoginSuccess();
  }, [])

  useEffect(() => {
    notification()
  }, [])

  useEffect(() => {
    socketManage()
  }, [])
  
  return (
    <div className="body">
      <div style={{ marginTop: '50px', marginBottom: '20px', width: 'calc(100% - 20px)', height: 'auto', marginRight: '20px' }}>
        <PriceAuthorizationComponent socket={socket} notificationData={notificationData}/>
      </div>
    </div>
  );
}

export default PriceAuthorization;
