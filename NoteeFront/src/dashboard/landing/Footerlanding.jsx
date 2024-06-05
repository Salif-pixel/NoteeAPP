import {useContext, useEffect} from "react";
import {ColorthemeNotee, theme} from "../../App.jsx";

function Footerlanding({ animation, selected, setSelected }) {
    const { toggle } = useContext(theme);
    const {colortheme} = useContext(ColorthemeNotee)
    const textColor = toggle === 'light' ? 'text-gray-500' : 'text-gray-400';
    const bgColor = toggle === 'light' ? 'bg-white' : 'bg-bigdark';

    const handleDecrement = () => {
        if (selected.selected > 0) {
            const newSelected = { selected: selected.selected - 1, sens: "bas" };
            setSelected(newSelected);
            animation(newSelected)
        }
    };

    const handleIncrement = () => {
        if (selected.selected < 3) {
            const newSelected = { selected: selected.selected + 1, sens: "haut" };
            setSelected(newSelected);
            animation(newSelected)
        }
    };


    return (
        <footer className={`${bgColor} fixed bottom-0 left-0  right-0 shadow flex justify-center items-center py-6`}>
            <span className="text-sm text-gray-500 text-center dark:text-gray-400">© 2024 Notee. Tous droits reservés.</span>
            <div className={`flex ml-2 w-14 h-5 justify-between`}>
                <svg onClick={handleDecrement} className={`${textColor} cursor-pointer hover:text-${colortheme}-500`} data-slot="icon" aria-hidden="true" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="m19.5 8.25-7.5 7.5-7.5-7.5" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
                <svg onClick={handleIncrement} className={`${textColor} cursor-pointer hover:text-${colortheme}-500`} data-slot="icon" aria-hidden="true" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="m4.5 15.75 7.5-7.5 7.5 7.5" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
            </div>
        </footer>
    );
}

export default Footerlanding;
