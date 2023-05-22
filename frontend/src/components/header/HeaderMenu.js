import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import "../../style/home.css";
import { useNavigate } from 'react-router-dom';
import Profile from '../dialog/Profile/index'
import RestoreIcon from '@mui/icons-material/Restore';

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const [modalOpen, setModalOpen] = React.useState(false)
  const Navigate = useNavigate();


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClickLog = () => {
    Navigate('/log')
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickProfile = () => {
    setModalOpen(true)
  };

  const handleClickLogout = () => {
    localStorage.removeItem('token')
    Navigate('/login')
  };

  const handleCloseModal = () => {
    setModalOpen(false)
  }

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Menu">
          <div className="auth-icon" onClick={handleClick}></div>
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
        <MenuItem onClick={handleClickProfile}>
          <Avatar >
            <ManageAccountsIcon />
          </Avatar> Profile
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClickLog}>
          <Avatar >
            <RestoreIcon />
          </Avatar> Log
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClickLogout}>
          <Avatar >
            <ExitToAppIcon />
          </Avatar> Logout
        </MenuItem>
      </Menu>
      <Profile isOpen={modalOpen} handleClose={handleCloseModal} />
    </React.Fragment>
  );
}