import "../../../style/dashboard.css";
import { useNavigate } from 'react-router-dom';

function AuthorizationBoard() {

  const Navigate = useNavigate();

  const handleClick = () => {
    Navigate('/priceauthorisation')
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
          <a>Authorisation</a>
        </div>
      </div>
      <div className="bottom-pan">
        <div className="bottom-label"></div>
        <div className="bottom-next-icon"></div>
      </div>
    </div>
  );
}

export default AuthorizationBoard;
