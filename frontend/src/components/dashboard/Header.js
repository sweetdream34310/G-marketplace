import "../../style/home.css";
import MarketPlaceDrop from '../dialog/Price/MarketPlaceDrop'
import { useSelector } from "react-redux";

function Header() {
  const setMarketPlace = useSelector((state) => state.marketplace.setMarketPlace);

  return (
    <div className="header">
      <div className="comName">Ridgewood Global Limited</div>
      <div style={{display:'flex'}}>
        <MarketPlaceDrop />
      </div>

    </div>
  );
}

export default Header;
