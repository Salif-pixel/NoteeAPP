

import React, {useContext, useState} from 'react';
import { motion } from 'framer-motion';
import {useNavigate} from "react-router-dom";
import {ColorthemeNotee, theme} from "../../../App.jsx";
import notesdark from "../../../assets/notesdark.png";
import notes from "../../../assets/notes.png";
import profil from "../../../assets/profil.png";
import profildark from "../../../assets/profildark.png";
import {FooterWithSocialLinks} from "../footer.jsx";

function Landing3(){
    const navigate = useNavigate();
    const { toggle,setToggle } = useContext(theme);
    const {colortheme} = useContext(ColorthemeNotee)
const bgBorder = toggle === 'light' ? 'border-gray-500' : 'border-white';
const textColor = toggle === 'light' ? 'text-black' : 'text-white';
const bgColor = toggle === 'dark' ? 'bg-white' : 'bg-customdark';

const bg=  'bg-white/5';
    const [activeTab, setActiveTab] = useState('notes');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };
    return (
        <motion.div id={`landing3`} transition={{
            type: "spring",
            stiffness: 100,
            damping: 25,
            duration: 2
        }}
                    className="flex backdrop-blur-lg   flex-auto justify-start w-screen h-[calc(100vh)]  items-start flex-col  ">
            <motion.div initial={{x: -300}} whileInView={{x: 0}}
                        transition={{type: "spring", stiffness: 100, damping: 25, duration: 2}}
                        className={`w-52 h-52 bg-${colortheme}-500 opacity-100 rounded-full absolute top-40 right-20`}></motion.div>
            <motion.div initial={{x: 300}} whileInView={{x: 0}}
                        transition={{type: "spring", stiffness: 100, damping: 25, duration: 2}}
                        className={`w-32 h-32 bg-${colortheme}-500 opacity-100 rounded-full absolute bottom-24 left-20`}></motion.div>
            <section
                id="features"
                aria-label="Features for running your books"
                className={`relative overflow-hidden w-screen   py-10 bg-customdark h-screen pb-28  sm:py-32`}
            >

                <div className="mx-auto max-w-7xl   px-4 sm:px-6 lg:px-8 relative">

                    <div
                        className="  grid grid-cols-1 gap-y-1  sm:gap-y-6  lg:grid-cols-12 ">
                        <div
                            className="-mx-4 flex overflow-x-auto pb-4 sm:mx-0 sm:overflow-visible sm:pb-0 lg:col-span-5">
                            <div
                                className="relative z-10 flex j items-start gap-x-4 whitespace-nowrap px-4 sm:mx-auto sm:px-0 lg:mx-0 lg:block lg:gap-x-0 lg:gap-y-1 lg:whitespace-normal"
                                role="tablist"
                                aria-orientation="vertical"
                            >
                                <div
                                    className={activeTab==="notes" ?  ` lg:bg-white/10 group relative mt-4 mb-4 rounded-full px-4 py-1 lg:rounded-l-xl lg:rounded-r-none lg:p-6 bg-white  `:` lg:bg-transparent hover:lg:bg-white/5 group relative mt-4 mb-4 rounded-full px-4 py-1 lg:rounded-l-xl lg:rounded-r-none lg:p-6 bg-white  `}>
                                    <h3>
                                        <button
                                            className={activeTab!=="notes" ?`font-display text-lg ui-not-focus-visible:outline-none  text-${colortheme}-100 hover:text-${colortheme}-200 lg:text-white`:`font-display text-lg ui-not-focus-visible:outline-none  text-${colortheme}-600 lg:text-white`}
                                            id="headlessui-tabs-tab-:R9d9afja:"
                                            onClick={() => handleTabClick('notes')}

                                        >
                                            <span
                                                className="absolute  inset-0 rounded-full lg:rounded-l-xl lg:rounded-r-none"></span>
                                            Notes
                                        </button>
                                    </h3>
                                    <p className="mt-2 hidden text-sm lg:block text-white">
                                        Chaque mot que vous écrivez est une graine plantée dans le jardin de votre imagination. Cultivez-le avec passion et voyez votre monde s'épanouir à travers chaque page.
                                    </p>
                                </div>
                                <div
                                    className={activeTab==="profil" ?  ` lg:bg-white/10 group relative mt-4 mb-4 rounded-full px-4 py-1 lg:rounded-l-xl lg:rounded-r-none lg:p-6 bg-white  `:` lg:bg-transparent hover:lg:bg-white/5 group relative mt-4 mb-4 rounded-full px-4 py-1 lg:rounded-l-xl lg:rounded-r-none lg:p-6 bg-white  `}>
                                    <h3>
                                        <button
                                            className={activeTab!=="profil" ?`font-display text-lg ui-not-focus-visible:outline-none  text-${colortheme}-100 hover:text-${colortheme}-200 lg:text-white`:`font-display text-lg ui-not-focus-visible:outline-none  text-${colortheme}-600 lg:text-white`}
                                            id="headlessui-tabs-tab-:Rad9afja:"
                                            onClick={() => handleTabClick('profil')}

                                        >
                                            <span
                                                className="absolute inset-0 rounded-full lg:rounded-l-xl lg:rounded-r-none"></span>
                                            Profil
                                        </button>
                                    </h3>
                                    <p className={`mt-2 hidden text-sm lg:block text-${colortheme}-100 group-hover:text-white`}>
                                        Chaque ligne que vous tracez est une étape vers votre propre récit. Embrassez le pouvoir de vos mots et laissez-les façonner votre destinée.
                                    </p>
                                </div>

                            </div>
                        </div>
                        <div className="lg:col-span-7">
                            <div
                                id="headlessui-tabs-panel-:R1l9afja:"
                                role="tabpanel"
                                tabIndex="0"
                                data-headlessui-state="selected"
                                aria-labelledby="headlessui-tabs-tab-:R9d9afja:"
                                style={{display: 'block'}}
                                data-selected=""
                            >
                                <div className="relative sm:px-6 lg:hidden">
                                    <div
                                        className="absolute -inset-x-4 bottom-[-4.25rem] top-[-6.5rem] bg-white/10 ring-1 ring-inset ring-white/10 sm:inset-x-0 sm:rounded-t-xl"></div>
                                    {
                                        activeTab === 'notes' ?
                                            <p className="relative mx-auto max-w-2xl text-base text-white sm:text-center">
                                                Chaque mot que vous écrivez est une graine plantée dans le jardin de
                                                votre
                                                imagination. Cultivez-le avec passion et voyez votre monde s'épanouir à
                                                travers chaque page.
                                            </p>:
                                        <p className="relative mx-auto max-w-2xl text-base text-white sm:text-center">
                                            Chaque ligne que vous tracez est une étape vers votre propre récit. Embrassez le pouvoir de vos mots et laissez-les façonner votre destinée.

                                        </p>

                                    }

                                </div>
                                <div
                                    className={`mt-10 w-[45rem] z-50 border-2 ${bgBorder} overflow-hidden rounded-xl bg-slate-50 shadow-xl shadow-${colortheme}-500/20 sm:w-auto lg:mt-0 lg:w-[67.8125rem]`}>
                                    <img
                                        alt=""
                                        fetchPriority="high"
                                        width="2174"
                                        height="1464"
                                        decoding="async"
                                        data-nimg="1"
                                        className="w-full"
                                        style={{color: 'transparent'}}
                                        sizes="(min-width: 1024px) 67.8125rem, (min-width: 640px) 100vw, 45rem"
                                        src={ toggle==="light"&&activeTab==="notes"?notes:toggle==="dark"&&activeTab==="notes"?notesdark:toggle==="light"&&activeTab==="profil"?profil:profildark}
                                    />
                                </div>
                            </div>
                            <div
                                id="headlessui-tabs-panel-:R2l9afja:"
                                role="tabpanel"
                                tabIndex="-1"
                                data-headlessui-state=""
                                aria-labelledby="headlessui-tabs-tab-:Rad9afja:"
                                style={{display: 'none'}}
                            ></div>
                            <div
                                id="headlessui-tabs-panel-:R3l9afja:"
                                role="tabpanel"
                                tabIndex="-1"
                                data-headlessui-state=""
                                aria-labelledby="headlessui-tabs-tab-:Rbd9afja:"
                                style={{display: 'none'}}
                            ></div>
                            <div
                                id="headlessui-tabs-panel-:R4l9afja:"
                                role="tabpanel"
                                tabIndex="-1"
                                data-headlessui-state=""
                                aria-labelledby="headlessui-tabs-tab-:Rcd9afja:"
                                style={{display: 'none'}}
                            ></div>
                        </div>
                    </div>
                </div>

            </section>
        </motion.div>

    )
}

export default Landing3;
