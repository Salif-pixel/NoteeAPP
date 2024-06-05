import { useNavigate } from "react-router-dom";
import {useEffect} from "react";
import { useContext } from "react";
import { AuthContext } from "../App";


const PrivateRoute = ({ children }) => {
 const navigate = useNavigate();
 const {userInfo} =  useContext(AuthContext);
 useEffect(() =>{
     if(!userInfo.isAuthenticated) {
         navigate("/");
     }
 })

 return userInfo.isAuthenticated ? children : null;
};

export default PrivateRoute;
