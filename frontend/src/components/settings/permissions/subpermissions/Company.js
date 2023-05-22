import * as React from 'react';
import '../../../../style/settings.css'
import Toggle from '../../Toggle';
export default function CompanyPermission({ option, permissions, isOpen, setPermission }) {
  const data = [
    {
      title: { content: 'Allow Data Export', isChecked: false },
      subtitle: []
    },
    {
      title: { content: 'Access Parts', isChecked: false },
      subtitle: [
        { content: 'Enable Export', isChecked: false },
        { content: 'Modifying prices', isChecked: false },
        { content: 'Show buying price', isChecked: false },
        { content: 'Manage product metadata', isChecked: false },
        { content: 'Edit part details', isChecked: false },
        { content: 'Edit part images', isChecked: false },
        { content: 'Show part QuickView', isChecked: false },
        { content: 'Access part assembly', isChecked: false }
      ]
    },
    {
      title: { content: 'Allow Accounting Export', isChecked: false },
      subtitle: []
    },
    {
      title: { content: 'Manage Warehouses', isChecked: false },
      subtitle: []
    },
    {
      title: { content: 'Warehouse transactions', isChecked: false },
      subtitle: [
        { content: 'Creat TRC', isChecked: false },
        { content: 'Confirm TRC', isChecked: false },
        { content: 'Unconfirm TRC', isChecked: false },
        { content: 'Confirm TRN', isChecked: false },
        { content: 'Unconfirm TRN', isChecked: false },
        { content: 'Enable Expert', isChecked: false }
      ]
    },
    {
      title: { content: 'Access Contracts', isChecked: false },
      subtitle: [
        { content: 'Export contacts', isChecked: false },
        { content: 'View contact reports', isChecked: false },
        { content: 'Create new contact', isChecked: false },
        { content: 'Manage existing contacts', isChecked: false },
        { content: 'Change contact status', isChecked: false },
        { content: 'Delete Contact', isChecked: false }
      ]
    },
    {
      title: { content: 'Access Report Centre', isChecked: false },
      subtitle: []
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
    if (option == 'edit' && isOpen) {
      exchangeData()
    }
    if (option == 'view all' && isOpen) {
      setEditData(data)
    }
    if(option == undefined){
      setEditData(data)
    }
  }, [isOpen])

  return (
    <div className='company-permission'>
      <div className='permission-title'>
        <a className='permission-title-label'>Company</a>
      </div>
      {editData.map((item, idx) => (
        <div key={idx}>
          <Toggle title={item.title.content} isChecked={item.title.isChecked} permissionName = "Company" setPermission={setPermission} isOpen = {isOpen}/>
          {item.subtitle.map((subitem, index) => (
            <div key={index} style={{ marginLeft: '20px' }}>
              <Toggle title={subitem.content} isChecked={subitem.isChecked} permissionName = "Company" subPermissionName = {item.title.content} setPermission={setPermission} isOpen = {isOpen}/>
            </div>
          ))}
          <div></div>
        </div>
      ))}
    </div>
  );
}