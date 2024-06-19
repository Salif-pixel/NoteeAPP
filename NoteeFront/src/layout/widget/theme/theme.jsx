import React, {useContext} from 'react';
import { motion } from 'framer-motion';
import {ColorthemeNotee, theme} from "../../../App.jsx";
import {GridItem} from "./gridcolortheme.jsx";
import {ChevronLeftIcon} from "@heroicons/react/16/solid/index.js";
 export function CustomTheme({animationtheme,sidebar,setSidebar,opentheme,setopentheme}) {
    const {toggle}=useContext(theme);
     const {colortheme}=useContext(ColorthemeNotee);
    const bgColor = toggle === 'light' ? 'bg-white' : 'bg-bigdark';
     const colortext = toggle === 'light' ? 'black' : 'white';


    return (
        <motion.div initial={{opacity:0,x:500,width:0}} id={`theme`} className={`${bgColor} flex justify-center w-full `}>
            <ChevronLeftIcon onClick={() => {
                opentheme ? setopentheme(false) : setopentheme(true);
                animationtheme();
            }} strokeWidth={2}
                             className={`h-6  w-6 cursor-pointer hover:text-${colortheme}-500 text-${colortext} absolute top-2 right-4 `}/>
            <GridItem animationtheme={animationtheme} opentheme={opentheme} sidebar={sidebar} setSidebar={setSidebar} setopentheme={setopentheme} className={`w-full`} id={`griditem`}/>
        </motion.div>
    )
}
