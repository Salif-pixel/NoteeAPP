import React, { useContext, useEffect, useState } from 'react';

import sapiens from '../../assets/notee.png';
import tree from '../../assets/tree-perso.jpg';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { authentification } from '../auth-service/login-service';
import {AuthContext, ColorthemeNotee, theme} from '../../App';
import { useNavigate } from "react-router-dom";
import {motion, useAnimate} from "framer-motion";
import {Card} from "@material-tailwind/react";
import {CalendarOutlined, ExceptionOutlined} from "@ant-design/icons";
import * as promise from "axios";
import {DefaultSkeleton} from "../../layout/widget/skeleton.jsx";
import {createuser} from "../auth-service/register-service.jsx";
import CardAnimated from "../../layout/widget/cardAnimation/cardanimated.jsx";

function Register() {

    const { toggle } = useContext(theme);
    const {colortheme}=useContext(ColorthemeNotee);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();


    const { userInfo, setUserInfo } = useContext(AuthContext);
    const [isHovered, setIsHovered] = useState(false);


    useEffect(() => {
        if (userInfo.isAuthenticated) {
            navigate("/dashboard/user");
        }
    }, []);
    const color = toggle === 'light' ? "#0C0E14":"#FFFFFF";
    const hoverColor= colortheme;
    const bgColor = toggle === 'light' ? 'bg-white' : 'bg-bigdark';
    const darkbgColor = toggle === 'dark' ? 'bg-white' : 'bg-bigdark';
    const textColor = toggle === 'light' ? 'text-black' : 'text-white';
    const lineColor = toggle === 'dark' ? 'black' : 'blue-gray-100';
    const textColorD = toggle === 'dark' ? 'black' : 'white';

    return (
        <div  className="overflow-hidden h-[calc(100vh)]">

            <div className={`w-full   ${bgColor}  flex justify-center flex-1`}>
                <div className={`flex-1 ${darkbgColor}    text-center hidden lg:flex`}>

                  <CardAnimated/>
                </div>

                <motion.div initial={{y: 200, opacity: 0}} whileInView={{y: 0, opacity: 1}} transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 25,
                    duration: 0.5
                }} className="w-full md:w-1/2 h-[calc(100vh)] overflow-auto">

                    <div className="mt-12 flex flex-col items-center">
                        <h1 className={`text-2xl ${textColor} xl:text-3xl font-extrabold`}>
                            S'inscrire
                        </h1>
                        <div className="w-full flex-1 mt-8">
                            <div className="flex flex-col items-center">
                                <button style={{backgroundColor: color}}
                                        className={`w-full max-w-xs font-bold shadow-sm rounded-lg py-3  text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline`}>
                                    <div className={`bg-white p-2 rounded-full`}>
                                        <svg className="w-4" viewBox="0 0 533.5 544.3">
                                            <path
                                                d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                                                fill="#4285f4"/>
                                            <path
                                                d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                                                fill="#34a853"/>
                                            <path
                                                d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                                                fill="#fbbc04"/>
                                            <path
                                                d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                                                fill="#ea4335"/>
                                        </svg>
                                    </div>
                                    <span className={`ml-4 text-${textColorD}`}>
                                        S'inscrire avec Google
                                    </span>
                                </button>

                                <button
                                    style={{backgroundColor: color}}
                                    className={`w-full max-w-xs font-bold shadow-sm rounded-lg py-3  text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5`}>
                                    <div className={`bg-white p-1 rounded-full`}>
                                        <svg className="w-6" viewBox="0 0 32 32">
                                            <path fillRule="evenodd"
                                                  d="M16 4C9.371 4 4 9.371 4 16c0 5.3 3.438 9.8 8.207 11.387.602.11.82-.258.82-.578 0-.286-.011-1.04-.015-2.04-3.34.723-4.043-1.609-4.043-1.609-.547-1.387-1.332-1.758-1.332-1.758-1.09-.742.082-.726.082-.726 1.203.086 1.836 1.234 1.836 1.234 1.07 1.836 2.808 1.305 3.492 1 .11-.777.422-1.305.762-1.605-2.664-.301-5.465-1.332-5.465-5.93 0-1.313.469-2.383 1.234-3.223-.121-.3-.535-1.523.117-3.175 0 0 1.008-.32 3.301 1.23A11.487 11.487 0 0116 9.805c1.02.004 2.047.136 3.004.402 2.293-1.55 3.297-1.23 3.297-1.23.656 1.652.246 2.875.12 3.175.77.84 1.231 1.91 1.231 3.223 0 4.61-2.804 5.621-5.476 5.922.43.367.812 1.101.812 2.219 0 1.605-.011 2.898-.011 3.293 0 .32.214.695.824.578C24.566 25.797 28 21.3 28 16c0-6.629-5.371-12-12-12z"/>
                                        </svg>
                                    </div>
                                    <span className={`ml-4 text-${textColorD}`}>
                                        S'inscrire avec GitHub
                                    </span>
                                </button>
                            </div>

                            <div className={`my-12 border-b border-${lineColor} text-center`}>
                                <div
                                    className={`leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium ${bgColor} transform translate-y-1/2`}>
                                    Ou se connecter avec son compte e-mail
                                </div>
                            </div>

                            <div className="mx-auto mb-10 max-w-xs">
                                <div className="flex-auto w-full">
                                    <input style={{textColor: textColor}} placeholder="email"
                                           className={`w-full px-8 py-4 rounded-lg font-medium ${bgColor} ${textColor} border border-gray-600 placeholder-gray-500 text-sm focus:outline-none  focus:${bgColor} mt-5 `}  {...register('email', {required: true})} />
                                    {errors.email &&
                                        <p className=' text-xs text-red-700 font-medium block'>Le'adresse mail est
                                            obligatoire</p>}
                                </div>
                                <div className="flex-auto w-full">
                                    <input placeholder="Nom Prenom"
                                           className={`w-full px-8 py-4 rounded-lg font-medium ${bgColor} ${textColor} border border-gray-600 placeholder-gray-500 text-sm focus:outline-none  focus:${bgColor} mt-5 `} {...register('firstName', {required: true})} />
                                    {errors.firstName &&
                                        <p className=' text-xs text-red-700 font-medium block'>Le prenom est
                                            obligatoire</p>}
                                </div>

                                <div className="flex-auto w-full">
                                    <input type="date" placeholder='date-naissance'
                                           className={` w-full px-8 py-4 rounded-lg font-medium ${bgColor} ${textColor} border border-gray-600 placeholder-gray-500 text-sm focus:outline-none  focus:${bgColor} mt-5 `}  {...register('Datenaissance', {required: true})} />
                                    {errors.Datenaissance &&
                                        <p className=' mb-3 text-xs text-red-700 font-medium block'>la date de naissance
                                            est
                                            obligatoire</p>}
                                </div>
                                <div className="flex-auto w-full">
                                    <input type="password" placeholder="mot de passe"
                                           className={`w-full px-8 py-4 rounded-lg font-medium ${bgColor} ${textColor} border border-gray-600 placeholder-gray-500 text-sm focus:outline-none  focus:${bgColor} mt-5 `} {...register('password', {required: true})} />
                                    {errors.password &&
                                        <p className=' text-xs text-red-700 font-medium block'>Le mot de passe est
                                            obligatoire</p>}
                                </div>
                                <button onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}
                                        onClick={handleSubmit(async (data) => {
                                            await createuser(data).then(() => {
                                                navigate("/");
                                            })
                                        })} style={{backgroundColor: isHovered ? hoverColor : color}}
                                        className={`mt-5 tracking-wide font-semibold  text-gray-100 w-full py-4 rounded-lg  transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}>
                                    <svg className={`text-${textColorD} w-6 h-6 -ml-2`} fill="none" stroke="currentColor" strokeWidth="2"
                                         strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                                        <circle cx="8.5" cy="7" r="4"/>
                                        <path d="M20 8v6M23 11h-6"/>
                                    </svg>
                                    <span className={`ml-3 text-${textColorD}`}>
                                        S'inscrire  </span>
                                </button>


                                <p className="mt-6 text-xs text-gray-600 text-center">
                                    En cliquant sur le bouton, j'accepte de respecter les
                                    Conditions d'utilisation

                                    et la

                                    Politique de confidentialité


                                </p>
                                <span className='ml-6 text-xs cursor-pointer' onClick={() => navigate("/auth/login")}
                                      style={{color: color}}>cliquer ici pour vous connecter</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Register;


