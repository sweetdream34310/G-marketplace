import Calendar from "../components/calendar/Calendar";
import CalendarComponent from "../components/calendar/CalendarComponent";
import Header from "../components/dashboard/Header";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { ROUTER_SELECTED_TYPES } from '../actions/actionType'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import jwt_decode from "jwt-decode";
import "../style/home.css";
import { getPermissions } from "../api/user";

function CalendarPage() {
  
  const dispatch = useDispatch();

  const Navigate = useNavigate();

  const isLoginSuccess = async () => {

    try {
      const res = await getPermissions();

      if (res != null) {
        const tokenDecode = jwt_decode(localStorage.getItem("token"));
        if (!tokenDecode) {
          Navigate("/login");
        }
      }
    } catch (error) {
      Navigate("/login");
    }
  }

  useEffect(() => {
    isLoginSuccess();
  }, [])

  useEffect(()=> {
    dispatch({ type: ROUTER_SELECTED_TYPES.ROUTER_SELECTED_TITLE, payload: "Calendar" });
  }, [])

  return (
    <div className="body">
      <div style={{marginLeft:'20px', marginTop:'50px', marginRight:'20px'}} >
        <Calendar />
      </div>
    </div>

  );
}

export default CalendarPage;
