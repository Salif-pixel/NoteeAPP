import React, { useContext, useEffect, useState } from 'react';
import {Layout, Menu, Switch } from "antd";
import { Avatar,Tooltip }  from "@material-tailwind/react";
import {
    UserOutlined, LogoutOutlined,EditOutlined
   
} from '@ant-design/icons';
import { Link, Route, Router, Routes, useLocation, useNavigate } from 'react-router-dom';
const { header, Sider } = Layout;
import {ColorthemeNotee, theme} from '../../App';
import sun from '../../assets/sun.svg';
import moon from '../../assets/moon.svg'
import userprofil from "../../assets/user.webp"
import { motion } from "framer-motion";
import {ChevronLeftIcon} from "@heroicons/react/24/solid/index.js";
function getItem(label, key, text,icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        text,
        type,
    };
}

function Menulist({ user, animation}) {
    const Navigate =useNavigate();
    const location = useLocation();
    const [select, setSelect] = useState('');
    const { toggle, setToggle } = useContext(theme);
    const {colortheme}=useContext(ColorthemeNotee);
    const logoColor = toggle === 'light' ? 'white' : 'black';
    const logoColor2 = toggle === 'light' ? 'black' : 'white';
    const logoactive = select==='0' ? `border-4 border-${logoColor2}` : '';


    useEffect(() => {
        if (location.pathname === '/dashboard/user') {
            setSelect('1');
        } else if (location.pathname === '/dashboard/note') {
            setSelect('2');
        } else if (location.pathname === '/dashboard/profil') {
            setSelect('0');
        } else {
            setSelect('11');
        }
    }, [location.pathname]);
   
    const items = [
       
        user.role==='ADMIN' ? getItem('Utilisateur', '1','/dashboard/user', <UserOutlined />):getItem('', '',''),
        getItem('note', '2','/dashboard/note', <EditOutlined/>),
        getItem('Deconnexion', '3','/auth/logout', <LogoutOutlined />),

    ];
    const handleClick = e => {
        
        const item = items.find(item => item.key === e.key);
        setSelect(e.key);
        Navigate(`${item.text}`);
      };
    return (
        <div className=' fixed z-[999]  top-0 left-0 w-0 ' >
            <motion.div id="menu" initial={{opacity:0}}
                 className={`w-fit shadow-light-${colortheme}-900  relative flex sticky justify-center  h-[calc(100vh)] left-0 bg-${logoColor}`}>
                <Tooltip className='absolute top-0 z-[50] ' content="Profil">
                    <Avatar className={`absolute top-10  ${logoactive} cursor-pointer z-[50]`} onClick={() => {
                        setSelect('0');
                        Navigate('/dashboard/profil')
                    }} src={user.Profil === " " ? userprofil : user.Profil} alt={"profil"} size="lg"/>
                </Tooltip>
                <div className={`absolute top-1 right-1`}>
                    <svg xmlns="http://www.w3.org/2000/svg"  onClick={() => animation()} className={`h-4  w-4 cursor-pointer text-${colortheme}-500   z-[999]  top-0 `} fill="none" viewBox="0 0 24 24"
                         stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                    </svg>

                </div>

                <Menu className=' mt-28 w-full '
                      selectedKeys={[select]}
                      defaultSelectedKeys={[select]}
                      defaultOpenKeys={['sub1']}
                      mode="inline"
                      inlineCollapsed={true}
                      theme={toggle}
                      items={items.filter(item => item.label != '')}
                      onClick={handleClick}
                />
                <img src={toggle === "light" ? sun : moon}
                     className={`App-logo absolute py-3 px-4  bottom-0 m-2 bg-${logoColor2} cursor-pointer shadow-lg rounded-lg`} alt="viteLogo"
                     onClick={() => {
                         setToggle(toggle === "light" ? "dark" : "light");
                         localStorage.setItem("theme", toggle === "light" ? "dark" : "light");
                     }}/>
            </motion.div>
        </div>
    );
}

export default Menulist;