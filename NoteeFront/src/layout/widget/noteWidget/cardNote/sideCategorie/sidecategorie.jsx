import {motion} from "framer-motion";
import {Input} from "@material-tailwind/react";
import {MagnifyingGlassIcon} from "@heroicons/react/24/outline/index.js";
import {PlusIcon} from "@heroicons/react/24/solid/index.js";
import React, {useContext, useState} from "react";


import Categorie from "../cardCategorie.jsx";
import {ColorthemeNotee, theme} from "../../../../../App.jsx";
import {ChevronRightIcon} from "@heroicons/react/16/solid/index.js";


function SideCategorie({scope,activecategorie, setActivecategorie,user,loading,clickcategorie,animaty,setClickcategorie, listnotes, listcategories,setOpen2}) {
    const { toggle, setToggle } = useContext(theme);
    const extend = toggle === 'light' ? 'blue-gray-50' : 'bigdark';
    const TextColor = toggle === 'light' ? 'gray-500' : 'gray-300';
    const inputColor = toggle === 'light' ? 'black' : 'white';
    const TextColor2 = toggle === 'light' ? 'black' : 'gray-300';
    const colortext = toggle === 'light' ? 'black' : 'white';
    const [inputValue2, setInputValue2] = useState('');
    const HandleInputChange2 = (event) => {
        setInputValue2(event.target.value);
    }
    const {colortheme}=useContext(ColorthemeNotee);
    return (
        <div ref={scope}>
            <motion.div id={"categorie"} initial={{width: 0}}
                        className={` w-full lg:w-[calc(100vh-45vh)] z-40 overflow-auto overflow-x-hidden fixed  bg-${extend}  lg:relative absolute right-0 h-[calc(100vh)]  ${extend}`}>
                <div className={`relative top-0 w-full flex justify-start`}>
                    <ChevronRightIcon onClick={() => {
                        clickcategorie ? setClickcategorie(false) : setClickcategorie(true);
                        animaty()
                    }} strokeWidth={2}
                                      className={`h-4  w-4 cursor-pointer hover:text-${colortheme}-500 text-${colortext} absolute top-2 right-4 `}/>
                </div>
                    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{
                        type: "spring",
                        stiffness: 100,
                        damping: 25,

                    }} className=" md:w-auto mr-4 ml-4 mt-12  mr-4 ">
                        <Input
                            onChange={HandleInputChange2}
                            color={`${inputColor}`}
                            label="Chercher"
                            icon={<MagnifyingGlassIcon className="h-5 w-5 "/>}
                        />
                    </motion.div>
                    <motion.div className={`h-fit mt-10 flex flex-col w-full `}>

                        <motion.div className={`  bottom-0 h-fit`}>
                            <div className={` ml-6 mr-6  `}>
                                <div id={`title`} className={`flex justify-between`}>
                                    <h5 className={` font-sans text-${TextColor} text-xs`}>CATEGORIES</h5>
                                    <PlusIcon onClick={() => setOpen2({

                                        isopen: true,
                                        type: "create2",
                                        userid: user.id,
                                        categorielist: listcategories
                                    })}
                                              className={`w-5 cursor-pointer text-${TextColor} h-fit`}/>
                                </div>

                                <div id={`container`}
                                     className={`  mt-4  text-${TextColor2} font-sans hover:cursor-pointer h-24 `}>

                                    {!loading && listcategories.filter(element => element.name.toLowerCase().includes(inputValue2.toLowerCase())).map((categorie, index) => (
                                        <Categorie  user={user} setOpen2={setOpen2} activecategorie={activecategorie} setActivecategorie={setActivecategorie}   key={index} categorie={categorie}/>
                                    ))}

                                </div>
                            </div>

                        </motion.div>
                    </motion.div>
            </motion.div>
        </div>


);
}

export default SideCategorie;


