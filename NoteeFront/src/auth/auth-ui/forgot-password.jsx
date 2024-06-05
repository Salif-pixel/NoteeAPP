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
import {ForgotPasswordRequest} from "../auth-service/forgot-password-service.jsx";
import CardAnimated from "../../layout/widget/cardAnimation/cardanimated.jsx";

function ForgotPassword() {

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
                }} className="w-full md:w-1/2 h-[calc(100vh)]">

                    <div className="mt-12 flex flex-col items-center">
                        <h1 className={`text-2xl ${textColor} xl:text-3xl font-extrabold`}>
                            Envoyer
                        </h1>
                        <div className="w-full flex-1 mt-8">


                            <div className={`my-12 border-b border-${lineColor} text-center`}>
                                <div
                                    className={`leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium ${bgColor} transform translate-y-1/2`}>
                                    envoyer votre compte email
                                </div>
                            </div>

                            <div className="mx-auto max-w-xs">
                                <input
                                    className={`w-full px-8 py-4 rounded-lg font-medium ${bgColor} ${textColor} border border-gray-600 placeholder-gray-500 text-sm focus:outline-none  focus:${bgColor}`}
                                    type="email" placeholder="Email" {...register('email', {required: true})} />
                                {errors.email &&
                                    <p className=' text-xs text-red-700 font-medium block'>L'email est
                                        obligatoire</p>}
                                <button onMouseEnter={() => setIsHovered(true)}
                                        onMouseLeave={() => setIsHovered(false)}
                                        onClick={handleSubmit(async (data) => {
                                            await ForgotPasswordRequest(data).then(res => {

                                            })
                                        })} style={{backgroundColor: isHovered ? hoverColor : color}}
                                        className={`mt-5 tracking-wide font-semibold  text-gray-100 w-full py-4 rounded-lg  transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}>
                                    <svg className={`w-6 h-6 text-${textColorD} -ml-2`} fill="none"
                                         stroke="currentColor"
                                         strokeWidth="2"
                                         strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                                        <circle cx="8.5" cy="7" r="4"/>
                                        <path d="M20 8v6M23 11h-6"/>
                                    </svg>
                                    <span className={`ml-3 text-${textColorD}`}>
                                        Envoyer  </span>
                                </button>


                                <p className="mt-6 text-xs text-gray-600 text-center">
                                    En cliquant sur le bouton, j'accepte de respecter les
                                    Conditions d'utilisation

                                    et la

                                    Politique de confidentialité


                                </p>
                                <span className='ml-6 text-xs cursor-pointer'
                                      onClick={() => navigate("/register")}
                                      style={{color: color}}>cliquer ici pour creer un compte,</span>
                                <br/>
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

export default ForgotPassword;

