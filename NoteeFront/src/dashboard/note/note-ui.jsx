import React, {useContext, useEffect, useState} from 'react';
import {theme} from "../../App.jsx";
import {Button, Card, CardHeader, Dialog, DialogHeader, Input, Typography} from "@material-tailwind/react";
import { PlusIcon, ChatBubbleBottomCenterIcon,TrashIcon,PrinterIcon } from "@heroicons/react/24/solid";
import {MagnifyingGlassIcon} from "@heroicons/react/24/outline/index.js";

import {motion, useAnimate} from "framer-motion";
import NoteCard from "../../layout/widget/noteWidget/cardNote/cardnote.jsx";
import {getcurrentuser} from "../user/user-service.jsx";
import { NotesList} from "./service/note-service.jsx";
import TextNote from "../../layout/widget/noteWidget/textnote.jsx";
import Categorie from "../../layout/widget/noteWidget/cardNote/cardCategorie.jsx";
import Addform from "./noteform/Note/Addform.jsx";
import Updateform from "./noteform/Note/Updateform.jsx";
import {CategoriesList} from "./service/categorie-service.jsx";
import Addformcategorie from "./noteform/Categorie/Addform.jsx";
import SideNote from "../../layout/widget/noteWidget/cardNote/sideNote/sidenote.jsx";
import SideCategorie from "../../layout/widget/noteWidget/cardNote/sideCategorie/sidecategorie.jsx";
import Deleteform from "./noteform/Note/Deleteform.jsx";
import {Bars3BottomLeftIcon, Bars3BottomRightIcon} from "@heroicons/react/16/solid/index.js";
import {ClipboardDocumentCheckIcon} from "@heroicons/react/24/solid/index.js";
import UpdateformCategorie from "./noteform/Categorie/Updateform.jsx";
import Deleteformcategorie from "./noteform/Categorie/Deleteform.jsx";
import {MyDocument} from "./PDF.jsx";
import {ActionSettingsEdit} from "../../layout/widget/noteWidget/actionsettingsedit.jsx";
import c from "@editorjs/header";
import {Margin, Resolution, usePDF} from "react-to-pdf";
import {CustomTheme} from "../../layout/widget/theme/theme.jsx";


