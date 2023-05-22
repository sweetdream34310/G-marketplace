import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import Calendar from 'react-calendar';
import '../../style/calendar.css'
// import allActions from '../../actions';

export default function CalendarComponent() {
//   const dispatch = useDispatch();

  const [value, setValue] = useState(new Date());
  
//   const onChange = (e) => {
//     setValue(e);
//     dispatch(allActions.adminAction.setDate(e));
//   }

  return (
    <div style={{marginTop:'20px', marginLeft:'10px'}}>
      <Calendar value={value} />
    </div>
  );
}