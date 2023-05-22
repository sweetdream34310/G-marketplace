import Log from '../components/settings/log'

import "../style/home.css";

function PriceAuthorization({socket}) {

  return (
    <div className="body">
      <div style={{ marginTop: '50px', marginBottom: '20px', width: 'calc(100% - 20px)', height: 'auto', marginRight: '20px' }}>
        <a style={{fontFamily:'sans-serif', fontSize:'20px', fontWeight:'bold', marginLeft:'20px'}}>Log table</a>
        <Log/>
      </div>
    </div>
  );
}

export default PriceAuthorization;
