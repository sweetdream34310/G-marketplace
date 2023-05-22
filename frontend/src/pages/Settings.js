import "../style/home.css";
import Header from "../components/dashboard/Header";
import SettingsBoard from '../components/settings'
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ROUTER_SELECTED_TYPES } from '../actions/actionType'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import jwt_decode from "jwt-decode";

function Settings() {

  const dispatch = useDispatch();

  const Navigate = useNavigate();

  const isLoginSuccess = () => {
    try {
      const tokenDecode = jwt_decode(localStorage.getItem("token"))
      if (!tokenDecode) {
        Navigate('/login')
      }
      if(tokenDecode.role != 'admin') {
        Navigate('/login')
      }
    } catch (error) {
      Navigate('/login')
    }
  }

  useEffect(() => {
    isLoginSuccess();
  }, [])

  useEffect(()=> {
    dispatch({ type: ROUTER_SELECTED_TYPES.ROUTER_SELECTED_TITLE, payload: "Settings" });
  }, [])

  return (
    <div className="body">
      {/* <Header /> */}
      <div style={{ marginLeft: '20px', marginTop:'50px' }}>
        <SettingsBoard />
      </div>
    </div>
  );
}

export default Settings;