function Note({user,setuser}) {
    const { toggle, setToggle } = useContext(theme);
    const textColor = toggle === 'light' ? 'menudark' : 'white';
    const bgModal = toggle === 'light' ? 'bg-blue-gray-50' : 'bg-customdark';
    const bgColor = toggle === 'light' ? 'whiteneige' : 'customdark';
    const textColorD = toggle === 'light' ? 'white' : 'black';
    const [listnotes, setListNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [listcategories, setListCategories] = useState([]);
    const [open, setOpen] = useState({ id:"" ,isopen: false, type: 'create',userid:user.id,categorielist: listcategories});
    const [open2, setOpen2] = useState({ id:"" ,isopen: false, type: 'create',userid:user.id,categorielist: listcategories})
    const [active, setActive] = useState({id: "id", note: null });
    const [activecategorie, setActivecategorie] = useState({id: "id", categorie: null });
    const [dataexternal, setDataexternal] = useState({});
    const [nom,name]=useState("notee");
    const handleOpen = () => setOpen({ isopen: !open.isopen, type: open.type, userid: open.userid,categorielist: open.categorielist });
    const handleOpen2 = () => setOpen2({ isopen: !open2.isopen, type: open2.type, userid: open2.userid,categorielist: open2.categorielist });
    const { toPDF, targetRef } = usePDF({filename: `${nom}.pdf`, page: { margin: Margin.MEDIUM,format: "letter",orientation: "portrait", }, method: "save", resolution: Resolution.MEDIUM,overrides: {pdf: {compress: true}},});
    useEffect(() => {
        const getListCategorie=  async () =>{
            const userData = { userId: user.id };
            const categories  = await CategoriesList(userData);
            setListCategories(categories.data);
            setLoading(false);
        }
        const getListNotes=  async () =>{
            getListCategorie();
            const userData = { userId: user.id };
            const notes  = await NotesList(userData);
            setListNotes(notes.data);
            if(notes.data.length>0)
            setActive({id: notes.data[0].id, note: notes.data[0]});
            setLoading(false);
        }
        getListNotes();
    }, []);
    const [scopy,animaty]=useAnimate();
    const [scopo,animato]=useAnimate();
    const [themescope,animatetheme]=useAnimate();
    const [clicknote, setClicknote] = useState(true);
    const [clickcategorie, setClickcategorie] = useState(true);
    const [opentheme, setOpentheme] = useState(true);
    const animationscope = async () => {

            if(clicknote){

                await animaty('#note', {width: 300});

            }else{

                await animaty('#note', {width: 0});

            }

    }
    const animationscopy = async () => {

        if(clickcategorie){

            await animato('#categorie', {width: 300});

        }else{

            await animato('#categorie', {width: 0});

        }

    }
    const animationtheme = async () => {

        if(opentheme){


            await animato('#categorie', {width: 0});
            await animaty('#note', {width: 0});
            await animatetheme('#content', {width: 0});
            await animatetheme('#griditem', {scale:0.8,x:-500,opacity:0});
            await animatetheme('#theme', {width: '100vw'});
            await animatetheme('#griditem', {opacity:1,x:0});
            setClicknote(true);
            setClickcategorie(true);


        }else{
            await animatetheme('#griditem', {opacity:0});
            await animatetheme('#theme', {width: 0});
            await animatetheme('#griditem', {scale:0},{duration: 0.5});
            await animatetheme('#content', {width: '100vw'});

        }

    }


    return (
        <div ref={themescope} className={` flex flex-row w-full overflow-hidden h-[calc(100vh)]`}>

            <SideNote  listcategories={listcategories} scope={scopy} setClicknote={setClicknote} clicknote={clicknote}
                      animation={animationscope} active={active} user={user} loading={loading} setActive={setActive}
                      listnotes={listnotes} listcategories={listcategories} open={open} setOpen={setOpen}/>


            <div id={`content`} className={`  h-[calc(100vh)] overflow-x-hidden    w-full lg:block  bg-${bgColor}`}>
                <motion.div initial={{scale: 1, y: 10, opacity: 0}} animate={{y: 0, opacity: 1}}
                            transition={{
                                type: "spring",
                                stiffness: 500,
                                damping: 25,
                                delay: 0.2,
                            }}
                            className={`flex  justify-end mb-2 min-w-screen    flex-row`}>
                    <ActionSettingsEdit toPDF={toPDF} opentheme={opentheme} setOpentheme={setOpentheme} animationtheme={animationtheme} targetRef={targetRef} animationscope={animationscope} user={user}
                                        active={active} animationscopy={animationscopy} clicknote={clicknote}
                                        setClicknote={setClicknote} clickcategorie={clickcategorie}
                                        setClickcategorie={setClickcategorie} setOpen={setOpen}/>

                </motion.div>
                {!loading && active.note != null && (
                    <div>
                        {listnotes
                            .filter(elem => elem.id === active.note.id)
                            .map((note, index) => (
                                <TextNote
                                    key={`${note.id}-${index}`}
                                    user={user}
                                    dataexternal={dataexternal}
                                    setDataexternal={setDataexternal}
                                    active={active}
                                    setOpen={setOpen}
                                    setuser={setuser}
                                    clicknote={clicknote}
                                    setClicknote={setClicknote}
                                    clickcategorie={clickcategorie}
                                    setClickcategorie={setClickcategorie}
                                    animation={animationscope}
                                    animaty={animationscopy}
                                    targetRef={targetRef}
                                    name={name}
                                />
                            ))

                        }

                    </div>
                )}
            </div>
            <SideCategorie scope={scopo} open2={open2} setOpen2={setOpen2} animaty={animationscopy}
                           clickcategorie={clickcategorie}
                           setClickcategorie={setClickcategorie} active={active} user={user} loading={loading}
                           setActive={setActive} listnotes={listnotes} listcategories={listcategories} open2={open2}
                           setOpen2={setOpen2} activecategorie={activecategorie}
                           setActivecategorie={setActivecategorie}/>
           <CustomTheme animationtheme={animationtheme} opentheme={opentheme} setopentheme={setOpentheme}/>
            <Dialog className={`${bgModal} rounded-lg`} size={'xs'} open={open.isopen} handler={handleOpen}>
                <DialogHeader className="flex flex-col items-center">
                    {" "}
                    <Typography className={`mb-1 text-center text-${textColor}`} variant="h4">
                        {open.type === "create" ? "Ajouter" : open.type === "update" ? "Modifier" : "Supprimer"} une
                        note
                    </Typography>
                </DialogHeader>
                {open.type === "create" &&
                    <Addform setCategoriesList={setListCategories} setListNotes={setListNotes} listnotes={listnotes}
                             open={open} setOpen={setOpen}/>}
                {open.type === "update" &&
                    <Updateform active={active} setActive={setActive} note={active.note} data={dataexternal}
                                setCategoriesList={setListCategories}
                                listcategories={listcategories} setListnotes={setListNotes} listnotes={listnotes}
                                open={open} setOpen={setOpen}/>}
                {open.type === "delete" && <Deleteform setActive={setActive} listcategories={listcategories}
                                                       setCategoriesList={setListCategories} active={active}
                                                       SetListNotes={setListNotes} listnotes={listnotes} open={open}
                                                       setOpen={setOpen}/>}
            </Dialog>
            <Dialog className={`${bgModal} rounded-lg`} size={'xs'} open={open2.isopen} handler={handleOpen2}>
                <DialogHeader className="flex flex-col items-center">
                    {" "}
                    <Typography className={`mb-1 text-center text-${textColor}`} variant="h4">
                        {open2.type === "create2" ? "Ajouter" : open2.type === "update2" ? "Modifier" : "Supprimer"} une
                        categorie
                    </Typography>
                </DialogHeader>
                {open2.type === "create2" &&
                    <Addformcategorie setCategoriesList={setListCategories} listcategories={listcategories} open={open2}
                                      setOpen={setOpen2}/>}
                {open2.type === "update2" &&
                    <UpdateformCategorie active={active} setACtive={setActive} user={user}
                                         categorie={activecategorie.categorie} setActivecategorie={setActivecategorie}
                                         activecategorie={activecategorie} setListnotes={setListNotes}
                                         data={dataexternal} listnotes={listnotes} open={open2}
                                         setOpen2={setOpen2} setCategoriesList={setListCategories}
                                         listcategories={listcategories}/>}
                {open2.type === "delete" &&
                    <Deleteformcategorie setActivecategorie={setActivecategorie} listcategories={listcategories}
                                         setCategoriesList={setListCategories} activecategorie={activecategorie}
                                         SetListNotes={setListNotes}
                                         setOpen2={setOpen2}/>}
            </Dialog>
        </div>
    );
}

export default Note;