import "../../../style/home.css";
import DashboardHeaderComponent from './DashboardHeaderComponent'
import Calendar from '../../../components/calendar/Calendar'

import { Grid } from "@mui/material";

function Pan1() {
  return (
    <div className="pan-1-body">
      <DashboardHeaderComponent />
      <Calendar />
    </div>
  );
}

export default Pan1;
