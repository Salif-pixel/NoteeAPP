import {ChatBubbleBottomCenterIcon} from "@heroicons/react/24/solid/index.js";
import {Card} from "@material-tailwind/react";
import React, {useContext, useState} from "react";
import {ColorthemeNotee, theme} from "../../../../App.jsx";
import Editor from "../../../Editor/editor.jsx";
import {motion} from "framer-motion";
import {ExceptionOutlined} from "@ant-design/icons";


function NoteCard({active,setActive,note}) {
    const { toggle } = useContext(theme);
    const bgColor = toggle === 'light' ? 'white' : 'customdark';
    const TextColor = toggle === 'light' ? 'gray-500' : 'gray-300';
    const TextColor2 = toggle === 'light' ? 'black' : 'gray-300';
    const BorderColor = toggle === 'light' ? 'blue-gray-50' : 'black';
    const categorieColor = toggle === 'light' ? `${note.category.color}-900` : 'white';
    const categorieColor2 = toggle === 'light' ? '500/20' : '500';
    const {colortheme}=useContext(ColorthemeNotee);


    return(
        <motion.div initial={{scale:0.75}} className={`w-full h-full`}>
            <Card  onClick={()=>setActive({id:note.id,note:note })} className={ active.id===note.id? ` z-50 w-52 bg-${bgColor} h-40 mb-3 border border-${colortheme}-500 cursor-pointer`: ` z-50 cursor-pointer   w-52 bg-${bgColor} h-40 mb-3`}>
                <div className={`w-full flex flex-col items-center`} id={`title`}>
                    <ExceptionOutlined
                        className={`text-lg text-center  text-white mt-2 bg-${colortheme}-500 border-2 rounded-full  p-4 `}></ExceptionOutlined>
                    <h1 className={`text-${TextColor2} font-sans  text-center  mt-2`}>{note.title}</h1>
                    <motion.div initial={{width: 0 ,scale:0.7}} animate={{width: 100}} transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 25,
                        delay: 0.8,

                    }} className={`mx-auto h-1 w-24 bg-${TextColor2} rounded-lg`}></motion.div>
                </div>
                <div className={`overflow-hidden`} id={`container`}>

                </div>
                <div
                    className={` absolute flex justify-between bottom-2  items-center w-fit ml-2 px-2 py-1 font-sans text-xs font-sans text-${categorieColor}  rounded-md select-none whitespace-nowrap bg-${note.category.color}-${categorieColor2}`}>
                    <div className="flex flex-row"><ChatBubbleBottomCenterIcon className={`w-4 mr-2`}/>{note.category.name}</div>

                </div>

            </Card>

        </motion.div>
    );


}

export default NoteCard;