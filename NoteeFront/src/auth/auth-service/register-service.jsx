import React from 'react';

import axios from 'axios';
import { url } from '../../../env';
import {toast} from 'react-hot-toast';

export const createuser = async (data) => {
    const res = axios.post(url + "/auth/register", data, );
    toast.promise(res, {
        loading: "ajout en cours...",
        success: "ajout effectuée avec success !",
        error: "Une erreur est survenue !"
      });
    return res.data;
}
