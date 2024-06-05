import React, { useContext, useEffect, useState } from 'react';
import { Button, Layout } from "antd";
import Menulist from '../layout/widget/menulist';
import { IconButton, Tab, Tooltip } from '@material-tailwind/react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import User from './user/user-ui';
import { theme } from '../App';
import { getcurrentuser } from './user/user-service';
import { AuthContext } from '../App';
import Profil from './profil/profil-ui';
import { useAnimate } from 'framer-motion';
import { motion } from 'framer-motion';
import  {Socket, io} from 'socket.io-client';

import {
     AppstoreOutlined,

} from '@ant-design/icons';
import Notfound from './errorpage';
import useIdleTimeout from '../config/useIdleTimeout';
import { WebSocketUrl } from '../../env';
import Note from "./note/note-ui.jsx";
function Dashboard() {
    const [user, setUser] = useState(null);
    const { userInfo } = useContext(AuthContext);
    const Navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const { toggle } = useContext(theme);
    const {colortheme}=useContext(theme);
    const bgColor = toggle === 'light' ? 'bg-blue-gray-50/50' : 'bg-black';
    const backmenu = toggle === 'light' ? 'bg-white' : 'bg-black';
    const menucolor = toggle === 'light' ? 'black' : 'gray-100'
    const [scope, animate] = useAnimate();
    const [collapsed, setCollapsed] = useState(true);
    const { logout } = useContext(AuthContext);
    const createdSocket = io(WebSocketUrl);

    const { isIdle } = useIdleTimeout({
        onIdle: () => {
            logout()
          Navigate("/auth/logout");
          
        },
        
        idleTime: 100, 
      });
      const { connect} = useIdleTimeout({
        onIdle: () => {
            
            if(user!==null && user.Online===false){
                logout()
                Navigate("/auth/logout");
            }
        },
            idleTime: 0.2, 
      });
     
    const animation = async () => {
        if (collapsed) {
            setCollapsed(false);
            await Promise.all([
                animate("#tool", { x: 100 }),
               animate("#menu", { opacity:1, width: 80, x: 0 }, { duration: 0.2 }),
            ])



        }
        else {
            setCollapsed(true);
            await Promise.all([
                animate("#menu", { width: 0, x: -150 }, { duration: 0.2 })
            ]);

        }


    }
    
    useEffect(() => {
        isIdle;

        const fetchData = async (data) => {
            const fetchedUsers = await getcurrentuser(data);
            setUser(fetchedUsers);
           
            setLoading(false);
            createdSocket.on("send-user-update",(data)=>{
                if(fetchedUsers.id===data.id){
                    setUser(data);
                    console.log(user);
                }
                
            })
           
            
        };
        fetchData(userInfo);
        connect;

     

    }, []);
   

    return (
        <div ref={scope} className='w-400 overflow-x-visible relative h-calc[(vh)]'>

            {collapsed&&<Tooltip className='' content="menu">
                <AppstoreOutlined id="tool" onClick={() => animation()} className={`font-bold fixed z-50  mt-3 ml-2 p-2 ${backmenu} rounded-lg text-${menucolor}`}>appuie</AppstoreOutlined>
            </Tooltip>}
            {(!loading && user != null ) &&
                <div className={`w-full flex ${bgColor}`} >
                    <motion.div initial={{ opacity:0,x:0  }} animate={{opacity:1, x: -150 }}  id="menu">
                        <Menulist user={user} animation={animation} className="h-[calc(100vh)]  " />
                    </motion.div>
                    <div id="page" className="w-full min-h-screen">
                        <Routes  >
                            {user.role === "ADMIN" && <Route path="/user" element={<User user={user} setuser={setUser}  />} />}
                            <Route path="/profil" element={<Profil user={user} setuser={setUser} />} />
                            <Route path="/note" element={<Note user={user} setuser={setUser} />} />
                            <Route path="*" element={<Notfound/>} />
                        </Routes>
                    </div>

                </div>
            }

        </div>



    );
}

export default Dashboard;