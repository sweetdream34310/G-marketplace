import "../../../style/tasklist.css";
import { Button } from "@mui/material";
import TaskListItem from "./TaskListItem";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import TaskAdd from "../../dialog/Task/TaskAdd";
import { useEffect, useState } from "react";
import { getAllTask } from "../../../api/task";
import { toast } from "react-hot-toast";
function TaskList() {
  const routerSelectedTitle = useSelector(
    (state) => state.selectedRouter.selectedRouterTitle
  );
  const [allTask, setAllTask] = useState([]);

  const Navigate = useNavigate();

  const handleClick = () => {
    Navigate("/tasklist");
  };

  const getData = async () => {
    const res = await getAllTask();
    if (res.message == "Success") {
      setAllTask(res.data);
    } else {
      toast.error("Error occured. Please try again.");
    }
  };

  const updateNewTask = (data) => {
    const updateData = [...allTask];
    updateData.push(data);
    setAllTask(updateData);
  };

  const updateDeleteTask = (content) => {
    const updateData = [...allTask];
    const index = updateData.findIndex(
      ({ taskContent }) => taskContent === content
    );
    updateData.splice(index, 1);
    setAllTask(updateData);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="tasklist-board">
      <div className="task-header">
        <a className="header-label">Task list</a>
      </div>
      <div
        className={
          routerSelectedTitle == "Dashboard"
            ? "tasklist-menu max-height-300"
            : "tasklist-menu max-height-700"
        }
      >
        {allTask.length == 0 ? (
          <div style={{ textAlign: "center" }}>No items</div>
        ) : (
          allTask.map((item, index) => (
            <TaskListItem
              status={item.status}
              content={item.taskContent}
              updateDeleteTask={updateDeleteTask}
              key={item.taskContent + index}
            />
          ))
        )}
      </div>
      <div style={{ height: "20px" }} />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {routerSelectedTitle == "Dashboard" ? (
          <Button
            sx={{ background: "#2e3539" }}
            onClick={handleClick}
            variant="contained"
          >
            View More
          </Button>
        ) : (
          <TaskAdd updateNewTask={updateNewTask} />
        )}
      </div>
    </div>
  );
}
export default TaskList;
