;
import React, { useContext, useState } from 'react';
import { motion, useAnimate } from 'framer-motion';
import {
    CalendarOutlined

} from '@ant-design/icons';
import {ColorthemeNotee, theme} from '../../../App';
import BasicDateCalendar from './calendar';
function Calendarprofil() {
    const { toggle, setToggle } = useContext(theme);
    const bgColor = toggle === 'dark' ? 'white' : 'customdark';
    const textColor = toggle === 'dark' ? 'black' : 'white';
    const [scope, animate] = useAnimate();
    const {colortheme}=useContext(ColorthemeNotee);
    const [hovered, setHovered] = useState(true)
    const animation = async () => {
        if (hovered) {
            await Promise.all([

                animate("#scale", { scale: 1 },),


            ])
        } else if (!hovered) {
            await Promise.all([

                animate("#scale", { scale: 0 }, { duration: 0.1 }),


            ])

        }
        hovered === true ? setHovered(false) : setHovered(true);
    }
    return (

        <motion.div ref={scope}
            className={`group relative mb-10 cursor-pointer overflow-hidden hover:bg-${colortheme}-500 bg-${bgColor} px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 w-full  mr-5 ml-5  rounded-lg`}>
            <motion.div id="scale" initial={{ scale: 0 }} className='absolute  rounded-lg left-0 right-0 bottom-0 top-0 bg-blue-500'></motion.div>


            <div className=" z-10 mx-auto max-w-md ">
                <div id='title' className='text-center mt-5 z-50'>
                    <CalendarOutlined className={`text-4xl  text-white bg-${colortheme}-500 border-2 rounded-full  p-4 `}></CalendarOutlined>
                    <p className={`font-bold  text-${textColor} font-mono text-xl`}>Calendrier</p>
                    <motion.div initial={{ width: 0 }} animate={{ width: 100 }} transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 25,
                    delay: 0.8,

                }} className={`mx-auto h-1 w-24 bg-${textColor}  rounded-lg`}></motion.div>
                </div>
                <div className='w-full  flex justify-center'>
                    <BasicDateCalendar />
                </div>
              
               
            </div>
        </motion.div>


    );
}

export default Calendarprofil;
