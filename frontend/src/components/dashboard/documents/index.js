import "../../../style/home.css";
import Subscribe from "./subscribe/Subscribe";
import Inventory from "./inventory/Inventory";
import { Grid } from "@mui/material";

function Documents() {
  return (
    <div className="document-body">
      <div className="customer-divide margin-20px"></div>
      <div className="documents">
        <div style={{  marginTop: "10px" }}>
          <Subscribe />
        </div>

        <div style={{ marginLeft: "40px", marginTop: "10px" }}>
          <Inventory />
        </div>
        <div className="doc-space"></div>
      </div>
    </div>
  );
}
export default Documents;
