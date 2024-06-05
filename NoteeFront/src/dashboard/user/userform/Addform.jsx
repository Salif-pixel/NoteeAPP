
import { useForm } from 'react-hook-form';
import { motion } from "framer-motion";
import { useContext, useEffect } from 'react';
import {ColorthemeNotee, theme} from '../../../App';
import { createuser } from '../user-service';
import toast from 'react-hot-toast';
import Profil from '../../profil/profil-ui';

function AddForm({ setOpen,user }) {
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
    let today = new Date();
    let formattedDate = today.getFullYear() + '-0' + (today.getMonth() + 1) + '-' + today.getDate();

    useEffect(() => {
        setValue("firstName", '');
        setValue("email", '');
        setValue("Datenaissance", formattedDate);
    });
    return (
        <motion.form initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{
            type: "spring",
            stiffness: 100,
            damping: 25,
            duration: 0.5
        }} className={` p-6 p${textColor}rounded-lg gap-4 sm:gap-0 items-center flex flex-col`}>
            <div className="flex-auto w-full">
                <label htmlFor="time" className={`mt-2 block mb-2 text-sm font-medium text-${textColor}`}>Email</label>
                <input style={{textColor:textColor}} placeholder="email" className={`mt-2 mb-2 outline-none ${bgColor} text-${textColor} border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-${colortheme}-500 focus:border-${colortheme}-500 block w-full p-2.5 `}  {...register('email', { required: true })} />
                {errors.email && <p className=' text-xs text-red-700 font-medium block'>Le'adresse mail est obligatoire</p>}
            </div>
            <div className="flex-auto w-full">
                <label htmlFor="time" className={`mt-2 block mb-2 text-sm font-medium text-${textColor}`}>Nom prenom</label>
                <input placeholder="Nom Prenom" className={`mt-2 mb-2 outline-none ${bgColor} text-${textColor} border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-${colortheme}-500 focus:border-${colortheme}-500 block w-full p-2.5 `} {...register('firstName', { required: true })} />
                {errors.firstName && <p className=' text-xs text-red-700 font-medium block'>Le prenom est obligatoire</p>}
            </div>
           
            <div className="flex-auto w-full">
                <label htmlFor="time" className={`mt-2 block mb-2 text-sm font-medium text-${textColor}`}>date naissance</label>
                <input type="date"  placeholder='date-naissance' className={` mt-2 mb-2 outline-none ${bgColor} text-${textColor} border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-${colortheme}-500 focus:border-${colortheme}-500 block w-full p-2.5 `}  {...register('Datenaissance', { required: true })} />
                {errors.Datenaissance && <p className=' mb-3 text-xs text-red-700 font-medium block'>la date de naissance est obligatoire</p>}
            </div> <div className="flex-auto w-full">
                <label htmlFor="time" className={`mt-2 block mb-2 text-sm font-medium text-${textColor}`}>mot de passe</label>
                <input type="password" placeholder="mot de passe" className={`mt-2 mb-2 outline-none ${bgColor} text-${textColor} border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-${colortheme}-500 focus:border-${colortheme}-500 block w-full p-2.5 `} {...register('password', { required: true })} />
                {errors.password && <p className=' text-xs text-red-700 font-medium block'>Le mot de passe est obligatoire</p>}
            </div>
            <button onClick={ handleSubmit(async (data) => {
                await createuser(data).then(() => {
                    setOpen({ isopen: false,type: "create", email:data.email});
                    user.push({firstName:data.firstName,email:data.email,Datenaissance:data.Datenaissance,role:"user",Profil:"default",Background:"default"});
                    
                } )
                
              
            })}  className={`mt-6 mx-auto w-1/2 text-white bg-${colortheme}-500 hover:bg-${colortheme}-600 focus:ring-4 focus:outline-none focus:ring-${colortheme}-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-${colortheme}-600 dark:hover:bg-${colortheme}-500 dark:focus:ring-${colortheme}-600`} >valider</button>
        </motion.form>

    );
}
export default AddForm;



