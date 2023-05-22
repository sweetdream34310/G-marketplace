import "../../../style/home.css";
import TaskList from "../tasklist.js";
import Tags from "../tags"

function Pan2() {
  return (
    <div className="pan-1-body">
      <TaskList />
      <Tags/>
    </div>
  );
}

export default Pan2;
