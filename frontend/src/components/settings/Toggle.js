import * as React from "react";
import Switch from "@mui/material/Switch";
import "../../style/settings.css";

export default function Toggle({
  title,
  isChecked,
  permissionName,
  subPermissionName,
  setPermission,
  isOpen,
}) {
  const [checked, setChecked] = React.useState(isChecked);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    let toggleData = 0;

    if (title == "View All") {
      toggleData = 1;
    } else if (title == "Update Price") {
      toggleData = 2;
    } else if (title == "Add New") {
      toggleData = 3;
    } else if (title == "Delete") {
      toggleData = 4;
    } else if (title == "Price Authorisation") {
      toggleData = 5;
    }


    // let subPermissionNameTemp = ""
    // let subpermissionData = "";
    // if (subPermissionName == undefined) {
    //   subPermissionNameTemp = title;
    // }
    // else {
    //   subPermissionNameTemp = subPermissionName;
    //   subpermissionData = title;
    // }
    // let permissionData = [];
    // const index = permissionData.findIndex((item) => item == toggleData)

    // if(index == -1) {
    //   permissionData.push(toggleData)
    // } else {

    // }
    // console.log(index)
    setPermission(toggleData);
  };

  React.useEffect(() => {
    if (!isOpen) {
      setChecked(false);
    }
  }, [isOpen]);

  return (
    <div className="toggle-board">
      <Switch
        checked={checked}
        onChange={handleChange}
        inputProps={{ "aria-label": "controlled" }}
        color="success"
        size="small"
      />
      <a>{title}</a>
    </div>
  );
}
