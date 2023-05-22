import * as React from "react";
import "../../../../style/settings.css";
import Toggle from "../../Toggle";
export default function SalesPermission({
  option,
  permissions,
  isOpen,
  setPermission,
  getPermission
}) {
  const data = [
    { title: "View All", isChecked: false },
    { title: "Update Price", isChecked: false },
    { title: "Add New", isChecked: false },
    { title: "Delete", isChecked: false },
    { title: "Price Authorisation", isChecked: false },
  ];
  // {
  //   title: { content: 'View Price', isChecked: false },
  //   subtitle: [
  //     // { content: 'View All', isChecked: false },
  //     // { content: 'View Price with ASIN', isChecked: false },
  //     // { content: 'View Price with SKU', isChecked: false }
  //   ]
  // },
  // {
  //   title: { content: 'Update Price', isChecked: false },
  //   subtitle: []
  // },
  // {
  //   title: { content: 'Add New', isChecked: false },
  //   subtitle: []
  // },
  // {
  //   title: { content: 'Delete', isChecked: false },
  //   subtitle: []
  // },
  // {
  //   title: { content: 'Price Authorisation', isChecked: false },
  //   subtitle: []
  // },
  // ]

  const [editData, setEditData] = React.useState([]);

  const exchangeData = () => {
    let displayData = [...data];
    for (const permissionItem of permissions) {
      displayData[permissionItem - 1].isChecked = true
    }
    setEditData(displayData)
    getPermission(permissions)
    // getPermissions(displayData)
  }

  React.useEffect(() => {
    if (option == "edit" && isOpen) {
      exchangeData()
    }
    if (option == "view all" && isOpen) {
      setEditData(data);
    }
    if (option == undefined) {
      setEditData(data)
    }
  }, [isOpen]);

  return (
    <div className="company-permission">
      <div className="permission-title">
        <a className="permission-title-label">Sales</a>
      </div>
      {editData.map((item, idx) => (
        <div key={idx}>
          <Toggle
            title={item.title}
            isChecked={item.isChecked}
            permissionName="Sales"
            setPermission={setPermission}
            isOpen={isOpen}
          />
        </div>
      ))}
    </div>
  );
}
