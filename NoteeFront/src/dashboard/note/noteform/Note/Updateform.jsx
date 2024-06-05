
import { useForm } from 'react-hook-form';
import { motion } from "framer-motion";
import { useContext, useEffect } from 'react';
import {ColorthemeNotee, theme} from '../../../../App.jsx';
import {createnote, Updatenote} from "../../service/note-service.jsx";
;

function Updateform({setActive,active ,note,data,listcategories,setListnotes,listnotes,setCategoriesList, open, setOpen}) {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();
    const {colortheme}=useContext(ColorthemeNotee);
    const { toggle } = useContext(theme);
    const bgColor = toggle === 'light' ? 'bg-blue-gray-50' : 'bg-customdark';
    const textColor = toggle === 'light' ? 'gray-900' : 'white';
    const content=JSON.stringify(data)

    useEffect(() => {

        setValue("title", note.title);
        setValue("content", content );
        setValue("categoryId", note.categoryId);
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

            <div className="flex-auto  w-full">
                <select
                    className={`mt-2 mb-2 outline-none ${bgColor} text-${textColor} border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-${colortheme}-500 focus:border-${colortheme}-500 block w-full p-2.5`}
                    {...register('categoryId', {required: true})}
                >
                    {listcategories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>


            <button onClick={handleSubmit(async (data) => {

                await Updatenote(note.id, data).then((res) => {
                    if(note.id===active.id){
                       setActive({id: res.data.note.id, note: res.data.note});

                    }
                        setCategoriesList(res.data.listcategory);
                        setListnotes(res.data.listnotes);


                    setOpen({
                        isopen: false,
                        type: "create",
                        title: data.title,
                        content: data.content,
                        categoryId: data.categoryId
                    });

                })


            })}
                    className={`mt-6 mx-auto w-1/2 text-white bg-${colortheme}-500 hover:bg-${colortheme}-600 focus:ring-4 focus:outline-none focus:ring-${colortheme}-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-${colortheme}-600 dark:hover:bg-${colortheme}-500 dark:focus:ring-${colortheme}-600`} >valider</button>

        </motion.form>

    );
}

export default Updateform;



