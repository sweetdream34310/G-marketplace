import { Grid } from "@mui/material";
import Company from "./Company";
import "../../../style/home.css";

function Companys() {
  return (
    <div className="company">
      <div className="vendor-label">Company</div>
      <div className="company-divide"></div>
      <div className="vendor-body">
        <Grid container spacing={4}>
          <Grid item xs={12} md={12} lg={6} xl={6}>
            <Company title="Items" />
          </Grid>
          <Grid item xs={12} md={12} lg={6} xl={6}>
            <Company title="Warehouses" />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Companys;