import * as React from 'react';
import '../../../../style/settings.css'
import Toggle from '../../Toggle';
export default function CustomerPermission({ option, permissions, isOpen, setPermission }) {

  const data = [
    {
      title: { content: 'Profit Elevation', isChecked: false },
      subtitle: []
    },
    {
      title: { content: 'SQ Access', isChecked: false },
      subtitle: [
        { content: 'Enable Export', isChecked: false },
      ]
    },
    {
      title: { content: 'SO Access', isChecked: false },
      subtitle: [
        { content: 'Enable Export', isChecked: false },
        { content: 'Access unowned SO', isChecked: false },
        { content: 'Manage Rules', isChecked: false },
        { content: 'Create SO', isChecked: false },
        { content: 'Create SO Reached Credit', isChecked: false },
        { content: 'Confirm SO', isChecked: false },
        { content: 'Confirm Credit SO', isChecked: false },
        { content: 'Cancel SO', isChecked: false },
        { content: 'Void SO', isChecked: false },
        { content: 'Modify Confirmed SO', isChecked: false },
        { content: 'Modify (Confirmed) Unpacked SO', isChecked: false },
        { content: 'Modify Prices', isChecked: false },
        { content: 'Allow SO Reactivation', isChecked: false },
        { content: 'Allow Packing', isChecked: false },
        { content: 'Park/Unpark SO', isChecked: false },
        { content: 'External Invoice Processing', isChecked: false },
        { content: 'Invoice SO', isChecked: false },
        { content: 'Confirm SO Reached Credit', isChecked: false },
        { content: 'Show GP', isChecked: false },
        { content: 'Reset GP', isChecked: false },
        { content: 'Manage SO Picking', isChecked: false },
      ]
    },
    {
      title: { content: 'INV Access', isChecked: false },
      subtitle: [
        { content: 'Enable Export', isChecked: false },
        { content: 'INV Editing', isChecked: false },
        { content: 'INV Delete', isChecked: false }
      ]
    },
    {
      title: { content: 'RMA Access', isChecked: false },
      subtitle: [
        { content: 'Enable Export', isChecked: false }
      ]
    },
  ]

  const [editData, setEditData] = React.useState([]);

  const exchangeData = () => {    
    let displayData = [...data];
    for (const permissionItem of permissions) {
      for (let displayDataItem of displayData) {
        if (permissionItem.title === displayDataItem.title.content) {
          displayDataItem.title.isChecked = true ;
          for (const subPermissionItem of permissionItem.subtitle) {
            for (let subDisplayItem of displayDataItem.subtitle) {
              if (subPermissionItem === subDisplayItem.content) {
                subDisplayItem.isChecked = true;
              }
            }
          }
        }
      }
    }
    setEditData(displayData)
  }

  React.useEffect(() => {
    if (option == 'edit' && isOpen ) {
      exchangeData()
    }
    if(option == 'view all' && isOpen){
    setEditData(data)
    }
    if(option == undefined){
      setEditData(data)
    }
  }, [isOpen])

  return (
    <div className='company-permission'>
      <div className='permission-title'>
        <a className='permission-title-label'>Customers</a>
      </div>
      {editData.map((item, idx) => (
        <div key={idx}>
          <Toggle title={item.title.content} isChecked={item.title.isChecked} permissionName = "Customers" setPermission={setPermission} isOpen = {isOpen}/>
          {item.subtitle.map((subitem, index) => (
            <div key={index} style={{ marginLeft: '20px' }}>
              <Toggle title={subitem.content} isChecked={subitem.isChecked} permissionName = "Customers" subPermissionName = {item.title.content} setPermission={setPermission} isOpen = {isOpen}/>
            </div>
          ))}
          <div></div>
        </div>
      ))}
    </div>
  );
}