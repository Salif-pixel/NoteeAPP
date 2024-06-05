import { createContext, useContext, useEffect, useState } from 'react'


import {  Route, Routes, useNavigate } from 'react-router-dom'
import Login from './auth/auth-ui/login'
import { Toaster } from 'react-hot-toast'
import axios from 'axios'
import PrivateRoute from './config/privateRoute'
import Dashboard from './dashboard/dashboard'
import './tailwindcodexeditor.css';
import { desconnect } from './auth/auth-service/login-service'
import Register from './auth/auth-ui/register'
import ForgotPassword from './auth/auth-ui/forgot-password'
import ResetPassword from './auth/auth-ui/reset-password'
import LandingLayout from "./dashboard/landing/landing.jsx";
export const AuthContext = createContext(null);
export const theme = createContext(null);
export const ColorthemeNotee = createContext(null);

function App() {
  const Navigate = useNavigate();
  const old = localStorage.getItem("auth");
  const oldTheme = localStorage.getItem("theme");
  const [toggle, setToggle] = useState(oldTheme === "dark" ? oldTheme : "light");
  let colorthemeold=localStorage.getItem("colortheme");
  if(colorthemeold===null){colorthemeold="blue"}
  const [colortheme, setColortheme] = useState(colorthemeold);

  const [userInfo, setUserInfo] = useState(old ? JSON.parse(old) : { isAuthenticated: false, token: null, email: null });
  
  useEffect(() => {
    
    if (userInfo.isAuthenticated) axios.defaults.headers.common['Authorization'] = `Bearer ${userInfo.token.access_token}`;
  }, []);
  const logout = async () => {
    try {
     
      await desconnect(userInfo);
      localStorage.removeItem('auth');
      localStorage.removeItem("login");
      setUserInfo({ isAuthenticated: false, token: null, email: null });
      Navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
      <ColorthemeNotee.Provider value={{ colortheme, setColortheme }}>
        <theme.Provider value={{ toggle, setToggle }}>
          <AuthContext.Provider value={{ userInfo, setUserInfo,logout }}>
            <Routes>
              <Route path="/" element={<LandingLayout />} />
              <Route path="/auth/login" element={<Login />} />
              <Route path="/dashboard/*" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path="*" element={<Navigate to="/" replace />} />
              <Route path="/auth/logout" element={<Logout />} /><Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
           </Routes>
           <Toaster position='top-right' />
          </AuthContext.Provider >
        </theme.Provider>
      </ColorthemeNotee.Provider>


  )
}
const Logout = () => {
  const { logout } = useContext(AuthContext);
  useEffect(() => {
    logout()
  }, []);
  return (<></>);
}

export default App
