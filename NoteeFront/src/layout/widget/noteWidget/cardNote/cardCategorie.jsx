import React, {useContext} from "react";
import {ChatBubbleBottomCenterIcon, TrashIcon} from "@heroicons/react/24/solid/index.js";
import {ColorthemeNotee, theme} from "../../../../App.jsx";
import {motion} from "framer-motion";


function Categorie({activecategorie, user, setActivecategorie,categorie,setOpen2}) {   const { toggle } = useContext(theme);
    const textColorD = toggle === 'dark' ? 'white' : 'black';
    const categorieColor = toggle === 'light' ? `${categorie.color}-900` : 'white';
    const categorieColor2 = toggle === 'light' ? '500/20' : '500';
    const {colortheme}=useContext(ColorthemeNotee);

    return (
        <motion.div initial={{scale:0.85}}>
            <div className={`flex justify-between mb-2`}>

                <div onClick={() => { setActivecategorie({id:categorie.id,categorie:categorie});setOpen2({
                    id: activecategorie.id,
                    isopen: true,
                    type: "update2",
                    userid: user.id
                })}}
                    className={` bottom-2 grid items-center w-fit ml-2 px-2 py-1 font-sans text-xs font-sans text-${categorieColor}  rounded-md select-none whitespace-nowrap bg-${categorie.color}-${categorieColor2}`}>
                    <div className="flex flex-row"><ChatBubbleBottomCenterIcon
                        className={`w-4 mr-2`}/>{categorie.name}
                    </div>

                </div>


                    {categorie.notes.length < 1 ? <TrashIcon  onClick={()=>{setOpen2({isopen:true,type:"delete"});setActivecategorie({id:categorie.id,categorie:categorie})} } strokeWidth={2} className={`h-4  w-4 text-${textColorD}`}/> :
                        <div className={`bg-${colortheme}-500 flex justify-center  rounded-full w-fit px-2  h-4 `}><p
                            className={`text-xs text-white text-center`}>{categorie.notes.length}</p>
                        </div>}


            </div>
        </motion.div>
    );
}

export default Categorie;
