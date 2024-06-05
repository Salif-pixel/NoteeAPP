import React, {useContext, useEffect, useState} from 'react';
import {ColorthemeNotee, theme} from '../../../App.jsx'; // Assurez-vous que le nom d'export de votre contexte est correct
import { motion } from 'framer-motion';
import {ChevronLeftIcon} from "@heroicons/react/16/solid/index.js";
import {Dialog, DialogHeader, Typography} from "@material-tailwind/react";
import Addform from "../../../dashboard/note/noteform/Note/Addform.jsx";
import Updateform from "../../../dashboard/note/noteform/Note/Updateform.jsx";
import Deleteform from "../../../dashboard/note/noteform/Note/Deleteform.jsx";
import {Deletenote} from "../../../dashboard/note/service/note-service.jsx";

export function GridItem({animationtheme,opentheme,setopentheme}) {
    const { toggle } = useContext(theme);
    const {setColortheme,colortheme}=useContext(ColorthemeNotee);
    const bgColor = toggle === 'light' ? 'bg-white' : 'bg-customdark';
    const textColor = toggle === 'light' ? 'text-black' : 'text-white';
    const borderColor = toggle === 'light' ? 'border-gray-300' : 'border-customdark';
    const colortext = toggle === 'light' ? 'black' : 'white';
    const [open, setOpen] = React.useState({color:colortheme,type:false});

    const handleOpen = () => setOpen({color:open.color,type:false});

    return (
        <motion.div initial={{scale:0}} id={`griditem`} className={` w-full py-24 px-4 lg:px-16`}>
            <ChevronLeftIcon onClick={() => {
                opentheme ? setopentheme(false) : setopentheme(true);
                animationtheme();
            }} strokeWidth={2}
                             className={`h-4  w-4 cursor-pointer hover:text-${colortheme}-500 text-${colortext} absolute top-2 right-4 `}/>

            <div className="container  px-[12px] md:px-24 xl:px-12 max-w-[1300px] nanum2">
                <h1 className={`text-3xl mb-2 ${textColor}`}>Themes</h1>
                <p className={` mb-4 ${textColor}`}> choisissez votre theme</p>
                <div className="grid  w-full grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-28 lg:gap-y-16">
                    {industries.map((industry, index) => (

                        <div key={index} onClick={()=>{setOpen({color:industry.color,type:true});

                            }} className={`relative cursor-pointer hover:bg-${industry.color}-500  group h-20 flex flex-row items-center rounded-full border-2 ${borderColor} bg-clip-border text-gray-700 `}>
                            <motion.div className={`flex flex-row justify-start  w-full`}>
                                <div className={`ml-4 mr-10 h-10 w-10 rounded-full shadow-lg bg-${industry.color}-500`}></div>
                                <p className={` mt-2 ${textColor}`}>{industry.title}</p>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
            <Dialog className={` ${bgColor} rounded-lg`} size={'xs'} open={open.type} handler={handleOpen}>
                <DialogHeader className="flex flex-col items-center">
                    {" "}
                    <Typography className={`mb-1 text-center ${textColor}`} variant="h4">
                        changer de theme
                    </Typography>
                </DialogHeader>
                <div className={`w-full flex justify-center`}>
                    <button onClick={(e) => {
                        e.preventDefault();
                        setOpen({color:open.color,type:false})
                    }}
                            className={`mt-4 mb-2 outline-none mx-auto border border-${borderColor} text-${textColor} bg-transparent hover:bg-transparent  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center  dark:hover:bg-transparent `}>retour
                    </button>
                    <button onClick={()=>{setColortheme(open.color);setOpen({color:open.color,type:false});localStorage.setItem("colortheme", open.color);}}
                        className={`mt-4 mx-auto  mb-2 text-white bg-${colortheme}-500 hover:bg-${colortheme}-600 focus:ring-4 focus:outline-none focus:ring-${colortheme}-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-${colortheme}-500 dark:hover:bg-${colortheme}-600 dark:focus:ring-${colortheme}-600`}>valider
                    </button>
                </div>
            </Dialog>

        </motion.div>
    );
}

const industries = [
    {
        color: "blue",
        alt: "bleue",
        title: "Bleue"
    },
    {
        color: "green",
        alt: "vert",
        title: "Vert"
    },
    {
        color: "red",
        alt: "rouge",
        title: "Rouge"
    },
    {
        color: "yellow",
        alt: "jaune",
        title: "Jaune"
    },
    {
        color: "purple",
        alt: "violet",
        title: "Violet"
    },
    {
        color: "orange",
        alt: "orange",
        title: "Orange"
    },
    {
        color: "pink",
        alt: "rose",
        title: "Rose"
    },
    {
        color: "brown",
        alt: "marron",
        title: "Marron"
    },

];
