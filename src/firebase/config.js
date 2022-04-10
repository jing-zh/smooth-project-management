import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAVme5KV4FiKS6GWya1d_rKaMM3kVxJ6Qw",
  authDomain: "smoothproject-723d1.firebaseapp.com",
  projectId: "smoothproject-723d1",
  storageBucket: "smoothproject-723d1.appspot.com",
  messagingSenderId: "578436285892",
  appId: "1:578436285892:web:bb6e8c2877455f15cc9091",
};

// init firebase

firebase.initializeApp(firebaseConfig);

// init individual services

const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage();

//timestamp

const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, projectStorage, timestamp };
