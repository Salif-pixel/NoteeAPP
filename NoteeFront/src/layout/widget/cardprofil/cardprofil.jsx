import { PencilIcon, TrashIcon, } from '@heroicons/react/24/outline';
import {
    HiMiniSignal, HiMiniSignalSlash

} from 'react-icons/hi2';
import { motion } from "framer-motion";
import { IconButton } from '@material-tailwind/react';
import { Button, Tooltip } from 'antd';
import userprofil from "../../../assets/user.webp"
import userbackground from "../../../assets/defaultBackground.avif"
import React, { useContext } from 'react';
import {ColorthemeNotee, theme} from '../../../App';
import {ActionMenu} from "../actionMenu.jsx";

function CardProfil({ user, setOpen }) {
    const { toggle, setToggle } = useContext(theme);
    const {colortheme}=useContext(ColorthemeNotee);
    const bgConnected = user.Online === true ? "green-500" : "gray-500"
    const textColor = toggle === 'light' ? 'white' : 'menudark';
    const bgColor = toggle === 'light' ? "bg-customdark" : "bg-white";
    const bgBorder = user.role === "ADMIN" ? "red-300" : `${colortheme}-500`;

    return (
        <div
            className={`w-fit overflow-hidden  relative border-2  border-${bgConnected}  ${bgColor} mb-10  rounded-lg`}>
             
            
            <div className="rounded-lg h-32 w-80 overflow-hidden">
                <img className="object-cover object-top w-full" src={user.Background === "default" ? userbackground : user.Background} alt='Mountain' />
            </div>
            <div className={`mx-auto w-32 h-32 relative -mt-16 border-4 border-${bgConnected} rounded-full overflow-hidden`}>
                <img className="object-cover object-center " src={user.Profil === "default" ? userprofil : user.Profil} alt={user.firstName} />
            </div>
            <div className="text-center mt-2  ">
                <h2 className={`font-semibold  text-${textColor}`}>{user.firstName}</h2>
                <p className="text-gray-500 ">{user.email}</p>
                <p className="text-gray-500 ">{user.Datenaissance}</p>
            </div>
            <div className='w-full  flex justify-evenly'>


                <motion.div className="flex mb-3  w-50 flex-col">
                    <div className="w-max">
                        {
                            user.Online === true ? <div
                                    className="relative grid items-center px-2 py-1 ml-16  font-sans text-xs font-bold text-green-900 uppercase rounded-md select-none whitespace-nowrap bg-green-500/20">
                                    <span className="">en ligne</span>
                                </div> :
                                <div
                                    className="relative grid items-center px-2 py-1 ml-16  font-sans text-xs font-bold text-gray-500 uppercase rounded-md select-none whitespace-nowrap bg-gray-500/20">
                                    <span className="">hors ligne</span>
                                </div>
                        }


                    </div>


                </motion.div>


                <ActionMenu setOpen={setOpen} Open={open} email={user.email}/>
            </div>

            <div
                className={`absolute -bottom-10  -left-20 w-28 h-28 border-4 border-${bgBorder} rounded-full z--1 border-opacity-30 border-t-8`}></div>
            <div
                className={`absolute -bottom-10  -left-0 w-28 h-28 border-4 border-${bgBorder}  rounded-full z--1 border-opacity-30 border-t-8`}></div>
        </div>
    );
}

export default CardProfil;