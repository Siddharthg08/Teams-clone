import firebase from "firebase/app";
import "firebase/auth";

export const auth = firebase.initializeApp ({
    apiKey: "AIzaSyBAv2j7RvZTK20ohaeZmDq4TbPiW6v8xR8",
    authDomain: "video-conference-c2908.firebaseapp.com",
    projectId: "video-conference-c2908",
    storageBucket: "video-conference-c2908.appspot.com",
    messagingSenderId: "1099140431947",
    appId: "1:1099140431947:web:f0ef84403d09a52ce84dce",
    measurementId: "G-7MFFQ16L4X"
  }).auth();

  //project-1099140431947