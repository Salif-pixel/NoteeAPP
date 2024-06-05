import logo from "../../assets/sapiens.svg";
import {useNavigate} from "react-router-dom";
import React, {useContext} from "react";
import {ColorthemeNotee, theme} from "../../App.jsx";
import sun from "../../assets/sun.svg";
import moon from "../../assets/moon.svg";
function Navlanding(){
    const navigate = useNavigate();
    const { toggle,setToggle } = useContext(theme);
    const {colortheme} = useContext(ColorthemeNotee)
    const bgColor = toggle === 'light' ? 'bg-white' : 'bg-bigdark';
    const bgBorder = toggle === 'light' ? 'border-gray-200' : 'border-bigdark';
    return (
        <div className={`backdrop-blur-lg`}>
            <nav className={` relative px-4 py-4 flex justify-between items-center  border-b ${bgBorder}`}>
                    <img src={toggle === "light" ? sun : moon}
                         className={`App-logo ${bgColor}   m-2 cursor-pointer   rounded-lg`}
                         alt="viteLogo" onClick={() => {
                        setToggle(toggle === "light" ? "dark" : "light");
                        localStorage.setItem("theme", toggle === "light" ? "dark" : "light");
                    }}/>
                <div>
                    <a onClick={() => navigate("/auth/login")}
                       className={`inline-block ml-auto mr-3 py-3 px-6 bg-${colortheme}-500 hover:bg-${colortheme}-600 text-sm text-white font-bold  rounded-xl transition duration-200`}
                       href="#">Connexion</a>
                </div>
            </nav>
        </div>
    );
}

export default Navlanding;
