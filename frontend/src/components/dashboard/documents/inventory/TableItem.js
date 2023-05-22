import "../../../../style/inventory.css";

function TableItem() {
  return (
    <div className="inventory-table-header">
      <div className="display-flex align-items-center font-blue width-25-per background-white outline">
        <a>Task1</a>
      </div>
      <div className="display-flex align-items-center  width-25-per background-white outline">
        <a>FBA EU</a>
      </div>
      <div className="display-flex align-items-center  width-25-per background-white outline">
        <a>0</a>
      </div>
      <div className="display-flex align-items-center  width-25-per background-white outline">
        <a>200</a>
      </div>
    </div>
  );
}

export default TableItem;
