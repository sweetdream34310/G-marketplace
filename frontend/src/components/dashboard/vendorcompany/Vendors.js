import { Grid } from "@mui/material";
import Quotation from "./Quotation";
import "../../../style/home.css";

function Vendors() {
  return (
    <>
      <div className="vendor">
        <div className="vendor-label">Vendors</div>
        <div className="vendor-divide"></div>
        <div className="vendor-body">
          <Grid container spacing={4}>
            <Grid item xs={12} md={6} lg={6} xl={3}>
              <Quotation title="Quotations" subTitle="RFQ" />
            </Grid>
            <Grid item xs={12} md={6} lg={6} xl={3}>
              <Quotation title="Purchase Orders" subTitle="PO" />
            </Grid>
            <Grid item xs={12} md={6} lg={6} xl={3}>
              <Quotation title="Receiving Transactions" subTitle="RCT" />
            </Grid>
            <Grid item xs={12} md={6} lg={6} xl={3}>
              <Quotation title="BILLS" subTitle="BILLS" />
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
}
export default Vendors