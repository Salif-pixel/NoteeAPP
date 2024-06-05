import {motion} from "framer-motion";
import {Button, Input} from "@material-tailwind/react";
import {MagnifyingGlassIcon} from "@heroicons/react/24/outline/index.js";
import {ChevronLeftIcon, PlusIcon} from "@heroicons/react/24/solid/index.js";
import NoteCard from "../cardnote.jsx";
import React, {useContext, useState} from "react";

import {ColorthemeNotee, theme} from "../../../../../App.jsx";
import {toast} from "react-hot-toast";


function SideNote({listcategories,active,user,setActive,loading,open,setOpen,clicknote,setClicknote,animation, listnotes,scope}) {
    const { toggle, setToggle } = useContext(theme);
    const extend = toggle === 'light' ? 'blue-gray-50' : 'bigdark';
    const TextColor = toggle === 'light' ? 'gray-500' : 'gray-300';
    const inputColor = toggle === 'light' ? 'black' : 'white';
    const colortext = toggle === 'light' ? 'black' : 'white';
    const {colortheme}=useContext(ColorthemeNotee);
    const [inputValue, setInputValue] = useState('');
    const HandleInputChange = (event) => {
        setInputValue(event.target.value);
    }

    return (
        <div ref={scope}>
            <motion.div id={'note'} initial={{width: 0}}
                        className={` w-full lg:w-[calc(100vh-45vh)] z-40 overflow-auto overflow-x-hidden fixed  bg-${extend}  lg:relative absolute left-0 h-[calc(100vh)]  ${extend}`}>
                <div className={`relative top-0 w-full flex justify-end`}>

                        <ChevronLeftIcon   onClick={()=>{clicknote?setClicknote(false):setClicknote(true); animation()}} strokeWidth={2} className={`h-4  w-4 cursor-pointer hover:text-${colortheme}-500 text-${colortext} absolute top-2 right-4 `} />

                </div>

                <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 25,

                }} className="  w-auto mr-4 ml-4 mt-12  ">
                    <Input
                        onChange={HandleInputChange}
                        color={`${inputColor}`}
                        label="Chercher"
                        icon={<MagnifyingGlassIcon className="h-5 w-5 "/>}
                    />
                </motion.div>
                <motion.div className={`h-full mt-10 flex flex-col w-full `}>
                    <div  className={` ml-5 mr-2  h-fit  `}>
                        <div id={`title`} className={`flex justify-between`}>
                            <h5 className={` font-sans text-${TextColor} text-xs`}>MES NOTES</h5>
                            <PlusIcon onClick={() => {
                                if(listcategories.length>0){
                                    setOpen({
                                    isopen: true,
                                    type: "create",
                                    userid: user.id,
                                    categorielist: listcategories
                                    })
                                }else {
                                    toast.error("Veuillez créer une catégorie avant de créer une note")
                                }
                                }} className={`w-5 cursor-pointer text-${TextColor} h-fit`}/>
                        </div>

                        <motion.div initial={{scale: 1}} id={`container`}
                                    className={` h-full    grid  grid-cols-1    lg:overflow-auto`}>
                            {!loading && listnotes
                                .filter(element => element.title.toLowerCase().includes(inputValue.toLowerCase())
                                    || element.category.name.toLowerCase().includes(inputValue.toLowerCase()))
                                .map((note, index) => (
                                    <NoteCard key={index} note={note} active={active} setActive={setActive}/>
                                ))}
                        </motion.div>

                    </div>


                </motion.div>
            </motion.div>

        </div>

    );
}

export default SideNote;
