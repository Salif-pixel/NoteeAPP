import {
    MagnifyingGlassIcon,
    ChevronUpDownIcon,
    TrashIcon,
} from "@heroicons/react/24/outline";
import { UserPlusIcon, PencilIcon } from "@heroicons/react/24/solid";
import {
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    CardBody,
    Chip,
    CardFooter,
    Tabs,
    TabsHeader,
    Tab,
    Avatar,
    IconButton,
    Tooltip,
    DialogHeader,
    Dialog,
    Menu,


} from "@material-tailwind/react";
import { Checkbox } from "@material-tailwind/react";
import {AuthContext, ColorthemeNotee, theme} from "../../App";
import { useContext, useEffect, useState } from "react";
import { getuser } from "../../dashboard/user/user-service";
import { set } from "react-hook-form";
import { motion } from "framer-motion";
import AddForm from "../../dashboard/user/userform/Addform";
import UpdateForm from "../../dashboard/user/userform/updateform";
import DeleteForm from "../../dashboard/user/userform/deleteform";
import CardProfil from "./cardprofil/cardprofil";
import userprofil from "../../assets/user.webp"
import {
    HiMiniSignal, HiMiniSignalSlash

} from 'react-icons/hi2';
import {
    UserOutlined, LogoutOutlined, AppstoreOutlined, MenuFoldOutlined, OrderedListOutlined

} from '@ant-design/icons';
import { ActionMenu } from "./actionMenu";
import { WebSocketUrl } from "../../../env";
import { Socket,io } from "socket.io-client";
import toast from "react-hot-toast";
import User from "../../dashboard/user/user-ui";
import Checklist from "@editorjs/checklist";

const TABLE_HEAD = ["", "Noms", "Email", "Role", "date naissance", "en ligne", "actions"];

