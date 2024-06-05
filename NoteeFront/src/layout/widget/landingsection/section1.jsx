import React, {useContext} from 'react';
import { motion } from 'framer-motion';
import {useNavigate} from "react-router-dom";
import {ColorthemeNotee, theme} from "../../../App.jsx";

 function Landing1(){
     const navigate = useNavigate();
     const {colortheme}=useContext(ColorthemeNotee);
     const { toggle,setToggle } = useContext(theme);
     const textColor = toggle === 'light' ? 'text-black' : 'text-white';
     const bgColor = toggle === 'light' ? 'bg-gray-100' : 'bg-customdark';
     const textColorD = toggle === 'light' ? 'text-black' : 'text-white';
return (
     <motion.div id={`landing1`} initial={{y: 400}} animate={{opacity: 1, y: 0}} transition={{
                        type: "spring",
                        stiffness: 100,
                        damping: 25,
                        duration: 2
                    }}
                                className="flex backdrop-blur-lg flex-auto justify-center w-screen h-screen  items-center flex-col gap-4  ">
                        <motion.div initial={{x: -300}} whileInView={{x: 0}}
                                    transition={{type: "spring", stiffness: 100, damping: 25, duration: 2}}
                                    className={`w-52 h-52 bg-${colortheme}-500 opacity-100 rounded-full absolute top-40 right-20`}></motion.div>
                        <motion.div initial={{x: 300}} whileInView={{x: 0}}
                                    transition={{type: "spring", stiffness: 100, damping: 25, duration: 2}}
                                    className={`w-32 h-32 bg-${colortheme}-500 opacity-100 rounded-full absolute bottom-40 left-20`}></motion.div>
                        <div
                            className={`flex flex-col justify-center w-screen  absolute left-0 top-0 right-0 bottom-0 backdrop-blur-lg  items-center`}>
                            <div className={`flex flex-col justify-center w-screen items-center`}>
                                <p className={`flex-auto text-2xl md:text-6xl  ${textColor} text-center `}>Rejoignez-nous
                                    dès
                                    aujourd'hui <br/>et prenez le contrôle de vos <span
                                        className={`text-${colortheme}-500`}>notes.</span>
                                </p>
                                <p className={`flex-auto md:text-lg ${textColorD} text-center`}>Avec notre plateforme, noter
                                    n'a
                                    jamais
                                    été
                                    aussi simple et
                                    efficace.<br/> Venez noter, organisez et accédez à vos notes en un clic !!</p>
                                <button onClick={() => navigate("/register")}
                                        className={`bg-${colortheme}-500 hover:bg-${colortheme}-600 w-fit text-white px-4 py-2 rounded-3xl`}>S'inscrire
                                </button>
                            </div>
                        </div>

                    </motion.div>
)
}
export default Landing1;