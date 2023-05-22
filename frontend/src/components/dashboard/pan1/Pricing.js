import "../../../style/dashboard.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ROUTER_SELECTED_TYPES } from '../../../actions/actionType'

function Pricing() {

  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    Navigate('/pricing')
    dispatch({ type: ROUTER_SELECTED_TYPES.ROUTER_SELECTED_TITLE, payload: "Sales" });
  }
  return (
    <div className="quotation" onClick={handleClick}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          height: "60px",
        }}
      >
        <div className="quotation-label">
          <a>Pricing</a>
        </div>
      </div>
      <div className="bottom-pan">
        <div className="bottom-label"></div>
        <div className="bottom-next-icon"></div>
      </div>
    </div>
  );
}

export default Pricing;
