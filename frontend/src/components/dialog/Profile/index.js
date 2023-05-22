import { Fragment, useEffect, useState } from 'react'
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { toast } from 'react-hot-toast';
import "../../../style/profile.css";
import Avatar from '@mui/material/Avatar';
import { blue, green, pink } from '@mui/material/colors';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import jwt_decode from "jwt-decode";
import BadgeIcon from '@mui/icons-material/Badge';
import LockResetIcon from '@mui/icons-material/LockReset';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import LoadingButton from '@mui/lab/LoadingButton';
import { useNavigate } from 'react-router-dom';
import { changeAccount, getRole } from '../../../api/user';

export default function MyModal({ isOpen, handleClose }) {

  const [userAccount, setUserAccount] = useState('');
  const [isChangeBtnClick, setIsChangeBtnClick] = useState(false);
  const [username, setUsername] = useState('')
  const [role, setRole] = useState('')
  const [oldpassword, setOldpassword] = useState('')
  const [newpassword, setNewpassword] = useState('')
  const [loading, setLoading] = useState(false)

  const Navigate = useNavigate();

  const handleChange = () => {
    setIsChangeBtnClick(true)
  }

  const handleCancel = () => {
    setIsChangeBtnClick(false)
  }

  const handleChangeText = (e) => {
    if (e.target.name == 'username') {
      setUsername(e.target.value)
    }
    if (e.target.name == 'oldpassword') {
      setOldpassword(e.target.value)
    }
    if (e.target.name == 'newpassword') {
      setNewpassword(e.target.value)
    }
  }

  const getRoleWithEmail = async () => {
    const userRole = await getRole(jwt_decode(localStorage.getItem("token")).email);

    if(!role) {
      setRole(userRole)
    } 
  }

  const handleSave = async () => {
    if (isChangeBtnClick) {
      if (username == '' || oldpassword == '' || newpassword == '') toast.error('Fill all the blank.')
      else {

        const sendData = {
          email: userAccount.email,
          username: username,
          oldPassword: oldpassword,
          newPassword: newpassword
        }

        setLoading(true);
        const res = await changeAccount(sendData);
        if (res.message == 'success') {
          localStorage.setItem('token', res.token)
          setIsChangeBtnClick(false)
          toast.success('success');
          handleClose();
        } else {
          toast.error(res.message)
        }
        setLoading(false)
      }
    } else {
      handleClose();
    }
  }

  useEffect(() => {
    if (isOpen) {
      setUserAccount(jwt_decode(localStorage.getItem("token")))
      setUsername(jwt_decode(localStorage.getItem("token")).username)
      setOldpassword(jwt_decode(localStorage.getItem("token")).password)
      getRoleWithEmail();
    }
  }, [isOpen])
  return (
    <>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
        PaperProps={{ sx: { width: "400px", maxWidth: '500px', height: "auto", borderRadius: '5px', background: '#333b3f' } }}
      >
        <div className="modal-header">
          <div className="modal-header-text-role">
            <FavoriteIcon color='primary' />
            <div style={{ width: '30px' }}></div>
            <a>Your Profile</a>
          </div>
        </div>
        <DialogContent>
          <div className="dialog-content">
            <Avatar alt="Remy Sharp" sx={{ width: '130px', height: '130px', marginLeft: 'auto', marginRight: 'auto', marginTop: '40px', bgcolor: green[500] }} />
            <div className="dialog-content-label" style={{ fontSize: '15px', color: 'white', marginTop: '30px' }}>
              <a>{userAccount.email}</a>
            </div>
            <div className="dialog-content-label" style={{ fontSize: '15px', color: 'gray' }}>
              <a>"Hope you are having a good day."</a>
            </div>
            {
              isChangeBtnClick ?
                <div style={{ marginTop: '30px' }}>
                  <div className="profile-input-container">
                    <div className="profile-icon">
                      <div>
                        <BadgeIcon />
                      </div>
                    </div>
                    <input className="profile-input-field" type="text" placeholder="Username" name="username" defaultValue={userAccount.username} required onChange={handleChangeText} />
                  </div>
                  <div className="profile-input-container">
                    <div className="profile-icon">
                      <div>
                        <VpnKeyIcon />
                      </div>
                    </div>
                    <input className="profile-input-field" type="password" placeholder="Password" name="oldpassword" defaultValue='' required onChange={handleChangeText} />
                  </div>
                  <div className="profile-input-container">
                    <div className="profile-icon">
                      <div>
                        <LockResetIcon />
                      </div>
                    </div>
                    <input className="profile-input-field" type="password" placeholder="New password" name="newpassword" required onChange={handleChangeText} />
                  </div>
                </div> :
                <>
                  <div className="dialog-content-label" style={{ fontSize: '20px', marginTop: '40px', color: 'beige' }}>
                    <a>Name :  {username}</a>
                  </div>
                  <div className="dialog-content-label" style={{ fontSize: '20px', color: 'beige', marginBottom: '50px' }}>
                    <a>Role :  {role}</a>
                  </div>
                </>
            }

          </div>
        </DialogContent>
        <DialogActions>
          {isChangeBtnClick ? <Button variant="contained" endIcon={<PublishedWithChangesIcon />} sx={{ background: '#2e3539' }} onClick={handleCancel}>
            Cancel
          </Button> : <Button variant="contained" endIcon={<PublishedWithChangesIcon />} sx={{ background: '#2e3539' }} onClick={handleChange}>
            Change
          </Button>}

          <LoadingButton
            loading={loading}
            loadingPosition="end"
            endIcon={<SendIcon />}
            variant="contained"
            sx={{ background: '#2e3539' }}
            onClick={handleSave}
          >
            Ok
          </LoadingButton>

        </DialogActions>
      </Dialog>
    </>
  )
}
