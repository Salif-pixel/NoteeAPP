
import medical from "../../assets/tree-perso.jpg";
import {motion, useAnimate} from "framer-motion";
import {useNavigate} from "react-router-dom";
import Navlanding from "./navlanding.jsx";
import Contentlanding from "./contentlanding.jsx";
import Footerlanding from "./Footerlanding.jsx";
import {useContext, useEffect, useState} from "react";
import {AuthContext, ColorthemeNotee, theme} from "../../App.jsx";
function LandingLayout() {
    const navigate = useNavigate();
    const { toggle,setToggle } = useContext(theme);
    const {colortheme}=useContext(ColorthemeNotee);
    const bgColor = toggle === 'light' ? 'bg-white' : 'bg-bigdark';
    const {userInfo}=useContext(AuthContext);
    const [scope,animate]=useAnimate();
    const [selected, setSelected] = useState({selected: 0, sens:"haut"});
    const animation = async (newSelected) => {
        console.log(newSelected);
        if (newSelected.selected === 0) {
            await animate("#landing1", { height:'100vh' }, { duration: 0.2 });
            await animate("#landing1", {  y:0,opacity:1, }, { duration: 0.2 });
        } else if (newSelected.selected === 1 && newSelected.sens === "haut") {
            await animate("#landing1", { y:-100,opacity:0, }, { duration: 0.2 });
            await animate("#landing1", { height:0 });
        } else if (newSelected.selected === 2 && newSelected.sens === "haut") {
            await animate("#landing2", { y:-100,opacity:0, }, { duration: 0.2 });
            await animate("#landing2", { height:0, }, { duration: 0.2 });

        } else if (newSelected.selected === 3 && newSelected.sens === "haut") {
            await animate("#landing3", { y:-100,opacity:0, }, { duration: 0.2 });
            await animate("#landing3", { height:0, }, { duration: 0.2 });
        } else if (newSelected.selected === 2 && newSelected.sens === "bas") {
            await animate("#landing3", { height:'100vh', }, { duration: 0.2 });
            await animate("#landing3", {y:0,opacity:1, }, { duration: 0.2 });
        }else if(newSelected.selected === 1 && newSelected.sens === "bas") {
            await animate("#landing2", { height:'100vh', }, { duration: 0.2 });
            await animate("#landing2", {y:0,opacity:1, }, { duration: 0.2 });
        }
    }




    useEffect(() => {
        if(userInfo.isAuthenticated){
            navigate("/dashboard/note")
        }

    }, []);
    return (
        <div className={`w-full ${bgColor} overflow-x-hidden min-h-screen`}>
            <motion.div initial={{x: 500}} animate={{x: 0}}
                        transition={{type: "spring", stiffness: 100, damping: 25, duration: 2}}
                        className={`w-12 h-12 bg-${colortheme}-500 opacity-100 rounded-full absolute top-2 left-40`}></motion.div>
            <Navlanding/>

            <Contentlanding scope={scope}/>
            <Footerlanding selected={selected} setSelected={setSelected} animation={animation}/>

        </div>
    );

}

export default LandingLayout;
