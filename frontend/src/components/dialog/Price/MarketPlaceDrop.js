import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Badge from '@mui/material/Badge';
import Settings from '@mui/icons-material/Settings';
import { useSelector, useDispatch } from "react-redux";

import "../../../style/home.css";
import { MARKETPLACE_TYPES } from '../../../actions/actionType';

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  // const [selectMarketPlace, setSelectMarketPlace] = React.useState('')
  const setMarketPlace = useSelector((state) => state.marketplace.setMarketPlace);
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickMenu = (item) => {
    // setSelectMarketPlace(item);
    dispatch({ type: MARKETPLACE_TYPES.MARKETPLACE_SELECT, payload: item });
    dispatch({ type: MARKETPLACE_TYPES.GET_DATA_SUCCESS, payload: false });
  };

  const marketPlaces = [
    "Amazon.co.uk (UK)",
    "Amazon.de (Germany)",
    "Amazon.fr (France)",
    "Amazon.it (Italy)",
    "Amazon.es (Spain)",
    "Amazon.nl (Netherlands)",
    "Amazon.se (Sweden)",
    "Amazon.pl (Poland)",
    "Amazon.be (Belgium)",
    "Amazon.tr (Turkey)",
    "Amazon.au (Australia)"
  ]

  React.useEffect(() => {

  }, [setMarketPlace])

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title={setMarketPlace == "" ? "Marketplace dropdown" : setMarketPlace}>
          <Badge color={setMarketPlace == "" ? "error" : "success"} badgeContent="" className='style' >
            <div className="logo" onClick={handleClick} >
              <div className='dropdown-label'>
                <a>{setMarketPlace == "" ? "Drop down Marketplace" : setMarketPlace}</a>
              </div>
            </div>
          </Badge>

        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {marketPlaces.map((item, idx) => (
          <div key={idx}>
            <MenuItem onClick={() => handleClickMenu(item)}>
              <Avatar >
                <Settings />
              </Avatar> {item}
            </MenuItem>
            <Divider />
          </div>
        ))}
      </Menu>
    </React.Fragment>
  );
}