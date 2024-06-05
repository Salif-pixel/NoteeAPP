import React, {useContext} from 'react';
import { motion } from 'framer-motion';
import {useNavigate} from "react-router-dom";
import {ColorthemeNotee, theme} from "../../../App.jsx";

function Landing4(){
    const navigate = useNavigate();
    const { toggle,setToggle } = useContext(theme);
    const {colortheme} = useContext(ColorthemeNotee);
    const textColor = toggle === 'light' ? 'text-black' : 'text-white';
    const bgColor = toggle === 'light' ? 'bg-gray-100' : 'bg-customdark';
    const textColorD = toggle === 'light' ? 'text-black' : 'text-white';
    return (
        <motion.div id={`landing4`} initial={{y: 700}} animate={{opacity: 1, y: 0}} transition={{
            type: "spring",
            stiffness: 100,
            damping: 25,
            duration: 2
        }}
                    className="flex backdrop-blur-lg flex-auto justify-center w-screen h-screen  items-center flex-col gap-4  ">
            <motion.div initial={{x: -300}} whileInView={{x: 0}}
                        transition={{type: "spring", stiffness: 100, damping: 25, duration: 2}}
                        className={`w-52 h-52 bg-${colortheme}-500 opacity-100 rounded-full absolute top-40 right-20`}></motion.div>
            <motion.div initial={{x: 300}} whileInView={{x: 0}}
                        transition={{type: "spring", stiffness: 100, damping: 25, duration: 2}}
                        className={`w-32 h-32 bg-${colortheme}-500 opacity-100 rounded-full absolute bottom-24 left-20`}></motion.div>
            <div
                className={`flex flex-col justify-center w-screen  absolute left-0 top-0 right-0 bottom-0 backdrop-blur-lg  items-center`}>
                <div className={`flex flex-col justify-center w-screen items-center`}>
                    <p className={`flex-auto text-2xl md:text-6xl  ${textColor} text-center `}><br/>A la prochaine pour de nouvelles <span
                            className={`text-${colortheme}-500`}>notes.</span>
                    </p>
                    <p className={`flex-auto md:text-lg ${textColorD} text-center`}> Avec <span className={`text-${colortheme}-500`}>notee</span> Noter en un click !!</p>

                </div>
            </div>

        </motion.div>
    )
}
export default Landing4;