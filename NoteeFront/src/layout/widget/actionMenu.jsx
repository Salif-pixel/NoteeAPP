import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Button,
} from "@material-tailwind/react";
import { CiMenuKebab } from "react-icons/ci";
export function ActionMenu({ setOpen ,Open,email}) {
    return (
        <Menu>
            <MenuHandler>
                <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 cursor-pointer">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                </svg>

            </MenuHandler>
            <MenuList>
                <MenuItem onClick={() => setOpen({ isopen: true, type: "update", email: email })}>modifier</MenuItem>
                <MenuItem onClick={() => setOpen({ isopen: true, type: "delete", email: email })}>Supprimer</MenuItem>
            </MenuList>
        </Menu>
    );
}