;
import React, { useContext, useState } from 'react';
import { AnimatePresence, motion, useAnimate } from 'framer-motion';
import {
    ExceptionOutlined

} from '@ant-design/icons';
import {ColorthemeNotee, theme} from '../../../App';
import { Dialog, DialogHeader } from '@material-tailwind/react';
import { Typography } from 'antd';
function Aboutprofil({user}) {
    const [open,setOpen]=useState(false);
    const handleOpen = () => {
        setOpen(open => !open);
     
    };
    
    const { toggle, setToggle } = useContext(theme);
    const bgColor = toggle === 'dark' ? 'white' : 'customdark';
    const textColor = toggle === 'dark' ? 'black' : 'white';
    const bgModal = toggle === 'dark' ? 'bg-blue-gray-50' : 'bg-customdark';
    const [scope, animate] = useAnimate();
    const [hovered, setHovered] = useState(true)
    const {colortheme}=useContext(ColorthemeNotee);
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

        <motion.div onClick={()=>handleOpen()} ref={scope}
            className={`group relative mb-10  rounded-lg  cursor-pointer hover:bg-${colortheme}-500 overflow-hidden bg-${bgColor} px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 mr-5 ml-5 `}>
            
            <motion.div id="scale" initial={{ scale: 0 }} className={`absolute  rounded-lg left-0 right-0 bottom-0 top-0 bg-${colortheme}-500`}></motion.div>


            <div className=" z-10 mx-auto max-w-md">
                <div id='title' className='text-center  mt-5 z-50'>
                    <ExceptionOutlined className={`text-4xl  text-white bg-${colortheme}-500 border-2 rounded-full  p-4 `} ></ExceptionOutlined>
                    <p className={`font-bold  text-${textColor} font-mono text-xl`}>À propos</p>
                </div>
                <motion.div initial={{ width: 0 }} animate={{ width: 100 }} transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 25,
                    delay: 0.8,

                }} className={`mx-auto h-1 w-24 bg-${textColor} rounded-lg`}></motion.div>
                <motion.div className={`space-y-6 pt-5  leading-7 text-gray-600 transition-all duration-300  text-${textColor}`} >
                    <p>
                    {user.propos.split(' ').slice(0, 20).join(' ')}
                    </p>
                </motion.div>
                <div className="pt-5  bottom-0 text-base font-semibold leading-7">
                   
                        <div   href="#" className={`text-sky-500 transition-all duration-300 text-${textColor} `}>Voir plus
                            &rarr;
                        </div>
                    
                </div>
            </div>
            <Dialog className={`${bgModal} overflow-auto rounded-lg h-[calc(100vh-40vh)] `} size={'xl'} open={open}>
                        <DialogHeader className="flex flex-col items-center">
                            {" "}
                            <div id='title' className='text-center  mt-5 z-50'>
                    <ExceptionOutlined className={`text-4xl  text-white bg-${colortheme}-500 border-2 rounded-full  p-4 `} ></ExceptionOutlined>
                    <p className={`font-bold  text-${textColor} font-mono text-xl`}>À propos</p>
                </div>
                        </DialogHeader>
                        <div className=" z-10 mx-auto ">
                
                <motion.div initial={{ width: 0 }} animate={{ width: 100 }} transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 25,
                    delay: 0.8,

                }} className={`mx-auto w-full  h-1  bg-${textColor} rounded-lg`}></motion.div>
                
                    <p className={`relative left-0 pt-5 p-10  w-full  leading-7 text-gray-600 transition-all duration-300  text-${textColor}`} >
                        {user.propos}
                    </p>
                
               
            </div>
                    </Dialog>
        </motion.div>


    );
}

export default Aboutprofil;