import React from 'react';

import axios from 'axios';
import { url } from '../../../../env.jsx';
import {toast} from 'react-hot-toast';


export   const NotesList = async (data) => {
    const note = axios.post(url+"/note/all", data);


    return note;
}


export const createnote = async (data) => {
    const token = JSON.parse(localStorage.getItem('auth'));

        const res = axios.post(url + "/note", data, {
            headers: {
                'Authorization': `Bearer ${token.token.access_token}`
            }
        });
        toast.promise(res, {
            loading: "ajout en cours...",
            success: "ajout effectuée avec success !",
            error: "Une erreur est survenue !"
        });

    return res;
}

export const Updatenote = async (id,data) => {
    const token = JSON.parse(localStorage.getItem('auth'));

    const res = axios.put(url + "/note/"+id, data, {
        headers: {
            'Authorization': `Bearer ${token.token.access_token}`
        }
    });
    toast.promise(res, {
        loading: "modification en cours...",
        success: "modification effectuée avec success !",
        error: "Une erreur est survenue !"
    });
    return res;
}
export const Deletenote = async (id) => {
    const token = JSON.parse(localStorage.getItem('auth'));
    const res = axios.delete(url + "/note/"+id,  {
        headers: {
            'Authorization': `Bearer ${token.token.access_token}`
        }
    });
    toast.promise(res, {
        loading: "suppression en cours...",
        success: "suppression effectuée avec success !",
        error: "Une erreur est survenue !"
    });
    return res;
}

