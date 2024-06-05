import axios from "axios";
import {url} from "../../../../env.jsx";
import {toast} from "react-hot-toast";

export   const CategoriesList = async (data) => {
    const note = axios.post(url+"/categorie/all", data);

    return note;
}

export const createcategorie = async (data) => {
    try {
        const token = JSON.parse(localStorage.getItem('auth'));
        const res =  axios.post(url + "/categorie", data, {
            headers: {
                'Authorization': `Bearer ${token.token.access_token}`
            }
        });

        toast.promise(res, {
            loading: "ajout en cours...",
            success: "ajout effectuée avec succès !",
            error: "Une erreur est survenue !"
        });

        return res;
    } catch (error) {

        return "erreur"
    }
}


export const Updatecategorie = async (id,data) => {
    const token = JSON.parse(localStorage.getItem('auth'));
    const res = axios.put(url + "/categorie/"+id, data, {
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

export const Deletecategorie = async (id) => {
    const token = JSON.parse(localStorage.getItem('auth'));
    const res = axios.delete(url + "/categorie/"+id,  {
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

