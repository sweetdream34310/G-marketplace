import "../../style/navbar.css";
import { useState } from "react";
import jwt_decode from "jwt-decode";
import MenuItem from "./MenuItem";

function MainMenu() {

  const userAccount = jwt_decode(localStorage.getItem("token"))

  let submenuItems = [];

  if (userAccount.role == 'admin') {
    submenuItems = [
      "Task List",
      "Calendar",
      "Tags",
      "Dashboard",
      // "Inventory",
      // "Vendors",
      "Sales",
      // "Contacts",
      // "Report Centre",
      // "EDI",
      // "Marketplaces",
      "Settings"
    ];
  } else {
    submenuItems =
      [
        "Task List",
        "Calendar",
        "Tags",
        "Dashboard",
        "Sales",
      ];
  }

  const [selectedId, setSelectedId] = useState(-1);

  return (
    <div className="mainmenu-body">
      {submenuItems.map((item, idx) => {
        return (
          <MenuItem
            item={item}
            key={idx}
            idx={idx}
            isSelected={selectedId == idx}
            onSelected={() => {
              setSelectedId(idx);
            }}
          />
        );
      })}
    </div>
  );
}
export default MainMenu;
