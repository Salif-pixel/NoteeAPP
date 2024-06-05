import React from 'react';

import axios from 'axios';
import { url } from '../../../env';
import {toast} from 'react-hot-toast';


export   const ResetPasswordService = async (data) => {
    const auth = axios.post(url+"/auth/reset-password", data);
    toast.promise(auth, {
        loading: "mis a jour mot de passe en cours...",
        success: "mis a jour mot de passe effectuée avec success !",
        error: "Une erreur est survenue !"
      });
    return auth;
  }
 
  

