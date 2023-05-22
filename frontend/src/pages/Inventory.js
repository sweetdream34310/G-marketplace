import Header from "../components/dashboard/Header";
import InventoryComponent from "../components/dashboard/documents/inventory/Inventory";
import "../style/home.css";

function Inventory() {
  return (
    <div className="body transition">
      <Header />
      <InventoryComponent/>
    </div>
  );
}

export default Inventory;
