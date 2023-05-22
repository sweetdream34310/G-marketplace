import { Grid } from '@mui/material';
import React, { useState, useEffect, useRef } from "react";
import Switch from '@mui/material/Switch';
import '../../style/settings.css'
import UserTable from './usertable/UserTable'
import RoleTable from './roletable/RoleTable'
import Permission from './permissions/PermissionBoard';
import LogTable from './log'

export default function SettingsBoard() {

  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <div className='settingboard'>
      <Grid container spacing={2}>
        <Grid item xs={12} xl={8}>
          <UserTable />
        </Grid>
        <Grid item xs={12} xl={3.9}>
          <RoleTable />
        </Grid>
      </Grid>
      <div className='switch-board' >
        <Switch
          checked={checked}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'controlled' }}
        />
        <a>View all permissions</a>
      </div>
      {checked ? <Permission /> : <></>}
    </div>
  );
}