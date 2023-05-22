import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "../../../style/pricemodal.css";
import dayjs from "dayjs";
import { Button, Paper } from "@mui/material";
import jwt_decode from "jwt-decode";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useSelector, useDispatch } from "react-redux";

export default function MyModal({ isOpen, handleClose, schedule }) {
  const userProfile = jwt_decode(localStorage.getItem("token"));

  const startTimeDisplay = dayjs(schedule.startTime);
  const endTimeDisplay = startTimeDisplay + 30 * 60 * 1000;

  const year = startTimeDisplay.$y;
  const month = startTimeDisplay.$M + 1;
  const day = startTimeDisplay.$D;

  // const [eventYear, setEventYear] = useState(year)
  // const [eventMonth, setEventMonth] = useState(month)
  // const [eventDay, setEventDay] = useState(day);

  const [eventDuration, setEventDuration] = useState({});
  const [startTime, setStartTime] = useState(startTimeDisplay);
  const [endTime, setEndTime] = useState(endTimeDisplay);


  const getDuration = (start, end) => {
    const length = end - start;

    const totalDurationMins = length / (60 * 1000);
    const durationHours = Math.floor(totalDurationMins / 60);
    const durationMins = totalDurationMins - durationHours * 60;

    const duration = {
      hours: durationHours,
      mins: durationMins,
    };

    setEventDuration(duration);
  };

  async function savePrice() {
    // console.log( getHours(startTime, endTime) )
  }

  useEffect(() => {
    getDuration(startTime, endTime);
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        PaperProps={{ sx: { width: "60%", height: "auto", minWidth: "400px" } }}
      >
        <DialogTitle>Team Schedule event</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Title"
            type="string"
            fullWidth
            variant="standard"
          />
          <div style={{ height: "30px" }}></div>
          <Paper>
            <div style={{ height: "10px" }}></div>
            <div style={{ marginLeft: "30px" }}>Event Time : <a style={{color:'red'}}>{month}/{day}/{year}</a></div>
            <div style={{ height: "20px" }}></div>
            <div
              style={{
                display: "flex",
                marginLeft: "30px",
                marginRight: "auto",
              }}
            >
              <MobileTimePicker
                label="Start time"
                value={startTime}
                onChange={(newStartTime) => {
                  setStartTime(newStartTime);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
              <div style={{ width: "30px" }}></div>
              <MobileTimePicker
                label="End time"
                value={endTime}
                onChange={(newEndTime) => {
                  setEndTime(newEndTime);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </div>
            <div style={{ height: "20px" }}></div>
            <div style={{ marginLeft: "30px" }}>Duration : <a style={{color:'red'}}>{eventDuration.hours}:{eventDuration.mins}</a> </div>
            <div style={{ height: "20px" }}></div>
          </Paper>
          <div style={{ height: "20px" }}></div>
          <Paper>
            <div style={{ height: "10px" }}></div>
            <div style={{ marginLeft: "30px" }}>Members</div>
            <div style={{ height: "20px" }}></div>
            <div
              style={{
                display: "flex",
                marginLeft: "30px",
                marginRight: "auto",
              }}
            >
              <MobileTimePicker
                label="Start time"
                value={startTime}
                onChange={(newStartTime) => {
                  setStartTime(newStartTime);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </div>
            <div style={{ height: "20px" }}></div>
            <div style={{ marginLeft: "30px" }}>Duration : </div>
            <div style={{ height: "20px" }}></div>
          </Paper>
        </DialogContent>
        <DialogActions>
          <Button
            aria-label="delete"
            sx={{ background: "#2e3539" }}
            variant="contained"
            onClick={handleClose}
          >
            Back
          </Button>
          <Button
            aria-label="delete"
            sx={{ background: "#2e3539" }}
            variant="contained"
            onClick={savePrice}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
}
