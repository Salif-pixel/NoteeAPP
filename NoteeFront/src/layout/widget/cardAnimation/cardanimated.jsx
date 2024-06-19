import {motion, useAnimate} from "framer-motion";
import {Card} from "@material-tailwind/react";
import {ExceptionOutlined} from "@ant-design/icons";
import {DefaultSkeleton} from "../skeleton.jsx";
import React, { useEffect} from "react";
import {ColorthemeNotee, theme} from "../../../App.jsx";
import {useContext} from "react";


function CardAnimated() {
    const [scope, animate] = useAnimate();
    const {colortheme}=useContext(ColorthemeNotee);
    const animation = async () => {
        const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
        try {
            while (true) {

                await delay(1500);
                await Promise.all([
                    animate('#card1', {rotate: 50, scale: 0.4, y: 1000, opacity: 0}, {duration: 1}),
                    animate('#card2', {
                        opacity: 1,
                        backgroundColor: toggle === "dark" ? "#0C0E14" : "#FFFFFF",
                        ease: 'power2.inOut'
                    }),
                ]);
                await animate('#card1', {y: -1000}, {duration: 1}),
                    await delay(1500);
                await Promise.all([
                    animate('#card2', {rotate: 50, scale: 0.4, y: 1000, opacity: 0}, {duration: 1}),
                    animate('#card3', {
                        opacity: 1,
                        backgroundColor: toggle === "dark" ? "#0C0E14" : "#FFFFFF",
                        ease: 'power2.inOut'
                    }),
                ]);
                animate('#card2', {y: -1000}, {duration: 1}),
                    await delay(1500);
                await animate('#card3', {rotate: 50, scale: 0.4, y: 1000, opacity: 0}, {duration: 1});
                await animate('#card3', {y: -1000}, {duration: 1}),
                    await animate('#card1', {rotate: 0, scale: 1, y: 0, opacity: 1}, {duration: 1});
                await animate('#card2', {
                    rotate: 0,
                    scale: 1,
                    y: 0,
                    opacity: 1,
                    backgroundColor: toggle === "dark" ? "#424242" : "#E2E8F0"
                }, {duration: 0.5});
                await animate('#card3', {
                    rotate: 0,
                    scale: 1,
                    y: 0,
                    opacity: 1,
                    backgroundColor: toggle === "dark" ? "#CBD5E0" : "#424242"
                }, {duration: 0.5});


            }
        }catch(e){

        }

    }
    useEffect(() => {

            animation();

    }, []);
    const {toggle} = useContext(theme);
    const bgColor2 = toggle === 'dark' ? 'bg-gray-800' : 'bg-gray-200';
    const bgColor3 = toggle === 'dark' ? 'bg-gray-400' : 'bg-gray-800';
    const textColor = toggle === 'light' ? 'text-black' : 'text-white';
    const bgColor = toggle === 'light' ? 'bg-white' : 'bg-bigdark';
    return (
        <div ref={scope} className={`  w-full  max-w-[calc(100vw-40vw)]`}>
            <motion.div  initial={{x: -200, opacity: 0}} whileInView={{x: 0, scale: 0.8, opacity: 1}}
                        transition={{
                            type: "spring",
                            stiffness: 100,
                            damping: 25,
                            duration: 0.5
                        }} className=" w-full relative     bg-contain bg-center bg-no-repeat">
                <motion.div className={`w-full`} initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            transition={{delay: 0.8}}>
                    <Card id={'card3'}
                          className={`h-[calc(100vh-8vh)]  relative top-10 ${bgColor3} max-w-100 overflow-hidden`}>
                        <div id='title' className='text-center mt-5 '>
                            <ExceptionOutlined
                                className={`text-5xl  text-white bg-${colortheme}-500 border-2 rounded-full  p-10  `}></ExceptionOutlined>
                            <p className={`font-bold  mt-2 ${textColor} font-mono text-4xl`}>Notes</p>
                            <motion.div initial={{width: 0}} animate={{width: 100}} transition={{
                                type: "spring",
                                stiffness: 500,
                                damping: 25,
                                delay: 0.8,

                            }} className={`mx-auto h-1 w-24 bg-${textColor}  rounded-lg`}></motion.div>
                        </div>
                        <div className={`w-full flex justify-center`}>
                            <DefaultSkeleton/>
                        </div>
                    </Card>
                </motion.div>
                <motion.div className={`w-full`} initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            transition={{delay: 0.5}}>

                    <Card id={'card2'}
                          className={`h-[calc(100vh-6vh)]   absolute top-3 right-4 w-full ${bgColor2} max-w-100 overflow-hidden`}>
                        <div id='title' className='text-center mt-5 '>
                            <ExceptionOutlined
                                className={`text-5xl  text-white bg-${colortheme}-500 border-2 rounded-full  p-10 `}></ExceptionOutlined>
                            <p className={`font-bold  mt-2 ${textColor} font-mono text-4xl`}>Notes</p>
                            <motion.div initial={{width: 0}} animate={{width: 100}} transition={{
                                type: "spring",
                                stiffness: 500,
                                damping: 25,
                                delay: 0.8,

                            }} className={`mx-auto h-1 w-24 bg-${textColor}  rounded-lg`}></motion.div>
                        </div>
                        <div className={`w-full flex justify-center`}>
                            <DefaultSkeleton/>
                        </div>

                    </Card>
                </motion.div>
                <motion.div className={`w-full`} initial={{opacity: 0}}
                            animate={{opacity: 1, rotate: 0}}
                >
                    <Card id={'card1'}
                          className={`absolute top-0  right-8 h-[calc(100vh-7vh)] ${bgColor} w-full max-w-100 overflow-hidden`}>
                        <div id='title' className='text-center mt-5 '>
                            <ExceptionOutlined
                            className={`text-5xl  text-white bg-${colortheme}-500 border-2 rounded-full  p-10  `}></ExceptionOutlined>
                            <p className={`font-bold  mt-2 ${textColor} font-mono text-4xl`}>Notes</p>
                            <motion.div initial={{width: 0}} animate={{width: 100}} transition={{
                                type: "spring",
                                stiffness: 500,
                                damping: 25,
                                delay: 0.8,

                            }} className={`mx-auto h-1 w-24 bg-${textColor}  rounded-lg`}></motion.div>
                        </div>
                        <div className={`w-full flex justify-center`}>
                            <DefaultSkeleton/>
                        </div>
                    </Card>
                </motion.div>


            </motion.div>
        </div>
    );
}

export default CardAnimated;
