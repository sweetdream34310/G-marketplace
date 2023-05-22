import React, { useState, useEffect } from 'react';
import '../style/signup.css';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import GoogleIcon from '@mui/icons-material/Google';
import { login } from '../api/user';
import jwt_decode from "jwt-decode";
import Profile from "../components/dialog/Profile"

const SignIn = () => {

  const [account, setAccount] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const Navigate = useNavigate();

  // const { login, isLoggedIn } = useAuth();

  const handleChangeEmail = (e) => {
    const email = e.target.value;
    setLoginEmail(email)
  }

  const handleChangePass = (e) => {
    const pass = e.target.value;
    setLoginPassword(pass)
  }

  const clickSubmit = async () => {
    try {
      if (loginEmail == '' || loginPassword == '') {
        toast.error('fill the all blanks.')
      }
      else {
        const formData = {
          email: loginEmail,
          password: loginPassword
        }

        let res = await login(formData)

        if (res.message != 'Succesfully logged-in') {
          toast.error(res.message)
        } else {
          localStorage.setItem("token", res.token)
          localStorage.setItem("permissions", res.permissions);
          setToken(localStorage.getItem("token"))
          Navigate('/dashboard')

        }
      }
    } catch (error) {
      toast.error(error);
    }
  }

  const isLoginSuccess = () => {
    try {
      const tokenDecode = jwt_decode(localStorage.getItem("token"))
      if (!tokenDecode) {
        Navigate('/login')
      } else {
        // setIsOpen(true)
        Navigate('/dashboard')
      }
    } catch (error) {
      toast.error('Invalid Token')
      Navigate('/login')
    }
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  useEffect(() => {
    if (token) {
      isLoginSuccess();
    }
  }, [token])

  return (
    <>
      <Profile isOpen={isOpen} handleClose={handleClose} />
      <div className='signup'>
        <div className='signup-container'>
          <form className='account-form-wrapper'>
            <div className='signin-title'>
              <div className='account-logo'></div>
              <a className='font'>Ridgewood Suite</a>
            </div>
            <div className='account-content'>
              <div className="wallet-button">
                <div className="wallet-icon">
                  <GoogleIcon />
                </div>
                <div className='wallet-text' >Google Login</div>
              </div>
              <div className="input-container">
                <div className="icon">
                  <div>
                    <AttachEmailIcon />
                  </div>
                </div>
                <input className="input-field" type="email" placeholder="Email" name="email" onChange={handleChangeEmail} required />
              </div>
              <div className="input-container">
                <div className="icon">
                  <div>
                    <VpnKeyIcon />
                  </div>
                </div>
                <input className="input-field" type="password" placeholder="Password" name="password" onChange={handleChangePass} required />
              </div>
              <div className='cmn-btn' onClick={clickSubmit}>Sign In</div>
              <a style={{ color: 'white' }} href='/forgotpassword'>Forgot password</a>
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

export default SignIn
