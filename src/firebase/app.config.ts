import { initializeApp } from "firebase/app";

const ENV = import.meta.env

const firebaseConfig = {
  apiKey: ENV.VITE_APIKEY,
  authDomain: ENV.VITE_AUTHDOMAIN,
  projectId: ENV.VITE_PROJECTID,
  storageBucket: ENV.VITE_STORAGEBUCKET,
  messagingSenderId: ENV.VITE_MESSAGINGSENDERID,
  appId: ENV.VITE_APPID
};

export const app = initializeApp(firebaseConfig);