import Pan1 from "../components/dashboard/pan1";
import Pan2 from "../components/dashboard/pan2";
import "../style/home.css";
import { Grid } from "@mui/material";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ROUTER_SELECTED_TYPES } from "../actions/actionType";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import jwt_decode from "jwt-decode";
import { getPermissions } from "../api/user";

function Home() {
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

  useEffect(() => {
    dispatch({
      type: ROUTER_SELECTED_TYPES.ROUTER_SELECTED_TITLE,
      payload: "Dashboard",
    });
  }, []);

  return (
    <div className="body">
      <div
        style={{ marginLeft: "20px", marginTop: "40px", marginRight: "20px" }}
      >
        <Grid container spacing={4}>
          <Grid item xs={12} lg={6} xl={8} md={8}>
            <Pan1 />
          </Grid>
          <Grid item xs={12} lg={6} xl={4} md={4}>
            <Pan2 />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Home;
