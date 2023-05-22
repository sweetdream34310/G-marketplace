import Header from "../components/dashboard/Header";
import Customers from "../components/dashboard/customers/Customers";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import jwt_decode from "jwt-decode";
import "../style/home.css";
import { useEffect } from "react";

function Customer() {

  const Navigate = useNavigate();

  const isLoginSuccess = () => {
    try {
      const tokenDecode = jwt_decode(localStorage.getItem("token"))
      if (!tokenDecode) {
        Navigate('/login')
      }
    } catch (error) {
      Navigate('/login')
    }
  }

  useEffect(() => {
    isLoginSuccess();
  }, [])

  return (
    <div className="body">
      <Header />
      <div style={{ marginLeft: '20px' }}>
        <Customers />
      </div>
    </div>
  );
}

export default Customer;