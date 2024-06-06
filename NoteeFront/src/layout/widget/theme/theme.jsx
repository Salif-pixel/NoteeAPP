import React, {useContext} from 'react';
import { motion } from 'framer-motion';
import {theme} from "../../../App.jsx";
import {GridItem} from "./gridcolortheme.jsx";
import {ChevronLeftIcon} from "@heroicons/react/16/solid/index.js";
 export function CustomTheme({animationtheme,opentheme,setopentheme}) {
    const {toggle}=useContext(theme);
    const bgColor = toggle === 'light' ? 'bg-white' : 'bg-bigdark';

    return (
        <motion.div initial={{width:0}} id={`theme`} className={`${bgColor} flex overflow-auto w-full `}>

            <GridItem animationtheme={animationtheme} opentheme={opentheme} setopentheme={setopentheme} className={`w-full`} id={`griditem`}/>
        </motion.div>
    )
}
