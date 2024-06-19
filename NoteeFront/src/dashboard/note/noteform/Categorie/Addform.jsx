


import { useForm } from 'react-hook-form';
import { motion } from "framer-motion";
import { useContext, useEffect } from 'react';
import {ColorthemeNotee, theme} from '../../../../App.jsx';
import {createnote} from "../../service/note-service.jsx";
import {createcategorie} from "../../service/categorie-service.jsx";


function Addformcategorie({ setCategoriesList,listcategories, open, setOpen}) {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    const { toggle } = useContext(theme);
    const {colortheme}=useContext(ColorthemeNotee);
    const bgColor = toggle === 'light' ? 'bg-blue-gray-50' : 'bg-customdark';
    const textColor = toggle === 'light' ? 'gray-900' : 'white';

    useEffect(() => {
        setValue("name", '');
        setValue("color", '');
        setValue("userId", open.userid);

    });
    return (
        <motion.form initial={{opacity: 0}} whileInView={{opacity: 1}} transition={{
            type: "spring",
            stiffness: 100,
            damping: 25,
            duration: 0.5
        }} className={` p-6 p${textColor}rounded-lg gap-4 sm:gap-0 items-center flex flex-col`}>
            <div className="flex-auto w-full">
                <label htmlFor="time" className={`mt-2 block mb-2 text-sm font-medium text-${textColor}`}>Categorie</label>
                <input style={{textColor: textColor}} placeholder="categorie"
                       className={`mt-2 mb-2 outline-none ${bgColor} text-${textColor} border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-${colortheme}-500 focus:border-${colortheme}-500 block w-full p-2.5 `}  {...register('name', {required: true})} />
                {errors.name && <p className=' text-xs text-red-700 font-medium block'>Le nom est obligatoire</p>}
            </div>


            <div className="flex-auto w-full">

                <input type="userId"
                       className={` hidden   mt-2 mb-2 outline-none ${bgColor} text-${textColor} border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-${colortheme}-500 focus:border-${colortheme}-500 block w-full p-2.5 `}  {...register('userId', {required: true})} />

            </div>
            <label htmlFor="color"
                   className={`mt-2 block mb-2 text-sm font-medium text-${textColor}`}>Catégorie</label>
            <select
                id="color"
                className={`mt-2 mb-2 outline-none ${bgColor} text-${textColor} border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-${colortheme}-500 focus:border-${colortheme}-500 block w-full p-2.5`}
                {...register('color', {required: true})}
            >

                <option value="purple">violet</option>
                <option value="orange">orange</option>
                <option value="blue">bleue</option>
                <option value="red">rouge</option>
                <option value="green">vert</option>
                <option value="yellow">jaune</option>
                <option value="pink">rose</option>
                <option value="lime">lime</option>
                <option value="blue-gray">bleue gris</option>
                <option value="indigo">indigo</option>
                <option value="teal">bleue vert</option>
                <option value="cyan">cyan</option>
                <option value="light-blue">bleue clair</option>
                <option value="light-green">vert clair</option>
                <option value="amber">ambre</option>
                <option value="deep-orange">orange foncé</option>
                <option value="deep-purple">violet foncé</option>
                <option value="brown">marron</option>
                <option value="gray">gris</option>


            </select>


            <button onClick={handleSubmit(async (data) => {
                await createcategorie(data).then((res) => {
                    setOpen({isopen: false, type: "create", title: data.title, content: data.content, userId: data.userId, categoryId: data.categoryId});
                    console.log("le"+res)
                    setCategoriesList(res.data.categories);

                }).catch((err) => {
                    setOpen({isopen: false, type: "create", title: data.title, content: data.content, userId: data.userId, categoryId: data.categoryId});
                })


            })}
                    className={`mt-6 mx-auto w-1/2 text-white bg-${colortheme}-500 hover:bg-${colortheme}-600 focus:ring-4 focus:outline-none focus:ring-${colortheme}-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-${colortheme}-600 dark:hover:bg-${colortheme}-500 dark:focus:ring-${colortheme}-600`} >valider</button>
        </motion.form>

    );
}
export default Addformcategorie;




