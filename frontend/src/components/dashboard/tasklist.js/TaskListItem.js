import '../../../style/tasklist.css'
import { useSelector } from "react-redux";
import TaskEdit from '../../dialog/Task/TaskEdit';
import TaskDelete from '../../dialog/Task/TaskDelete';
import { useState } from 'react';

function TaskListItem({ status, content, updateDeleteTask }) {

  const [contentDisplay, setContentDisplay] = useState(content)
  const routerSelectedTitle = useSelector((state) => state.selectedRouter.selectedRouterTitle);

  let label = ''
  status == "success" ? label = 'Task finished' : status == 'pending' ? label = 'Pending now' : status == "empty" ? label = 'Empty' : label = 'New task';
  
  const updateEditTask = (data) => {
    console.log(data)
    setContentDisplay(data)
  }


  return <div className={status == 'success' ? "tasklist-item task-complete-color" : status == "pending" ? "tasklist-item task-pending-color" : status == "empty" ? "tasklist-item task-pending-color" : "tasklist-item task-notcompleted-color"}
    // onMouseDown={handleMouseDown}
    // onMouseLeave={handleMouseLeave}
    // onMouseEnter={handleMouseEnter}
    // onMouseUp={handleMouseUp}
    // ref={me}
  >
    <div style={{ display: 'flex' }}>
      <div className='tasklist-item-id'>
        <div className={status == 'success' ? "lable-center-x success-icon" : status == "pending" ? "lable-center-x pending-icon" : "lable-center-x new-icon"} ></div>
      </div>
      <div >
        <div style={{ marginTop: '5px' }} className='task-title'>{label}</div>
        <div style={{ height: '5px' }} />
        <div>{contentDisplay}</div>
      </div>
    </div>
    {routerSelectedTitle != 'Dashboard' && status != "empty" ?
      <div className='list-item-action'>
        <TaskEdit updateEditTask = {updateEditTask} content= {contentDisplay}/>
        <TaskDelete updateDeleteTask ={updateDeleteTask} content= {contentDisplay}/>
      </div> : <div />}

  </div>;
}
export default TaskListItem;


// let mouseGrabFlag = false;
  // const me = useRef();
  // let [left, setLeft] = useState(0);
  // let offsetX = 0;
  // let offsetXbefor = 0;


  // const handleMouseUpDocument = (event) => {
  //   if (routerSelectedTitle != "Dashboard") {
  //     document.body.style.cursor = 'default'
  //     onFlag(false)
  //     offsetX = event.pageX;
      
  //     console.log(offsetX, "mouseUp >>>>>>>>>>>>>>");
  //   }

  //   // setFlag(-1);
  // }

  // const handleMouseDown = (event) => {
  //   if (routerSelectedTitle != "Dashboard") {
  //     document.addEventListener('mouseup', handleMouseUpDocument, { once: true });
  //     document.addEventListener('mousemove', handleMouseMove)
  //     document.body.style.cursor = "grabbing"
  //     onFlag(true);
  //   }
  // }

  // const handleMouseMove = (event) => {
  //   offsetXbefor = event.pageX;
  //   left += offsetXbefor; 
  //   setLeft(left)
  //   console.log(left)
  // }

  // const handleMouseLeave = (event) => {
  //   if (routerSelectedTitle != "Dashboard") {
  //     if (!flag) {
  //       document.body.style.cursor = "default"
  //     }
  //   }
  // }

  // const handleMouseEnter = (event) => {
  //   if (routerSelectedTitle != "Dashboard") {
  //     if (!flag) {
  //       document.body.style.cursor = "grab"
  //     }
  //   }
  // }
  // const handleMouseUp = (event) => {
  //   if (routerSelectedTitle != "Dashboard") {
  //     if (flag) {
  //       document.body.style.cursor = 'default'
  //       onFlag(false)
  //     }
  //   }
  // }

  // useEffect(() => {
  //   me.current.style.left = `${left}px`
  // }, [left])