import "../../../style/dashboard.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ROUTER_SELECTED_TYPES } from '../../../actions/actionType'

function Setting() {
  
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    Navigate('/settings')
    dispatch({ type: ROUTER_SELECTED_TYPES.ROUTER_SELECTED_TITLE, payload: "Settings" });
  }

  return (
    <div className="quotation" onClick={handleClick}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          height: "60px"
        }}
      >
        <div className="quotation-label">
          <a>Setting</a>
        </div>
      </div>
      <div className="bottom-pan">
        <div className="bottom-label"></div>
        <div className="bottom-next-icon"></div>
      </div>
    </div>
  );
}

export default Setting;
