import Companys from './Companys';
import Vendors from "./Vendors";
import "../../../style/home.css";
import { Grid } from '@mui/material';

function VendorCompany() {
  return (
    <div className="vendor-company">
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Vendors />
        </Grid >
        <Grid item xs={12} md={4}>
          <Companys />
        </Grid>
      </Grid>
    </div>
  );
}

export default VendorCompany;
