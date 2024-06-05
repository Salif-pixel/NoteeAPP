import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {AuthContext, ColorthemeNotee, theme} from '../../../App';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { imageDb } from '../../../dashboard/user/firebaseImage/config';
import { v4 } from 'uuid';
import edit from '../../../assets/edit.png';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { count } from 'firebase/firestore';
import { updateuser } from '../../../dashboard/user/user-service';

function InfoCard({ user, back, setuser }) {
  const { toggle } = useContext(theme);
  const bgColor = toggle === 'light' ? 'bg-white' : 'bg-customdark';
  const bgInput = toggle === 'light' ? 'bg-gray-50' : 'bg-bigdark';
  const textColor = toggle === 'light' ? 'gray-700' : 'gray-500';
  const outline = toggle === 'light' ? 'gray-50' : 'gray-500';
  const { userInfo, setUserInfo } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [base64Image, setBase64Image] = useState(user.Background);
  const [img, setImg] = useState({ file: null, count: 0 });
  const [img2, setImg2] = useState({ file: null, count: 0 });
  const [base64profil, setBase64profil] = useState(user.Profil);
  const {colortheme}=useContext(ColorthemeNotee);
  useEffect(() => {
    const userData = user;
    setValue("firstName", userData.firstName);
    setValue("email", userData.email);
    setValue("Datenaissance", userData.Datenaissance);
    setValue("role", userData.role);
    setValue("Profil", base64profil);
    setValue("propos",userData.propos)
    setValue("Background", base64Image);
    setValue("Online", userData.Online===true?"true":"false");
  });


  const Upload = async () => {
    try {
      const imgRef = ref(imageDb, `images/${v4()}`);

      const snapshot = await uploadBytes(imgRef, img.file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      setBase64Image(downloadURL);

      return downloadURL; // Retourne l'URL de téléchargement de l'image
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'image dans Firebase Storage :", error);
      throw error; // Rejette l'erreur pour la gérer à l'extérieur de la fonction Upload
    }
  };


  const Uploadprofil = async () => {
    try {
      const imgRef = ref(imageDb, `profiles/${v4()}`);

      const snapshot = await uploadBytes(imgRef, img2.file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      setBase64profil(downloadURL);

      return downloadURL; // Retourne l'URL de téléchargement de l'image
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'image dans Firebase Storage :", error);
      throw error; // Rejette l'erreur pour la gérer à l'extérieur de la fonction Upload
    }
  };
  return (

    <div className={`${bgColor}  h-full w-full min-w-screen-xl m-0 sm:m-10  shadow sm:rounded-lg flex justify-center flex-1 rounded shadow-lg  p-4 md:p-8 `}>


      <div className="flex w-3/4 ml-5 mt-10 ">
        <div className="w-full">
          <h1 className={`text-center text-xl font-medium text-${textColor}`}>Details Personnel</h1>
          <div className="md:col-span-5">
            <label className={`mb-2 text-${textColor}`} htmlFor="full_name">Nom prenom</label>
            <input type="text" name="full_name" id="full_name" className={`${bgInput} border-${outline} text-${textColor} text-${textColor} mb-2 outline-none h-10 border mt-1 rounded px-4 w-full`} {...register('firstName', { required: true })} />
            {errors.firstName &&
              <p className=' text-xs text-red-700 font-medium block'>Le prenom est obligatoire</p>}
          </div>

          <div className="md:col-span-5">
            <label className={`text-${textColor} mb-2`} htmlFor="email">Addresse mail</label>
            <input type="email" name="email" id="email" className={`${bgInput} border-${outline} text-${textColor} mb-2 outline-none h-10 border mt-1 rounded px-4 w-full`} {...register('email', { required: true })} placeholder="email@domain.com" />
            {errors.email &&
              <p className=' text-xs text-red-700 font-medium block'>L'adresse mail est obligatoire</p>}
          </div>

          <div className="md:col-span-3">
            <label className={`text-${textColor} mb-2`} htmlFor="address">Date de naissance</label>
            <input type="date" name="address" id="address" className={`${bgInput} border-${outline} text-${textColor} mb-2 outline-none h-10 border mt-1 rounded px-4 w-full`} {...register('Datenaissance', { required: true })} placeholder="" />
            {errors.Datenaissance &&
              <p className=' text-xs text-red-700 font-medium block'>La date de naissance est obligatoire</p>}
          </div>

          <div className="md:col-span-2">
            <label className={`text-${textColor} mb-2`} htmlFor="role">role</label>
            <input type="text" name="role" id="role" className={`${bgInput} border-${outline} text-${textColor} mb-2 outline-none h-10 border border-${outline} mt-1 rounded px-4 w-full`} {...register('role', { required: true })} placeholder="" readOnly />
          </div>
          <div className="md:col-span-2">
            <label className={`text-${textColor} mb-2`} htmlFor="role">Statut</label>
            <input type="text" name="role" id="role" className={`${bgInput} border-${outline} text-${textColor} mb-2 outline-none h-10 border border-${outline} mt-1 rounded px-4 w-full`} {...register('Online', { required: true })} placeholder="" readOnly />
          </div>

          <div className="md:col-span-2">
            <label className={`text-${textColor} mb-2`} htmlFor="profil">photo de profil</label>
            <div className={`h-10 ${bgInput} border-${outline} text-${textColor} flex mb-2 border border-gray-200 rounded items-center mt-1`}>
              <input
                className="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded bg-transparent bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-surface transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:me-3 file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-e file:border-solid file:border-inherit file:bg-transparent file:px-3  file:py-[0.32rem] file:text-surface focus:border-primary focus:text-gray-700 focus:shadow-inset focus:outline-none dark:border-white/70 dark:text-white  file:dark:text-white"
                type="file"
                id="formFile" onChange={(e) => setImg2({ file: e.target.files[0], count: 1 })} />
            </div>
            <input type="text" className='hidden' value={base64profil} {...register('Profil')} />
          </div>

          <div className="md:col-span-2">
            <label className={`text-${textColor} mb-2`} htmlFor="background">image de fond</label>
            <div className={`h-10 ${bgInput} border-${outline} text-${textColor} mb-2 flex border border-gray-200 rounded items-center mt-1`}>
              <input
                className="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded bg-transparent bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-surface transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:me-3 file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-e file:border-solid file:border-inherit file:bg-transparent file:px-3  file:py-[0.32rem] file:text-surface focus:border-primary focus:text-gray-700 focus:shadow-inset focus:outline-none dark:border-white/70 dark:text-white  file:dark:text-white"
                type="file"
                id="formFile" onChange={(e) => setImg({ file: e.target.files[0], count: 1 })} />
            </div>
          </div>
          <input type="text" className='hidden' value={base64Image} {...register('Background')} />
          <div className="md:col-span-2">
            <label className={`text-${textColor} mb-2`} htmlFor="role">A propos</label>
            <textarea type="text" name="propos" id="propos"  className={`${bgInput} h-96 max-h-96 border-${outline} text-${textColor} mb-2 outline-none h-10 border border-${outline} mt-1 rounded px-4 w-full`} {...register('propos', { required: true })} placeholder=""  />
          </div>


          <div className="md:col-span-5 mt-5 flex justify-between text-right">

            <button onClick={() => back()} className={`bg-${colortheme}-500  hover:bg-${colortheme}-700 text-white font-bold py-2 px-4 rounded`}>Retour</button>
            <button onClick={handleSubmit(async (data) => {
              if (img.count != 0) { const url = await Upload(); data.Background = url; }
              if (img2.count != 0) { const url = await Uploadprofil(); data.Profil = url; }


              await updateuser(data, user.email).then(() => {
                setuser(data);
                const tosave = {
                  isAuthenticated: userInfo.isAuthenticated,
                  token: userInfo.token,
                  email: data.email,
                };
                localStorage.setItem("auth", JSON.stringify(tosave));
                setUserInfo(tosave);
              })

            })} className={`bg-${colortheme}-500 hover:bg-${colortheme}-700 text-white font-bold py-2 px-4 rounded`}>Valider</button>

          </div>
          
        </div>
      </div>
      <div className=" text-gray-600 relative top-0 mb-30  hidden lg:flex xl:m-16 w-1/2 bg-contain bg-center bg-no-repeat">
        <p className={`text-${textColor}`}>vous pouvez modifier vos données en toute sécurité</p>
        <img className='absolute mt-20' src="https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg" alt="edit" />

      </div>

    </div>

  );
}

export default InfoCard;
















