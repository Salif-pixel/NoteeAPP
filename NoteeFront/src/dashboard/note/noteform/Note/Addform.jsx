
import { useForm } from 'react-hook-form';
import { motion } from "framer-motion";
import { useContext, useEffect } from 'react';
import {ColorthemeNotee, theme} from '../../../../App.jsx';
import {createnote} from "../../service/note-service.jsx";
;

function AddForm({ setCategoriesList,setListNotes,listnotes, open, setOpen}) {
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
    const content=JSON.stringify({"time":1715811425275,"blocks":[{"id":"C4LPgxwZnp","type":"paragraph","data":{"text":"Allons noter .... <br>"},"tunes":{"textAlignment":{"alignment":"left"}}}],"version":"2.29.1"})

    useEffect(() => {
        setValue("title", '');
        setValue("content", content );
        setValue("userId", open.userid);
        setValue("categorieId", '');
    });
    return (
        <motion.form initial={{opacity: 0}} whileInView={{opacity: 1}} transition={{
            type: "spring",
            stiffness: 100,
            damping: 25,
            duration: 0.5
        }} className={` p-6 p${textColor}rounded-lg gap-4 sm:gap-0 items-center flex flex-col`}>
            <div className="flex-auto w-full">
                <label htmlFor="time" className={`mt-2 block mb-2 text-sm font-medium text-${textColor}`}>Titre</label>
                <input style={{textColor: textColor}} placeholder="title"
                       className={`mt-2 mb-2 outline-none ${bgColor} text-${textColor} border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-${colortheme}-500 focus:border-${colortheme}-500 block w-full p-2.5 `}  {...register('title', {required: true})} />
                {errors.title && <p className=' text-xs text-red-700 font-medium block'>Le titre est obligatoire</p>}
            </div>
            <div className="flex-auto hidden w-full">
                <label htmlFor="time"
                       className={`mt-2 block mb-2 text-sm font-medium text-${textColor}`}>contenu</label>
                <input placeholder="contenu"
                       className={`mt-2 mb-2 outline-none ${bgColor} text-${textColor} border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-${colortheme}-500 focus:border-${colortheme}-500 block w-full p-2.5 `} {...register('content', {required: true})}
                       readOnly={true}/>

            </div>

            <div className="flex-auto w-full">

                <input type="userId"
                       className={` hidden   mt-2 mb-2 outline-none ${bgColor} text-${textColor} border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-${colortheme}-500 focus:border-${colortheme}-500 block w-full p-2.5 `}  {...register('userId', {required: true})} />

            </div>
            <label htmlFor="categoryId"
                   className={`mt-2 block mb-2 text-sm font-medium text-${textColor}`}>Catégorie</label>
            <select
                id="categoryId"
                className={`mt-2 mb-2 outline-none ${bgColor} text-${textColor} border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-${colortheme}-500 focus:border-${colortheme}-500 block w-full p-2.5`}
                {...register('categoryId', {required: true})}
            >
                {open.categorielist.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                ))}
            </select>



            <button onClick={handleSubmit(async (data) => {
            await createnote(data).then((res) => {
                    setOpen({isopen: false, type: "create", title: data.title, content: data.content, userId: data.userId, categoryId: data.categoryId});
                    setListNotes(res.data.listnotes);
                    setCategoriesList(res.data.listcategory)
                console.log(res.data.listnotes)

                }).catch((error) => {
                setOpen({isopen: false, type: "create", title: data.title, content: data.content, userId: data.userId, categoryId: data.categoryId});

            })



            })
            }
                    className={`mt-6 mx-auto w-1/2 text-white bg-${colortheme}-500 hover:bg-${colortheme}-600 focus:ring-4 focus:outline-none focus:ring-${colortheme}-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-${colortheme}-600 dark:hover:bg-${colortheme}-500 dark:focus:ring-${colortheme}-600`} >valider</button>
        </motion.form>

    );
}
export default AddForm;
