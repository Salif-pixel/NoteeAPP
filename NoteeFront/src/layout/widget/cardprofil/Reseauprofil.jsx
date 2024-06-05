;
import React, { useContext, useState } from 'react';
import { motion, useAnimate } from 'framer-motion';
import {
    AliwangwangOutlined,FacebookOutlined,InstagramOutlined,LinkedinOutlined,MailTwoTone,PhoneOutlined,WhatsAppOutlined

} from '@ant-design/icons';
import {ColorthemeNotee, theme} from '../../../App';
function Reseauprofil() {
    const { toggle, setToggle } = useContext(theme);
    const {colortheme}=useContext(ColorthemeNotee);
    const bgColor = toggle === 'dark' ? 'white' : 'customdark';
    const textColor = toggle === 'dark' ? 'black' : 'white';
const [scope, animate] = useAnimate();
const [hovered ,setHovered]=useState(true)
const animation = async () => {
    if(hovered){
    await Promise.all([
   
       animate("#scale",{scale:1},),
      
        
    ])}else if(!hovered){
        await Promise.all([
            
            animate("#scale",{scale:0},{duration:0.1}),
            
            
        ])
    
    }
    hovered === true ? setHovered(false) : setHovered(true);
}
    return (

        <motion.div ref={scope} 
            className={`group relative mb-10  rounded-lg  cursor-pointer hover:bg-${colortheme}-500 overflow-hidden bg-${bgColor} px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 mr-5 ml-5 `}>
            <motion.div id="scale" initial={{scale:0}} className='absolute  rounded-lg left-0 right-0 bottom-0 top-0 bg-blue-500'></motion.div>
           
            
            <div className="relative z-10 mx-auto max-w-md">
            <div id='title' className='text-center mt-5 z-50'>
                <AliwangwangOutlined className={`text-4xl  text-white bg-${colortheme}-500 border-2 rounded-full  p-4 `} ></AliwangwangOutlined>
                <p className={`font-bold  text-${textColor} font-mono text-xl`}>Mes reseaux</p>
            </div>
            <motion.div initial={{ width:0 }} animate={{ width:100 }} transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 25,
                            delay: 0.8,

                        }} className={`mx-auto h-1 w-24 bg-${textColor} rounded-lg`}></motion.div>
                <div id='text'
                    className={`w-full mt-10 flex justify-center    text-${textColor}`}>
                    <WhatsAppOutlined onClick={()=>window.open('https://web.whatsapp.com', '_blank') } className='text-4xl ml-2 w-10  h-10 text-white bg-green-500 border-2 rounded-full  p-2 ' ></WhatsAppOutlined>
                    <MailTwoTone onClick={()=>window.open('https://mail.google.com/mail/u/0/#inbox', '_blank') } className='text-4xl ml-2 w-10  h-10 text-white bg-white border-2 rounded-full  p-2 ' ></MailTwoTone>
                    <InstagramOutlined onClick={()=>window.open('https://www.instagram.com/', '_blank') } className='text-4xl ml-2 w-10  h-10 text-white bg-gradient-to-tr from-red-800 to-blue-700 border-2 rounded-full  p-2 ' ></InstagramOutlined>
                    <LinkedinOutlined  onClick={()=>window.open('https://www.linkedin.com/feed/?trk=guest_homepage-basic_google-one-tap-submit', '_blank') }  className={`text-4xl ml-2 w-10  h-10 text-white bg-${colortheme}-500 border-2 rounded-full  p-2 `}></LinkedinOutlined>
                </div>
               
            </div>
        </motion.div>


    );
}

export default Reseauprofil;