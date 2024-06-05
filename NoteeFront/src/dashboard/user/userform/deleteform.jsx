
import { useForm } from 'react-hook-form';
import { motion } from "framer-motion";
import { useContext, useEffect } from 'react';
import {ColorthemeNotee, theme} from '../../../App';
import { deleteuser } from '../user-service';
import toast from 'react-hot-toast';

function DeleteForm({ setOpen, open, setuser, user,users }) {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    const { toggle } = useContext(theme);
    const { colortheme } = useContext(ColorthemeNotee);
    const bgColor = toggle === 'light' ? 'bg-blue-gray-50' : 'bg-customdark';
    const textColor = toggle === 'light' ? 'gray-900' : 'white';
    const borderColor = toggle === 'light' ? 'black' : 'white';
    let today = new Date();
    let formattedDate = today.getFullYear() + '-0' + (today.getMonth() + 1) + '-' + today.getDate();

    useEffect(() => {

        setValue("firstName", user[0].firstName);
        setValue("email", user[0].email);
        var elementsDate = user[0].Datenaissance.split("/");
        var dateConvertie = elementsDate[2] + "-" + elementsDate[1] + "-" + elementsDate[0];
        setValue("Datenaissance", dateConvertie);
    });

    return (
        <motion.form initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{
            type: "spring",
            stiffness: 100,
            damping: 25,
            duration: 0.5
        }} className={` p-6 p${textColor}rounded-lg gap-4 sm:gap-0 items-center flex flex-row justify-between`}>

            <button onClick={(e)=>{e.preventDefault(); setOpen({ isopen: false,type: "create", email:user.email})}} className={`mt-6 outline-none mx-auto border border-${borderColor} text-${textColor} bg-transparent hover:bg-transparent  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center  dark:hover:bg-transparent `}  >retour</button>
            <button onClick={handleSubmit(async (data) => {
                await deleteuser(data).then(() => {
                    setOpen({ isopen: false,type: "create", email:data.email});
                    setuser(users.slice().filter((user) => user.email !== data.email));
                    
                    
                })
            })}  className={`mt-6 mx-auto w-1/2 text-white bg-${colortheme}-500 hover:bg-${colortheme}-600 focus:ring-4 focus:outline-none focus:ring-${colortheme}-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-${colortheme}-600 dark:hover:bg-${colortheme}-500 dark:focus:ring-${colortheme}-600`} >valider</button>
        </motion.form>

    );
}
export default DeleteForm;



