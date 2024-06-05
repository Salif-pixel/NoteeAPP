import {useForm} from 'react-hook-form';
import {motion} from "framer-motion";
import {useContext, useEffect} from 'react';
import {ColorthemeNotee, theme} from '../../../../App.jsx';
import {createnote, Deletenote, Updatenote} from "../../service/note-service.jsx";
import {deleteuser} from "../../../user/user-service.jsx";
import {Deletecategorie} from "../../service/categorie-service.jsx";

;

function Deleteformcategorie({activecategorie,setActivecategorie, setCategoriesList,SetListNotes,setOpen2}) {


    const {toggle} = useContext(theme);
    const {colortheme}=useContext(ColorthemeNotee);
    const borderColor = toggle === 'light' ? 'black' : 'white';
    const textColor = toggle === 'light' ? 'gray-900' : 'white';



    return (
        <motion.form initial={{opacity: 0}} whileInView={{opacity: 1}} transition={{
            type: "spring",
            stiffness: 100,
            damping: 25,
            duration: 0.5
        }} className={` p-6 p${textColor}rounded-lg gap-4 sm:gap-0 items-center flex flex-row justify-between`}>

            <button onClick={(e) => {
                e.preventDefault();
                setOpen2({isopen: false})
            }}
                    className={`mt-6 outline-none mx-auto border border-${borderColor} text-${textColor} bg-transparent hover:bg-transparent  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center  dark:hover:bg-transparent `}>retour
            </button>
            <button onClick={async(e)=>{{
                e.preventDefault();
                await Deletecategorie(activecategorie.id).then((res) => {
                    setCategoriesList(res.data.listcategory);
                    SetListNotes(res.data.listnotes);
                    setOpen2({
                        isopen: false,
                    });


                })


            }}}
                    className={`mt-6 mx-auto w-1/2 text-white bg-${colortheme}-500 hover:bg-${colortheme}-600 focus:ring-4 focus:outline-none focus:ring-${colortheme}-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-${colortheme}-600 dark:hover:bg-${colortheme}-500 dark:focus:ring-${colortheme}-600`} >valider</button>
        </motion.form>


    );
}

export default Deleteformcategorie;


