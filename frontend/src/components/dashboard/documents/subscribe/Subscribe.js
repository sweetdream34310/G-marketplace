import "../../../../style/dashboard.css";
import SubscribeList from "./SubscribeList";

function Subscribe() {
  return <div className="subscribe">
    <div className="subscribe-header">Tags</div>
      <div className="subscribe-data">
        <SubscribeList/>          
      </div>
  </div>;
}
export default Subscribe;
