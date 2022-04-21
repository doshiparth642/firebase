//import {initializeApp} from "firebase/app";
import firebase from 'firebase/compat/app';

import "firebase/compat/database";

const firebaseConfig = firebase.initializeApp({
 apiKey: "AIzaSyCZJXdcGoZkDdHGF_TbnCDa7K31u56UfBA",
 authDomain: "react-contact-ca6c4.firebaseapp.com",
 databaseURL: "https://react-contact-ca6c4-default-rtdb.firebaseio.com",
 projectId: "react-contact-ca6c4",
 storageBucket: "react-contact-ca6c4.appspot.com",
 messagingSenderId: "650835134347",
 appId: "1:650835134347:web:aa7b79ab7d007eb887d18e"
  
});
  
//const fireDb = initializeApp(firebaseConfig);

export default firebaseConfig.database().ref();