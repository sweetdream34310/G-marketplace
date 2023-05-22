import React, { useState, useEffect } from 'react';
import '../style/signup.css';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import { login } from '../api/user';
import { forgotPassword } from '../api/user';
import jwt_decode from "jwt-decode";
import Profile from "../components/dialog/Profile"

const ForgetPass = () => {

  const [loginEmail, setLoginEmail] = useState('');

  const Navigate = useNavigate();

  const handleChangeEmail = (e) => {
    const email = e.target.value;
    setLoginEmail(email)
  }

  const clickSubmit = async () => {
    try {
      if (loginEmail == '') {
        toast.error('Fill the email.')
      }
      else {
        const formData = {
          email: loginEmail,
        }

        let res = await forgotPassword(formData)

        if (res.message != 'success') {
          toast.error(res.message)
        } else {
          toast.success('sent you the password. Please check your email inbox.')
          Navigate('/login')
        }
      }
    } catch (error) {
      toast.error(error);
    }
  }

  return (
    <>
      <div className='signup'>
        <div className='signup-container'>
          <form className='account-form-wrapper'>
            <div className='signin-title'>
              <a className='text-base' style={{ fontSize: '28px' }}>Forgot password?</a>
            </div>
            <div className='account-content'>
              <div className="input-container">
                <div className="icon">
                  <div>
                    <AttachEmailIcon />
                  </div>
                </div>
                <input className="input-field" type="email" placeholder="Email" name="email" onChange={handleChangeEmail} required />
              </div>

              <div className='cmn-btn' onClick={clickSubmit}>Send</div>
              <a style={{ color: 'white' }} href='/login'>Login</a>
            </div>
          </form>
          <div className='account-type-wrapper'>
            <div className="text-base"> Ridgewood Global Tool Suite</div>
            <div className="text-white">Welcome!</div>
          </div>
        </div>
      </div>
    </>

  )
}

export default ForgetPass
