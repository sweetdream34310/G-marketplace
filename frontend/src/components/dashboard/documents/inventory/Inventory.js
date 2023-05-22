import '../../../../style/inventory.css'
import InventoryTable from './InventoryTable';

function inventory() {
    return <div className="inventory">
      <div className='inventory-header'>
        <a style={{marginLeft:'10px'}}>Task List</a>
      </div>
      <div className='inventory-table'>
        <InventoryTable/>
      </div>
    </div>;
  }
  export default inventory;
  