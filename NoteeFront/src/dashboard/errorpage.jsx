import { useContext } from "react";
import { theme } from "../App";
import {motion} from 'framer-motion';
export default function Notfound(){
    const {toggle}=useContext(theme);
    const bgColor = toggle === 'light' ? 'bg-blue-gray-50' : 'bg-customdark';
    return(
        <div className={`z-[999] overflow-hidden ${bgColor} min-h-screen sm:flex items-center min-w-screen-xl`}>
    <motion.div initial={{ y: 200 }} animate={{ y: 0 }} transition={{
                        type: "spring",
                        stiffness: 100,
                        damping: 25,
                    }}  className="sm:w-1/2 p-10">
        <div className="image object-center text-center">
            <img src="https://i.imgur.com/WbQnbas.png"/>
        </div>
    </motion.div>
    <motion.div  initial={{ x: 200 }} animate={{ x: 0 }} transition={{
                        type: "spring",
                        stiffness: 100,
                        damping: 25,
                    }}  className="sm:w-1/2 p-5">
        <div className="text">
            <span className="text-gray-500 border-b-2 border-indigo-600 uppercase">Erreur 404</span>
            <h2 className="my-4 font-bold text-3xl  sm:text-4xl ">Page<span className="text-indigo-600"> Introuvable</span>
            </h2>
            <p className="text-gray-700">
            "Oups ! Nous avons frappé un mur numérique. La page que vous recherchez semble avoir pris des vacances imprévues. Mais ne vous inquiétez pas, nous travaillons pour la retrouver aussi vite que possible."
            </p>
        </div>
    </motion.div>
</div>
    )
}