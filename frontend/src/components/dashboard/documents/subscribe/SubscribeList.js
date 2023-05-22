import "../../../../style/dashboard.css";
import ListItem from "./ListItem";
function SubscribeList() {
  return (
    <div className="subscribe-list">
      <div className="list-header">
        <div className="list-header-title">Document</div>
      </div>
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
    </div>
  );
}
export default SubscribeList;
