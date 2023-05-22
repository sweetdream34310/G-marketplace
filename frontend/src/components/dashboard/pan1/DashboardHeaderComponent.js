import "../../../style/home.css";
import { Grid } from "@mui/material";
import Pricing from './Pricing'
import Settings from './Settings'
import AuthorizationBoard from './AuthorizationBoard'
import jwt_decode from "jwt-decode";
import { useState } from "react";

function DashboardHeaderComponent() {
  const tokenDecode = jwt_decode(localStorage.getItem("token"))
  const [permissions, setPermissions] = useState(localStorage.getItem('permissions') || []); 

  return (
    <>
      {/* {tokenDecode.role == 'admin' ? */}
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Pricing />
        </Grid>
        {
          tokenDecode.role == 'admin' ?
            <Grid item xs={12} md={4}>
              <Settings />
            </Grid> :
            <div />
        }
        {
          permissions.includes(5) ?
            <Grid item xs={12} md={4}>
              <AuthorizationBoard />
            </Grid> :
            <div />
        }

      </Grid>
    </>
  );
}

export default DashboardHeaderComponent;
