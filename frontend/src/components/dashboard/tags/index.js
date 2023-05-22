import '../../../style/tasklist.css'
import { Button } from '@mui/material';
import TagListItem from './TagListItem'
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import { getAllTag } from '../../../api/tag';
import { toast } from 'react-hot-toast';
import jwt_decode from "jwt-decode";

function TagList() {

  const tokenDecode = jwt_decode(localStorage.getItem("token"))

  const routerSelectedTitle = useSelector((state) => state.selectedRouter.selectedRouterTitle);
  const [allTag, setAllTag] = useState([]);

  const Navigate = useNavigate();

  const handleClick = () => {
    Navigate('/tag');
  }

  const getData = async () => {
    const res = await getAllTag(tokenDecode.username, tokenDecode.role);
    if (res.message == "Success") {
      setAllTag(res.data);
    } else {
      toast.error('Error occured. Please try again.')
    }
  }

  const updateNewTag = (data) => {
    const updateData = [...allTag];
    updateData.push(data);
    setAllTag(updateData);
  }

  const updateDeleteTag = (content) => {
    const updateData = [...allTag];
    const index = updateData.findIndex(({ tagContent }) => tagContent === content);
    updateData.splice(index, 1);
    setAllTag(updateData)
  }

  useEffect(() => {
    getData();
  }, [])

  return <div className="tasklist-board">
    <div className='task-header'>
      <a className='header-label'>Tags</a>
    </div>
    <div className={routerSelectedTitle == 'Dashboard' ? 'tasklist-menu max-height-300' : 'tasklist-menu max-height-700'}>
      {
        allTag.length == 0 ? <div style={{textAlign:'center'}}>No items</div>
          :
          allTag.map((item) => (
            <TagListItem content={item} key={item.tagContent} />
          ))
      }

    </div>
    <div style={{ height: '20px' }} />
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      {routerSelectedTitle == "Dashboard" ?
        <Button
          color="secondary"
          onClick={handleClick}
          variant="contained"
        >
          View More
        </Button> :
        <div />
      }

    </div>
  </div>;
}
export default TagList;
