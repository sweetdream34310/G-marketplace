import * as React from 'react';
import '../../../../style/settings.css'
import Toggle from '../../Toggle';
export default function VendorPermission({ option, permissions, isOpen, setPermission }) {
  const data = [
    {
      title: { content: 'RFQ Access', isChecked: false },
      subtitle: [
        { content: 'Edit RFQ', isChecked: false },
        { content: 'Allow Export RFQ', isChecked: false }
      ]
    },
    {
      title: { content: 'Access PO', isChecked: false },
      subtitle: [
        { content: 'Confirm PO', isChecked: false },
        { content: 'Edit PO', isChecked: false },
        { content: 'Edit PO Prices', isChecked: false },
        { content: 'Enable Export', isChecked: false },
        { content: 'Enable INSHP Export', isChecked: false },
        { content: 'Delete PO', isChecked: false }
      ]
    },
    {
      title: { content: 'Inbound Access', isChecked: false },
      subtitle: [
        { content: 'Delete ASN', isChecked: false },
        { content: 'Delete INSHP', isChecked: false }
      ]
    },
    {
      title: { content: 'RCT Access', isChecked: false },
      subtitle: [
        { content: 'Enable Export', isChecked: false },
        { content: 'Delete RCT', isChecked: false }
      ]
    },
    {
      title: { content: 'Inventory Forecasting', isChecked: false },
      subtitle: []
    },
    {
      title: { content: 'Access Bill', isChecked: false },
      subtitle: [
        { content: 'Enable Export', isChecked: false },
        { content: 'Create Bills', isChecked: false },
        { content: 'Delete Bills', isChecked: false },
      ]
    },
  ]

  const [editData, setEditData] = React.useState([]);

  const exchangeData = () => {
    let displayData = [...data];
    for (const permissionItem of permissions) {
      for (let displayDataItem of displayData) {
        if (permissionItem.title === displayDataItem.title.content) {
          displayDataItem.title.isChecked = true && (permissionItem.subtitle.length > 0);
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
    if (option == 'edit' && isOpen) {
      exchangeData()
    }
    if (option == 'view all' && isOpen){
      setEditData(data)
    }
    if(option == undefined){
      setEditData(data)
    }
  }, [isOpen])

  return (
    <div className='company-permission'>
      <div className='permission-title'>
        <a className='permission-title-label'>Vendors</a>
      </div>
      {editData.map((item, idx) => (
        <div key={idx}>
          <Toggle title={item.title.content} isChecked={item.title.isChecked} permissionName = "Vendors" setPermission={setPermission} isOpen = {isOpen}/>
          {item.subtitle.map((subitem, index) => (
            <div key={index} style={{ marginLeft: '20px' }}>
              <Toggle title={subitem.content} isChecked={subitem.isChecked} permissionName = "Vendors" subPermissionName = {item.title.content} setPermission={setPermission} isOpen = {isOpen}/>
            </div>
          ))}
          <div></div>
        </div>
      ))}
    </div>
  );
}