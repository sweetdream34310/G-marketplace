import "../../style/navbar.css";
import { useNavigate } from "react-router-dom";



function SubmenuItem({ subitem }) {
  
  const Navigate = useNavigate();

  const submenuItemClick = () => {
    subitem == 'Pricing' ? Navigate('/pricing') : subitem == 'Authorisation' ? Navigate('/priceauthorisation') : console.log('');
  }

  return (
    <div className="sublist">
      <div className="sublistItem" onClick={submenuItemClick}>
        {subitem}
      </div>
    </div>
  )
}

export default SubmenuItem;