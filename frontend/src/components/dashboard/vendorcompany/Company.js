import { useNavigate } from "react-router-dom";

import "../../../style/dashboard.css";

function Company({ title }) {
  const Navigate = useNavigate();
  const handleClick = () => {
    // title == 'Items' ? Navigate('/products') : Navigate('/');
  }
  return (
    <div className="company-item" onClick={handleClick}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          height: "60px"
        }}
      >
        <div className="quotation-label">{title}</div>
        <div className={`quotation-logo-position ${title}`}></div>
      </div>
      <div className="bottom-pan">
        <div className="bottom-label"></div>
        <div className="bottom-next-icon"></div>
      </div>
    </div>
  );
}

export default Company;
