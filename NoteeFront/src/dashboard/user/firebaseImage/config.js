// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqjx1XYmY_VVQgB6yXz0L1_Ip-IFNd4tU",
  authDomain: "imageupload-b31ae.firebaseapp.com",
  projectId: "imageupload-b31ae",
  storageBucket: "imageupload-b31ae.appspot.com",
  messagingSenderId: "346542753991",
  appId: "1:346542753991:web:b0cb9caab6cf508db056e2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const imageDb=getStorage(app);