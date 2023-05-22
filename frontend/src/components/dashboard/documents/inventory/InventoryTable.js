import "../../../../style/inventory.css";
import TableItem from "./TableItem";
function InventoryTable() {
  return (
    <div>
      <div className="inventory-table-header">
        <div className="display-flex align-items-center font-match width-25-per outline">
          <a>SKU</a>
        </div>
        <div className="display-flex align-items-center font-match width-25-per outline">
          <a>Marketplace</a>
        </div>
        <div className="display-flex align-items-center font-match width-25-per outline">
          <a>Current price</a>
        </div>
        <div className="display-flex align-items-center font-match width-25-per outline">
          <a>Requried price</a>
        </div>
      </div>
      <TableItem />
      <TableItem />
      <TableItem />
      
    </div>
  );
}
export default InventoryTable;
