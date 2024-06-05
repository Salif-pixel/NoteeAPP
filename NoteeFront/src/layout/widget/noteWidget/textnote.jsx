import {ChatBubbleBottomCenterIcon, TrashIcon,ClipboardDocumentCheckIcon,ChevronLeftIcon} from "@heroicons/react/24/solid/index.js";
import {motion} from "framer-motion";
import React, {useContext, useEffect, useRef, useState} from "react";
import {theme} from "../../../App.jsx";
import Editor from "../../Editor/editor.jsx";
import {Button} from "@material-tailwind/react";
import {Bars3BottomLeftIcon, Bars3BottomRightIcon, ChevronRightIcon} from "@heroicons/react/16/solid/index.js";






function TextNote({active,targetRef,user,setOpen,name,setDataexternal,animation,clicknote,animaty,setClicknote, clickcategorie,setClickcategorie, dataexternal}) {
    const { toggle } = useContext(theme);
    const [reset, setReset] = useState(true);
    // Initial Data
    const INITIAL_DATA = {
        time: new Date().getTime(),
        blocks: [
            {
                type: "paragraph",
                data: {
                    text: "bonjour c'est parti",
                    level: 1,
                },
            },
        ],
    };


        const [data, setData] = useState(JSON.parse(active.note.content));

    useEffect(() => {
        setData(JSON.parse(active.note.content));

        setDataexternal(data);
    }, []);


    return (
        <div className={`w-full h-[calc(100vh)]  `}>


            <Editor data={data} name={name} onChange={setData} active={active} targetRef={targetRef}
                    onchangetoo={setDataexternal} resetEditor={setReset}
                    editorblock="editorjs-container"/>


        </div>
    );
}

export default TextNote;
