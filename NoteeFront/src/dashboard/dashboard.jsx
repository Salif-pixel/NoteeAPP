import React, { useContext, useEffect, useState } from 'react';
import { Button, Layout } from "antd";
import Menulist from '../layout/widget/menulist';
import { IconButton, Tab, Tooltip } from '@material-tailwind/react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import User from './user/user-ui';
import {ColorthemeNotee, theme} from '../App';
import {getcurrentuser, getuser} from './user/user-service';
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
import {CategoriesList} from "./note/service/categorie-service.jsx";
import {NotesList} from "./note/service/note-service.jsx";
import Cardanimated from "../layout/widget/cardAnimation/cardanimated.jsx";
function Dashboard() {
    const [user, setUser] = useState(null);
    const { userInfo } = useContext(AuthContext);
    const Navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const { toggle } = useContext(theme);
    const bgColor = toggle === 'dark' ? 'bg-blue-gray-50/50' : 'bg-black';
    const backmenu = toggle === 'light' ? 'bg-white' : 'bg-black';
    const menucolor = toggle === 'light' ? 'black' : 'gray-100'
    const [scope, animate] = useAnimate();
    const [collapsed, setCollapsed] = useState(true);
    const { logout } = useContext(AuthContext);
    const [listnotes, setListNotes] = useState([]);
    const [loading2, setLoading2] = useState(true);
    const [listcategories, setListCategories] = useState([]);
    const [active, setActive] = useState({id: "id", note: null });
    const [users, setUsers] = useState([]);
    const [fetched, setFetched] = useState(false);
    const [loading3, setLoading3] = useState(true);
    let sidebarold=localStorage.getItem("sidebar");
    if(sidebarold===null){sidebarold=true}
    const [sidebar, setSidebar] = useState(sidebarold==="true"?true:false);
    const createdSocket = io(WebSocketUrl);
    const textColor = toggle === 'light' ? 'text-black' : 'text-white';

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
               animate("#menu", { opacity:1, x: 0,width:'fit-content' }, { duration: 0.2 })
            ])
        }
        else {
            setCollapsed(true);
            await Promise.all([
                animate("#menu", { width: 0, x: -160 }, { duration: 0.2 })
            ]);

        }


    }
    
    useEffect(() => {
        isIdle;

        const fetchData = async (data) => {
            const fetchedUser = await getcurrentuser(data);
            setUser(fetchedUser);
            const getListCategorie=  async () =>{
                const userData = { userId: fetchedUser.id };
                const categories  = await CategoriesList(userData);
                setListCategories(categories.data);
                setLoading2(false);
            }
            const getListNotes=  async () =>{
                getListCategorie();
                const userData = { userId: fetchedUser.id };
                const notes  = await NotesList(userData);
                setListNotes(notes.data);
                if(notes.data.length>0)
                    setActive({id: notes.data[0].id, note: notes.data[0]});
                setLoading2(false);
            }
            getListNotes();
            const fetchData = async (data) => {
                const fetchedUsers = await getuser(data);
                setUsers(fetchedUsers);
                setLoading3(false);
                setFetched(true);
            };

            if (!fetched && fetchedUser.role === "ADMIN") {
                fetchData(userInfo);
            }else{
                setLoading3(false);
            }
           
            setLoading(false);
            createdSocket.on("send-user-update",(data)=>{
                if(fetchedUser.id===data.id){
                    setUser(data);

                }
                
            })
           
            
        };
        fetchData(userInfo);
        connect;

     

    }, []);


    return (
        <div ref={scope} className='w-400 overflow-x-hidden relative  h-screen'>

            {collapsed&&!loading && user != null && !loading2&&<Tooltip className='' content="menu">
                <AppstoreOutlined id="tool" onClick={() => animation()} className={`font-bold fixed z-50  mt-3 ml-2 p-2 ${backmenu} rounded-lg text-${menucolor}`}>appuie</AppstoreOutlined>
            </Tooltip>}
            {(!loading && user != null && !loading2 &&!loading3  ) ?
                <div className={`w-full h-screen flex ${bgColor}`} >
                    <motion.div  initial={{ opacity:0,x:0,width:0  }} animate={{ x: -160 }}  transition={{
                        type: "spring",
                        stiffness: 100,
                        damping: 25,
                        duration: 0.5
                    }}  id="menu">

                        <Menulist user={user} sidebar={sidebar} setSidebar={setSidebar} animation={animation} className="h-[calc(100vh)]  " />
                    </motion.div>
                    <div id="page" className="w-full min-h-screen ">
                        <Routes  >
                            {user.role === "ADMIN" && <Route path="/user" element={<User user={user} loading={loading3} setuser={setUser} Users={users} setUsers={setUsers}  />} />}
                            <Route path="/profil" element={<Profil user={user}   setuser={setUser}  />} />
                            <Route path="/note" element={<Note sidebar={sidebar} setSidebar={setSidebar} loading={loading2} user={user} setActive={setActive} active={active} listnotes={listnotes} setListNotes={setListNotes} setListCategories={setListCategories} listcategories={listcategories} setuser={setUser} />} />
                            <Route path="*" element={<Notfound/>} />
                        </Routes>
                    </div>

                </div>
                :<div className={` ${bgColor} relative  overflow-hidden  h-screen  min-w-[calc(100vw-40vw)] `}>
                    <div className={`backdrop-blur-lg  w-screen h-screen flex justify-center items-center`}>

                        <motion.div className={` w-full flex flex-col items-center justify-center `} initial={{scale: 0.75, y: -20}}>
                            <Cardanimated/>

                        </motion.div>

                    </div>
                </div>}


        </div>


    );
}

export default Dashboard;