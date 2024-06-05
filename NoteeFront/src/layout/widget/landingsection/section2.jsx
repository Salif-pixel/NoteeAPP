import React, {useContext} from 'react';
import { motion } from 'framer-motion';
import {useNavigate} from "react-router-dom";
import {ColorthemeNotee, theme} from "../../../App.jsx";
import pc from "../../../assets/pc.svg";
import typing from "../../../assets/typing.svg";
import typingprofil from "../../../assets/typing-profil.svg";

function Landing2(){
    const navigate = useNavigate();
    const { toggle,setToggle } = useContext(theme);
    const {colortheme} = useContext(ColorthemeNotee);
    const textColor = toggle === 'light' ? 'text-black' : 'text-white';
    const bgColor = toggle === 'light' ? 'bg-gray-100' : 'bg-customdark';
    const textColorD = toggle === 'light' ? 'text-black' : 'text-white';
    return (
        <motion.div id={`landing2`} initial={{y: 0, scale: 0.8}} transition={{
            type: "spring",
            stiffness: 100,
            damping: 25,
            duration: 2
        }}
                    className="flex backdrop-blur-lg flex-auto justify-center w-screen h-screen  items-center flex-col gap-4  ">
            <motion.div initial={{x: -300}} whileInView={{x: 0}}
                        transition={{type: "spring", stiffness: 100, damping: 25, duration: 2}}
                        className={`w-32 h-32 bg-${colortheme}-500 opacity-100 rounded-full absolute bottom-24 right-20`}></motion.div>
            <motion.div initial={{x: 300}} whileInView={{x: 0}}
                        transition={{type: "spring", stiffness: 100, damping: 25, duration: 2}}
                        className={`w-32 h-32 bg-${colortheme}-500 opacity-100 rounded-full absolute top-24 left-20`}></motion.div>
            <div
                className={`flex h-screen w-screen   backdrop-blur-lg   items-start`}>


                <div className={`flex flex-col   w-screen items-center md:mt-16`}>
                    <p className={`flex-auto text-6xl  ${textColor} text-center `}>Bienvenue sur
                        <span
                            className={`text-${colortheme}-500`}> notee</span>
                    </p>
                    <img src={pc} className={`w-[calc(100vh-48vh)] h-[calc(100vh-58vh)] rounded-full`}/>
                    <motion.div initial={{width: 0}} whileInView={{width: 800}} transition={{delay: 0.3}}
                                className={`bg-${colortheme}-700 h-2 rounded-lg mb-4`}></motion.div>
                    <div className={`flex flex-row w-full justify-center `}>
                        <motion.div initial={{opacity: 0, y: 100}} whileInView={{y: 0, opacity: 1}}
                                    transition={{type: "spring", stiffness: 100, damping: 25, duration: 2}}
                                    className={`ml-10 mr-36`}>
                            <motion.div style={{backgroundImage: `url(${typing})`, backgroundSize: 'cover'}}

                                        className={`w-28 h-28  border-2 border-${colortheme}-500   opacity-100 rounded-full mr-10 `}></motion.div>
                            <p className={`flex-auto w-32   ${textColor} text-center `}>Prenez encore plus de
                                plaisir à
                                <span
                                    className={`text-${colortheme}-500`}> noter</span>
                            </p>
                        </motion.div>
                        <motion.div initial={{opacity: 0, y: 100}} whileInView={{y: 0, opacity: 1}}
                                    transition={{type: "spring", stiffness: 100, damping: 25, duration: 2}}>
                            <motion.div
                                style={{backgroundImage: `url(${typingprofil})`, backgroundSize: 'cover'}}

                                className={`w-28 h-28  border-2 border-${colortheme}-500   opacity-100 rounded-full mr-10 `}></motion.div>
                            <p className={`flex-auto w-32   ${textColor} text-center `}>mettez vos plus belles
                                photos en

                                <span
                                    className={`text-${colortheme}-500`}> profil</span>
                            </p>
                        </motion.div>


                    </div>

                </div>
            </div>

        </motion.div>

    )
}

export default Landing2;