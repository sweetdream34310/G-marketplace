import "../../style/navbar.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import SubmenuItem from "./SubmenuItem";
import { useSelector, useDispatch } from "react-redux";
import { ROUTER_SELECTED_TYPES } from "../../actions/actionType";
import jwt_decode from "jwt-decode";

function MenuItem({ item, isSelected, onSelected, idx }) {
  const permissions = localStorage.getItem('permissions')

  const dispatch = useDispatch();

  let itemname = item;
  let sellected = isSelected;

  const routerSelectedTitle = useSelector(
    (state) => state.selectedRouter.selectedRouterTitle
  );

  if (itemname == routerSelectedTitle) {
    itemname = routerSelectedTitle;
    sellected = true;
  } else {
    sellected = false;
  }

  const Navigate = useNavigate();

  const [submenuSelect, setSubmenuSelect] = useState(false);

  const submenuClick = () => {
    sellected
      ? submenuSelect
        ? setSubmenuSelect(false)
        : setSubmenuSelect(true)
      : console.log("");
  };

  const handleClick = () => {
    onSelected();

    if (itemname == "Dashboard") {
      Navigate("/dashboard");
    } else if (itemname == "Sales") {
      submenuClick();
      dispatch({
        type: ROUTER_SELECTED_TYPES.ROUTER_SELECTED_TITLE,
        payload: "Sales",
      });
    } else if (itemname == "Settings") {
      Navigate("/settings");
    } else if (itemname == "Task List") {
      Navigate("/tasklist");
    } else if (itemname == "Calendar") {
      Navigate("/calendar");
      // dispatch({ type: ROUTER_SELECTED_TYPES.ROUTER_SELECTED_TITLE, payload: "Calendar" });
    } else if (itemname == "Tags") {
      Navigate("/tag");
    } else Navigate("/pagenotfound");
  };

  let logoName = "logo" + idx;
  let selecetName = "selected" + idx;
  let subListMenu = "";
  {
    permissions.includes(5) 
      ? (subListMenu = ["Pricing", "Authorisation"])
      : (subListMenu = ["Pricing"]);
  }

  return (
    <div>
      <div
        className={
          itemname == "Dashboard" && sellected
            ? "menuitem-body clicked-menu-item-body margin-top-30px border-up-line"
            : itemname != "Dashboard" && sellected
            ? "menuitem-body clicked-menu-item-body menuitem-body"
            : itemname == "Dashboard" && !sellected
            ? "menuitem-body margin-top-30px border-up-line"
            : "menuitem-body "
        }
        onClick={handleClick}
      >
        <div
          className={
            sellected
              ? `logo-size-position ${selecetName}`
              : `logo-size-position email-logo ${logoName} `
          }
        ></div>
        <div className={sellected ? "item-label font-white" : "item-label"}>
          {itemname}
        </div>
        {itemname == "Sales" ? (
          submenuSelect && sellected ? (
            <div className="faq-item__title-icon icon-down" />
          ) : (
            <div className="faq-item__title-icon icon-right" />
          )
        ) : sellected ? (
          <div className="triangle"></div>
        ) : (
          <></>
        )}
      </div>
      {itemname == "Sales" ? (
        submenuSelect && sellected ? (
          <div>
            {subListMenu.map((subitem, idx) => {
              return <SubmenuItem subitem={subitem} key={idx} />;
            })}
          </div>
        ) : (
          <div />
        )
      ) : (
        <div />
      )}
    </div>
  );
}
export default MenuItem;
