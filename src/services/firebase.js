import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyD_2gyAUndsFbZ5dam9pMybPXIANcvImCQ",
  authDomain: "training-intern-dangnh.firebaseapp.com",
  projectId: "training-intern-dangnh",
  storageBucket: "gs://training-intern-dangnh.appspot.com",
  messagingSenderId: "459083417943",
  appId: "1:459083417943:web:057b862011672c481b1612",
  measurementId: "G-S865SPVZMG",
};

const app = initializeApp(firebaseConfig);

export default app;
