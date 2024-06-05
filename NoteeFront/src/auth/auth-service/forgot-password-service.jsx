import React from 'react';

import axios from 'axios';
import { url } from '../../../env';
import {toast} from 'react-hot-toast';


export   const ForgotPasswordRequest = async (data) => {
    const auth = axios.post(url+"/auth/request-reset-password", data);
    toast.promise(auth, {
        loading: "transfert d'email en cours...",
        success: "transfert d'email effectuée avec success !",
        error: "Une erreur est survenue !"
      });
    return auth;
  }
 
  

