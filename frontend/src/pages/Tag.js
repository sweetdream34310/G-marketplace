import "../style/home.css";
import SettingsBoard from '../components/settings'
import TagList from "../components/dashboard/tags";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ROUTER_SELECTED_TYPES } from '../actions/actionType'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import jwt_decode from "jwt-decode";
import { getPermissions } from "../api/user";

function Tag() {
  
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
    dispatch({ type: ROUTER_SELECTED_TYPES.ROUTER_SELECTED_TITLE, payload: "Tags" });
  }, [])
  
  return (
    <div className="body">
      {/* <Header /> */}
      <div style={{ marginLeft: '20px', marginTop:'50px', marginRight:'50px' }}>
        <TagList />
      </div>
    </div>
  );
}

export default Tag;
