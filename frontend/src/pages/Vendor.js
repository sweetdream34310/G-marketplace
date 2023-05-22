import Header from "../components/dashboard/Header";
import Vendors from "../components/dashboard/vendorcompany/Vendors";

import "../style/home.css";

function Inventory() {
  return (
    <div className="body">
      <Header />
      <div style={{ marginLeft: '20px' }}>
        <Vendors />
      </div>
    </div>
  );
}

export default Inventory;
