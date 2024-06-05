import React, { useContext, useState } from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Avatar,
} from "@material-tailwind/react";
import {ColorthemeNotee, theme} from '../../App';
import { useAnimate } from 'framer-motion';
import { motion } from 'framer-motion';
import BasicDateCalendar from '../../layout/widget/cardprofil/calendar';
import InfoCard from '../../layout/widget/cardprofil/infocard';
import CardProfil from '../../layout/widget/cardprofil/cardprofil';
import Aboutprofil from '../../layout/widget/cardprofil/Aboutprofil';
import Reseauprofil from '../../layout/widget/cardprofil/Reseauprofil';
import { Calendar } from 'antd';
import Calendarprofil from '../../layout/widget/cardprofil/Calendarprofil';

function Profil({ user, setuser }) {
    const [collapsed, setCollapsed] = useState(true);
    const [scope, animate] = useAnimate();
    const {colortheme}=useContext(ColorthemeNotee);
    const animation = async () => {
        if (collapsed) {
            await Promise.all([
                animate("#img", { opacity: 0, scale: 0 }, { duration: 0.5 }),
                animate("#content", { opacity: 0, scale: 0 }, { duration: 0.5 }),
                animate("#calendar", { opacity: 0, scale: 0 }, { duration: 0.5 }),
                animate("#board", { y: 100 }, { duration: 0.5 }),
                animate("#infocard", { scale: 1, opacity: 1, y: -250, }, { duration: 0.6 }),
                animate("#read", { opacity: 1 }, { duration: 0.5 }),
            ])

        } else {
            await Promise.all([
                animate("#infocard", { opacity: 0, scale: 0, y: 0, }, { duration: 0.5 }),
                animate("#img", { opacity: 1, scale: 1, }, { duration: 0.5 }),
                animate("#content", { opacity: 1, scale: 1 }, { duration: 0.5 }),
                animate("#calendar", { opacity: 1, scale: 1 }, { duration: 0.5 }),
                animate("#board", { y: 0 }, { duration: 0.5 }),
                animate("#read", { opacity: 0 }, { duration: 0.5 }),
            ])



        }
        collapsed === true ? setCollapsed(false) : setCollapsed(true);
    }
    const { toggle, setToggle } = useContext(theme);
    const bgColor = toggle === 'light' ? 'blue-gray-50' : 'bigdark';
    const cardColor = toggle === 'light' ? 'white' : 'customdark';
    const TextColor = toggle === 'light' ? 'customdark' : 'white';
    const logoColor = toggle === 'light' ? 'blue-gray-50' : 'black';
    return (
        <div ref={scope} className='w-full relative flex flex-col items-center h-full  overflow-hidden'>

            <div className=" top-0 w-full absolute z-2 min-h-screen bg-center bg-cover" style={{
                backgroundImage: `url(${user.Background})`
            }}>

            </div>
            <motion.div id="board" initial={{ y: 200 }} animate={{ y: 0 }} transition={{
                type: "spring",
                stiffness: 100,
                damping: 25,
                delay: 0.1,

            }} className='w-full min-h-screen'>
                <Card className={`w-full bg-${bgColor} h-fit mt-80 rounded-none`}>
                    <Card id="content" className={`min-w-screen bg-${cardColor} sm:ml-10 sm:mr-10 positon relative bottom-20  h-full rounded-lg`}>
                        <motion.div id='img' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{
                            type: "spring",
                            stiffness: 100,
                            damping: 25,
                            delay: 0.2,

                        }} className="flex justify-center">
                            <img src={user.Profil} className={`rounded-full -mt-28 border-4 object-center object-cover border-${logoColor} mr-2 h-56 w-56`} />
                        </motion.div>
                        <div >

                            <Button onClick={() => animation()} className={`ml-2 bg-${colortheme}-500 hover:bg-${colortheme}-700 text-white font-bold py-2 px-4 rounded `}>Voir plus</Button>
                        </div>
                        <CardBody className='p-0 w-full'>
                            <motion.div className='flex flex-col justify-center w-full' initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{
                                type: "spring",
                                stiffness: 100,
                                damping: 25,
                                delay: 0.3,
                            }}>
                                <div className='min-w-screen    '>

                                    <motion.div id='read' initial={{ x: 1150, opacity: 0 }} transition={{
                                        type: "spring",
                                        stiffness: 100,
                                        damping: 25,
                                        delay: 0.1,

                                    }}>

                                    </motion.div>


                                </div>
                                <div className=''>
                                    <div className="text-center mt-2">
                                        <h1 className={`font-semibold text-${TextColor} mt-10 mb-5`}>{user.firstName}</h1>
                                        <p className="text-gray-500 mb-2">{user.email}</p>
                                        <p className="text-gray-500 mb-2">{user.Datenaissance}</p>
                                    </div>
                                </div>
                                <div className=' w-full xl:grid grid-cols-2 lg:flex flex-col'>
                                    <Aboutprofil user={user} />
                                    <motion.div initial={{ opacity: 0, y: 50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 }} className=' flex flex-col'>
                                        <Reseauprofil />
                                    </motion.div>
                                    <motion.div initial={{ opacity: 0, y: 50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.8}}  className='flex justify-center col-span-2' id="calendar">
                                        <Calendarprofil />
                                    </motion.div>

                                </div>


                            </motion.div>


                        </CardBody>


                    </Card>
                    <motion.div id='infocard' className='absolute h-full flex left-0 right-0 lg:ml-10 lg:mr-10  ' initial={{ opacity: 0, scale: 0 }} transition={{
                        type: "spring",
                        stiffness: 100,
                        damping: 25,
                        delay: 0.1,

                    }} >
                        <InfoCard user={user} setuser={setuser} back={animation} />

                    </motion.div>
                </Card>

            </motion.div>



        </div>

    );
}

export default Profil;