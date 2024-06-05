
import { set, useForm } from 'react-hook-form';
import { motion } from "framer-motion";
import { useContext, useEffect,useState } from 'react';
import {AuthContext, ColorthemeNotee, theme} from '../../../App';
import { updateuser } from '../user-service';
import  {Socket, io} from 'socket.io-client';
import toast from 'react-hot-toast';
import { WebSocketUrl } from '../../../../env';

function UpdateForm({ currentuser,setcurrentuser,setOpen, open, user, setuser, users }) {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();
    const [socket,setSocket]=useState(null);
    const { userInfo, setUserInfo } = useContext(AuthContext);
    const { toggle } = useContext(theme);
    const {colortheme}=useContext(ColorthemeNotee);
    const bgColor = toggle === 'light' ? 'bg-blue-gray-50' : 'bg-customdark';
    const textColor = toggle === 'light' ? 'gray-900' : 'white';
    let today = new Date();
    let formattedDate = today.getFullYear() + '-0' + (today.getMonth() + 1) + '-' + today.getDate();
    const createdSocket = io(WebSocketUrl);

    useEffect(() => {
        if (user && user.length > 0) {
            setValue("Online", user[0].Online);
            setValue("firstName", user[0].firstName);
            setValue("email", user[0].email);
            setValue("Datenaissance", user[0].Datenaissance);
            setValue("Profil", user[0].Profil);
            setValue("Background", user[0].Background);
            setValue("propos", user[0].propos);
        }
    }, [user]);

    return (
        <motion.form initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{
            type: "spring",
            stiffness: 100,
            damping: 25,
            duration: 0.5
        }} className={` p-6 p${textColor}rounded-lg gap-4 sm:gap-0 items-center flex flex-col`}>
            <div className="flex-auto w-full">
                <label htmlFor="time" className={`mt-2 block mb-2 text-sm font-medium text-${textColor}`}>Nom prenom</label>
                <input placeholder="Nom Prenom" className={`mt-2 mb-2 outline-none ${bgColor} text-${textColor} border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-${colortheme}-500 focus:border-${colortheme}-500 block w-full p-2.5 `} {...register('firstName', { required: true })} />
                {errors.firstName && <p className=' text-xs text-red-700 font-medium block'>Le prenom est obligatoire</p>}
            </div>

            <div className="flex-auto w-full">
                <label htmlFor="time" className={`mt-2 block mb-2 text-sm font-medium text-${textColor}`}>Email</label>
                <input placeholder="email" className={`mt-2 mb-2 outline-none ${bgColor} text-${textColor} border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-${colortheme}-500 focus:border-${colortheme}-500 block w-full p-2.5 `}  {...register('email', { required: true })} />
                {errors.email && <p className=' text-xs text-red-700 font-medium block'>L'adresse mail est obligatoire</p>}
            </div>
            
            {


               user && user.length>0 && user[0].Online===true?<div className="flex-auto w-full">
                <label htmlFor="status" className={`mt-2 block mb-2 text-sm font-medium text-${textColor}`}>Statut</label>
                <select
                    id="status"
                    className={`mt-2 mb-2 outline-none ${bgColor} text-${textColor} border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-${colortheme}-500 focus:border-${colortheme}-500 block w-full p-2.5`}
                    {...register('Online', { required: true })}
                >
                    <option value="true">En ligne</option>
                    <option value="false">Hors ligne</option>
                </select>
                {errors.Online && <p className='mb-3 text-xs text-red-700 font-medium block'>Veuillez choisir un statut.</p>}

            </div>:<div></div>
            }
            
            <div className="flex-auto w-full">
                <label htmlFor="time" className={`mt-2 block mb-2 text-sm font-medium text-${textColor}`}>date naissance</label>
                <input type="date" placeholder='date-naissance' className={` mt-2 mb-2 outline-none ${bgColor} text-${textColor} border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 `}  {...register('Datenaissance', { required: true })} />
                {errors.Datenaissance && <p className=' mb-3 text-xs text-red-700 font-medium block'>la date de naissance est obligatoire</p>}
                <input type="text" className='hidden' {...register('Profil',)} />
                <input type="text" className='hidden' {...register('Background',)} />
                <input type="text" className='hidden' {...register('propos',)} />
            </div>
            <button onClick={handleSubmit(async (data) => {
                {

                    await updateuser(data, user[0].email).then(() => {

                        users.map((userelement) => {

                            if (userelement.email === user[0].email) {
                                userelement.Online = data.Online
                                userelement.firstName = data.firstName;
                                userelement.Datenaissance = data.Datenaissance;
                                userelement.email = data.email;
                                if (open.email === currentuser.email) {
                                    const tosave = {
                                        isAuthenticated: userInfo.isAuthenticated,
                                        token: userInfo.token,
                                        email: data.email,
                                    };
                                    localStorage.setItem("auth", JSON.stringify(tosave));
                                    setUserInfo(tosave);
                                    setcurrentuser(userelement);
                                }
                                setuser(users.slice());
                            }



                        })
                    })
                    setOpen({isopen: false, type: "create", email: data.email});

                }})}  className={`mt-6 mx-auto w-1/2 text-white bg-${colortheme}-500 hover:bg-${colortheme}-600 focus:ring-4 focus:outline-none focus:ring-${colortheme}-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-${colortheme}-600 dark:hover:bg-${colortheme}-500 dark:focus:ring-${colortheme}-600`} >valider</button>
        </motion.form>

    );
}
export default UpdateForm;



