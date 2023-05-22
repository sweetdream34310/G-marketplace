import React, { Component, useState } from "react";
import { render } from "react-dom";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "../../style/style.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import ScheduleDialog from "../dialog/Calendar";

export default function CalendarComponent() {
  const localizer = momentLocalizer(moment);
  const [eventsList, setEventsList] = React.useState([]);
  const now = new Date();

  const [isOpen, setIsOpen] = React.useState(false);
  const [scheduleTime, setScheduleTime] = React.useState({});

  const events = [
   
    {
      id: 14,
      title: "Party",
      start: new Date(new Date().setHours(new Date().getHours() - 3)),
      end: new Date(new Date().setHours(new Date().getHours() + 1)),
    },
    {
      id: 15,
      title: "Interview",
      start: now,
      end: now,
    },
    {
      id: 16,
      title: "Meeting",
      start: new Date(2022, 11, 15, 19, 30, 0),
      end: new Date(2022, 11, 15, 20, 30, 0),
    },
  ];

  function handleSelect({ start, end }) {
    
    const schedule = {
      startTime: start,
      endTime: end,
    };
    
    setIsOpen(true);
    setScheduleTime(schedule);

    // const title = window.prompt('New Event name')
    // if (title) {
    //     var newEvent = {
    //         start: start,
    //         end: end,
    //         title: title
    //     }
    //     let updateEventsList = eventsList;
    //     updateEventsList.push(newEvent);
    //     setEventsList(updateEventsList);
    // }
  }

  return (
    <div style={{ marginTop: "40px" }}>
      <div style={{ height: "500pt" }}>
        <Calendar
          events={events}
          startAccessor="start"
          endAccessor="end"
          defaultDate={moment().toDate()}
          localizer={localizer}
          onSelectSlot={handleSelect}
          selectable
          popup={true}
          // style={{backgroundColor: ''}}
        />
      </div>
      <ScheduleDialog isOpen={isOpen} handleClose={() => setIsOpen(false)} schedule = {scheduleTime} />
    </div>
  );
}