export function Table({ currentuser, setcurrentuser }) {

    const checkedList = [];

    const [open, setOpen] = useState({ isopen: false, type: 'create', email: '' });
    const shuffleStored = localStorage.getItem("shuffle");
    const shuffleValue = shuffleStored === "true" ? true : false;
    const [shuffle, setShuffle] = useState(shuffleValue);
    const createdSocket = io(WebSocketUrl);
    const handleOpen = () => setOpen({ isopen: !open.isopen, type: open.type, email: open.email });
    const [Users, setUsers] = useState(null);
    const [loading, setLoading] = useState(true);
    const [inputValue, setInputValue] = useState('');
    const {colortheme}=useContext(ColorthemeNotee);
    const HandleInputChange = (event) => {
        setInputValue(event.target.value);
    }
    const { userInfo } = useContext(AuthContext);
    const [fetched, setFetched] = useState(false);

    useEffect(() => {
        const fetchData = async (data) => {
            const fetchedUsers = await getuser(data);
            setUsers(fetchedUsers);
            setLoading(false);
            setFetched(true);
        };
    
        if (!fetched) {
            fetchData(userInfo);
        }
    
        createdSocket.on("user-connected",(data)=>{
            
            if(Users!==null){
                
                 setUsers(data);
            }
        });
        createdSocket.on("user-disconnected",(data)=>{
            
            if(Users!==null){
                
                 setUsers(data);
            }
        });
        createdSocket.on("send-user-update",(data)=>{
            if (Users !== null) {

                const userIndex = Users.findIndex(user => user.id === data.id);

                if (userIndex !== -1) {
                    const updatedUsers = [...Users];
                    updatedUsers[userIndex] = data;
                    setUsers(updatedUsers);
                }
            }

        })
    }, [userInfo, fetched,Users]);
    const { toggle, setToggle } = useContext(theme);
    const [checked, setchecked] = useState(false);
    const bgColor = toggle === 'light' ? 'bg-blue-gray-50' : 'bg-customdark';
    const Color = toggle === 'dark' ? 'black' : 'blue-gray-200';
    const textColor = toggle === 'light' ? 'menudark' : 'white';
    const textColorD = toggle === 'light' ? 'white' : 'black';
    const inputColor = toggle === 'light' ? 'black' : 'white';
    const borderColor = toggle === 'light' ? 'bg-menudark' : 'bg-white';
    const bgtable = toggle === 'light' ? 'bg-white' : 'bg-bigdark';
    const bgModal = toggle === 'light' ? 'bg-blue-gray-50' : 'bg-customdark';
    const hovertable = toggle === 'light' ? 'bg-gray-100' : 'bg-linedark';
    const selected = ` flex items-center text-${textColorD} gap-3 bg-${textColor} bg-${colortheme}-500`;
    const unselected = ` flex items-center text-${textColorD} gap-3 bg-${textColor} `;
    const [currentIndex, setCurrentIndex] = useState(0);
    const animateNext = () => {
        setCurrentIndex(prevIndex => prevIndex + 1);
    };
    return (
        <motion.div className={`${bgColor} h-full  w-full rounded-none`}>
            {(!loading && Users !== null) && <Card className={`${bgColor} shadow-none h-full w-full rounded-none`}>
                <CardHeader floated={false} shadow={false} className={`p-0 mb-2 rounded-none ${bgColor}`}>
                    <motion.div initial={{ y: 200 }} animate={{ y: 0 }} transition={{
                        type: "spring",
                        stiffness: 100,
                        damping: 25,
                    }} className={`mb-8 flex items-center justify-between gap-8 ml-14 ${bgColor}`}>
                        <div>
                            <Typography className={`text-${textColor} `} >
                                Liste des utilisateurs
                            </Typography>

                        </div>
                        <div className="flex shrink-0  gap-2 sm:flex-row ">
                            <Button onClick={() => { setShuffle(true);setchecked(false); localStorage.setItem("shuffle", true) }} className={shuffle === true ? selected : unselected} size="sm">
                                <AppstoreOutlined></AppstoreOutlined>
                            </Button>
                            <Button onClick={() => { setShuffle(false); setchecked(false);   localStorage.setItem("shuffle", false) }} className={shuffle === false ? selected : unselected} size="sm">
                                <OrderedListOutlined></OrderedListOutlined>
                            </Button>
                            <Button onClick={() => setOpen({ isopen: true, type: "create", email: "" })} className={`flex items-center w-fit text-${textColorD} gap-3 bg-${textColor}`} size="sm" >
                                <UserPlusIcon strokeWidth={2} className="h-4 w-4" />
                            </Button>
                            {checked&&<Button onClick={() => setOpen({ isopen: true, type: "delete", email: email })} className={`flex items-center w-fit text-${textColorD} gap-3 bg-${textColor}`} size="sm" >
                                <TrashIcon color="red" strokeWidth={2} className="h-4 w-4" />
                            </Button>}

                        </div>
                    </motion.div>
                    <div className={`flex flex-col items-center justify-between gap-4 md:flex-row ${bgColor}`}>
                        <div className="relative flex w-full justify-end   gap-2 ">
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{
                                type: "spring",
                                stiffness: 100,
                                damping: 25,
                                delay: 0.5,
                            }} className="w-full md:w-72 mb-4">
                                <Input
                                    onChange={HandleInputChange}
                                    color={`${inputColor}`}
                                    label="Chercher"
                                    icon={<MagnifyingGlassIcon className="h-5 w-5 " />}
                                />
                            </motion.div>
                        </div>
                    </div>
                </CardHeader>
                <motion.div initial={{ y: 200 }} animate={{ y: 0 }} transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 25,

                }} className={` overflow-auto ml-6 mr-6 ${bgtable} max-h-[calc(100vh-25vh)] rounded-lg`}>
                    {shuffle ? <div className={`grid ${bgColor} flex  grid-cols-1   md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4`}>
                        {Users.filter(element => element.firstName.toLowerCase().includes(inputValue)
                            || element.email.toLowerCase().includes(inputValue.toLowerCase())
                            || element.role.toLowerCase().includes(inputValue.toLowerCase())
                            || element.Datenaissance.toLowerCase().includes(inputValue.toLowerCase())).map((user, index) => (
                                <motion.div key={user.email} className="w-full" initial={{ scale: 0.8, y: 200, opacity: 0 }} animate={
                                    index <= currentIndex
                                        ? { opacity: 1, y: 0 }
                                        : { opacity: 0 }
                                } transition={{
                                    type: "spring",
                                    stiffness: 100,
                                    damping: 25,
                                }}
                                    onAnimationStart={() => {
                                        if (index === currentIndex) {
                                            setTimeout(animateNext, 0.15 * 1000);
                                        }
                                    }}>
                                    <CardProfil user={user} setOpen={setOpen} />
                                </motion.div>

                            ))}
                    </div>
                        : <motion.div className={`w-full `} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{
                            type: "spring",
                            stiffness: 100,
                            damping: 25,
                        }}>
                            <table className={`w-full min-w-max    table-auto text-left`}>
                                <thead className="sticky top-0 z-50">
                                    <tr >
                                        {TABLE_HEAD.map((head, index) => (
                                            <th
                                                key={head}
                                                className={`cursor-pointer hover:bg-${colortheme}-800 text-center  ${borderColor} p-4 transition-colors `}
                                            >
                                                {head !== "" && <Typography
                                                    variant="small"

                                                    color={textColorD}
                                                    className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                                                >
                                                    {head}{" "}
                                                    {index !== TABLE_HEAD.length - 1 && (
                                                        <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                                                    )}
                                                </Typography>
                                                }
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {Users.filter(element => element.firstName.toLowerCase().includes(inputValue)
                                        || element.email.toLowerCase().includes(inputValue.toLowerCase())
                                        || element.role.toLowerCase().includes(inputValue.toLowerCase())
                                        || element.Datenaissance.toLowerCase().includes(inputValue.toLowerCase())).map(
                                            ({ email, firstName, role, Datenaissance, Online, Profil }, index) => {
                                                const isLast = index === Users.numberOfElements - 1;
                                                const classes = isLast
                                                    ? `p-4  hover:${hovertable}`
                                                    : `p-4  border-${Color} hover:${hovertable}`;

                                                return (

                                                    <tr key={email} className="text-center">
                                                        <td>
                                                            <Checkbox onChange={(e) => {
                                                                if (e.target.checked) {
                                                                    setchecked(true);
                                                                    checkedList.push(email);
                                                                }else{
                                                                    checkedList.splice(checkedList.indexOf(email),1);

                                                                    if(Checklist.length===0){
                                                                        console.log(checkedList);
                                                                    setchecked(false);
                                                                    }

                                                                }



                                                            }} />
                                                        </td>
                                                        <td className={`${classes} `}>
                                                            <div className="flex items-center gap-3">

                                                                <Avatar src={Profil === "default" ? userprofil : Profil} alt={firstName} size="sm" />
                                                                <div className="flex flex-col">
                                                                    <Typography
                                                                        variant="small"

                                                                        className={`text-${textColor} font-normal`}
                                                                    >
                                                                        {firstName}
                                                                    </Typography>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className={classes}>
                                                            <div className="flex flex-col">
                                                                <Typography
                                                                    variant="small"

                                                                    className={`text-${textColor} font-normal`}
                                                                >
                                                                    {email}
                                                                </Typography>
                                                            </div>
                                                        </td>
                                                        <td className={classes}>
                                                            <motion.div className="flex  w-50 flex-col">
                                                                <div className="w-max">
                                                                    {
                                                                        role === "ADMIN" ? <div
                                                                            className={`relative grid items-center px-2 py-1 font-sans text-xs font-bold text-${textColor} uppercase rounded-md select-none whitespace-nowrap bg-red-500/30`}>
                                                                            <span className="">Administrateur</span>
                                                                        </div> :
                                                                            <div
                                                                                className={`relative grid items-center px-2 py-1 font-sans text-xs font-bold text-${textColor} uppercase rounded-md select-none whitespace-nowrap bg-${colortheme}-500/20`}>
                                                                                <span className="">Utilisateur</span>
                                                                            </div>
                                                                    }

                                                                </div>
                                                            </motion.div>
                                                        </td>
                                                        <td className={classes}>
                                                            <div className="flex flex-col">
                                                                <Typography
                                                                    variant="small"

                                                                    className={`text-${textColor} font-normal`}
                                                                >
                                                                    {Datenaissance}
                                                                </Typography>
                                                            </div>
                                                        </td>
                                                        <td className={classes}>
                                                            <motion.div className="flex  w-50 flex-col">
                                                                <div className="w-max">
                                                                    {
                                                                        Online === true ? <div
                                                                            className="relative grid items-center px-2 py-1 font-sans text-xs font-bold text-green-900 uppercase rounded-md select-none whitespace-nowrap bg-green-500/20">
                                                                            <span className="">en ligne</span>
                                                                        </div> :
                                                                            <div
                                                                                className="relative grid items-center px-2 py-1 font-sans text-xs font-bold text-gray-500 uppercase rounded-md select-none whitespace-nowrap bg-gray-500/20">
                                                                                <span className="">hors ligne</span>
                                                                            </div>
                                                                    }

                                                                </div>
                                                            </motion.div>
                                                        </td>
                                                        <td className={classes}>
                                                            <ActionMenu setOpen={setOpen} Open={open} email={email} />

                                                        </td>
                                                    </tr>




                                                );
                                            },
                                        )}
                                </tbody>

                            </table>
                        </motion.div>
                    }

                    <Dialog className={`${bgModal} rounded-lg`} size={'xs'} open={open.isopen} handler={handleOpen} >
                        <DialogHeader className="flex flex-col items-center">
                            {" "}
                            <Typography className={`mb-1 text-center text-${textColor}`} variant="h4">
                                {open.type === "create" ? "Ajouter" : open.type === "update" ? "Modifier" : "Supprimer"} un utilisateur
                            </Typography>
                        </DialogHeader>
                        {open.type === "create" && <AddForm setOpen={setOpen} user={Users} />}
                        {open.type === "update" && <UpdateForm open={open} currentuser={currentuser} setcurrentuser={setcurrentuser} setOpen={setOpen} setuser={setUsers} users={Users} user={Users.filter(user => user.email === open.email)} />}
                        {open.type === "delete" && <DeleteForm setOpen={setOpen} setuser={setUsers} users={Users} user={Users.filter(user => user.email === open.email)} />}
                    </Dialog>
                </motion.div>

            </Card>}
        </motion.div>

    );
}