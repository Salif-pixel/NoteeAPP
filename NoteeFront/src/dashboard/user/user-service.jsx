import React, { useContext } from 'react';

import axios from 'axios';
import { url } from '../../../env';
import { toast } from 'react-hot-toast';

export const getuser = async (data) => {

    const res = await axios.post(url + "/users", data, {
        headers: {
            'Authorization': `Bearer ${data.token.access_token}`
        }

    });

    return res.data;

}

export const getcurrentuser = async (data) => {

    const res = await axios.get(url + "/auth", {
        headers: {
            'Authorization': `Bearer ${data.token.access_token}`
        }
    });
    return res.data;

}

export const createuser = async (data) => {
    const token = JSON.parse(localStorage.getItem('auth'));
    const res = axios.post(url + "/auth/register", data, {
        headers: {
            'Authorization': `Bearer ${token.token.access_token}`
        }
    });
    toast.promise(res, {
        loading: "ajout en cours...",
        success: "ajout effectuée avec succes !",
        error: "Une erreur est survenue !"
      });
    return res.data;
}

export const deleteuser = async (data) => {
    const token = JSON.parse(localStorage.getItem('auth'));
    const res = axios.delete(url + "/users/delete/" + data.email, {
        headers: {
            'Authorization': `Bearer ${token.token.access_token}`
        }
    });
    toast.promise(res, {
        loading: "suppression en cours...",
        success: "suppression effectuée avec succes !",
        error: "Une erreur est survenue !"
      });
    return res.data;
}
export const updateuser = async (data, Email) => {
    const token = JSON.parse(localStorage.getItem('auth'));
    data.Online = data.Online === "true" || data.Online===true ? true : false;

    const res = axios.put(url + "/users/update/" + Email, data, {
        headers: {
            'Authorization': `Bearer ${token.token.access_token}`
        }
    });
    toast.promise(res, {
        loading: "modification en cours...",
        success: "modification effectuée avec succes !",
        error: "Une erreur est survenue !"
      });
    
    
   
    return res.data;
}

