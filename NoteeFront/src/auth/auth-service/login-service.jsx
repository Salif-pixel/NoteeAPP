import React from 'react';

import axios from 'axios';
import { url } from '../../../env';
import {toast} from 'react-hot-toast';


export   const authentification = async (data) => {
    const auth = axios.post(url+"/auth/login", data);
    toast.promise(auth, {
        loading: "connexion en cours...",
        success: "connexion effectuée avec success !",
        error: "Une erreur est survenue !"
      });
    return auth;
  }
 
  

  export const desconnect = async (data) => {

    const res = axios.get(url + "/auth/logout", {
        headers: {
            'Authorization': `Bearer ${data.token.access_token}`
        }
        
    });

    return res.data;

}
