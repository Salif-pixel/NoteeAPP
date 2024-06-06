import React, {memo, useContext, useEffect, useRef} from "react";
import EditorJS from "@editorjs/editorjs";
import {EDITOR_JS_TOOLS} from "./tools.js";
import {theme} from "../../App.jsx";
import {ref, uploadBytesResumable, getDownloadURL, uploadBytes} from "firebase/storage";
import {imageDb} from "../../dashboard/user/firebaseImage/config";
import {v4} from "uuid";
import {ChatBubbleBottomCenterIcon} from "@heroicons/react/24/solid/index.js";
import {motion} from "framer-motion";
import {Document, Page, View} from "@react-pdf/renderer"; // Remplacez par le chemin vers votre configuration Firebase

const Editor = ({ data,targetRef, onChange,name, editorblock,active,onchangetoo }) => {
    const ref = useRef();
    const { toggle } = useContext(theme);
    const TextColor2 = toggle === 'light' ? 'black' : 'gray-300';
    const categorieColor = toggle === 'light' ? `${active.note.category.color}-900` : 'white';
    const categorieColor2 = toggle === 'light' ? '500/20' : '500';
    name(active.note.title.replace(/ /g, "_"));
    //Initialize editorjs
    useEffect(() => {
        if (!ref.current) {
            const editor = new EditorJS({
                holder: editorblock,
                tools: {
                    ...EDITOR_JS_TOOLS,

                },
                data: data,
                onChange: async (api, event) => {
                    const data = await api.saver.save();
                    onchangetoo(data);
                    onChange(data);
                },
            });
            ref.current = editor;
        }

        //Add a return function to handle cleanup
        return () => {
            if (ref.current && ref.current.destroy) {
                ref.current.destroy();
            }
        };
    }, []);
    return <div className={`w-full flex justify-center`}>
        <div ref={targetRef} className={`flex flex-col  w-full `}>

            <div className={`flex flex-col items-center  `}>
                <div
                    className={`relative grid mt-2 mb-2 items-center w-fit  h-10   px-2 py-1 font-sans  font-sans text-${categorieColor}  rounded-lg select-none whitespace-nowrap bg-${active.note.category.color}-${categorieColor2}`}>
                    <div className="flex  flex-row"><ChatBubbleBottomCenterIcon
                        className={`w-4 mr-2`}/> {active.note.category.name}
                    </div>
                </div>

                <h1 className={`text-${TextColor2} text-4xl font-sans break-after-auto  text-center mt-2 mb-4`}>{active.note.title}</h1>
                <motion.div initial={{width: 0}} animate={{width: 500}} transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 25,
                    delay: 0.8,

                }} className={`mx-auto h-1 w-24 bg-${TextColor2} rounded-lg`}></motion.div>
            </div>
            <div
                className={`   text-${TextColor2}  rounded-lg overflow-x-hidden mt-10 p-2 mr-5 ml-5 w-auto break-words`}
                id={editorblock} style={{ pageBreakInside: 'avoid' }}>

            </div>

        </div>
    </div>


};

export default memo(Editor);