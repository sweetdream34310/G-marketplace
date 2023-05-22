import "../../../style/home.css";
import { Grid } from "@mui/material";

import CustomerItem from "./CustomerItem";
function Customer() {
  return (
    <div className="customer">
      <div className="vendor-label">Customers</div>
      <div className="customer-divide"></div>
      <div className="customer-body">
        <Grid container spacing={4}>
          <Grid item xs={12} md={6} lg={6} xl={3}>
            <CustomerItem title="Quotations" subTitle="SQ"/>
          </Grid>
          <Grid item xs={12} md={6} lg={6} xl={3}>
            <CustomerItem title="Sales Order" subTitle="SO"/>
          </Grid>
          <Grid item xs={12} md={6} lg={6} xl={3}>
            <CustomerItem title="Shipments" subTitle="SHP"/>
          </Grid>
          <Grid item xs={12} md={6} lg={6} xl={3}>
            <CustomerItem title="Invoices" subTitle="INV"/>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Customer;
