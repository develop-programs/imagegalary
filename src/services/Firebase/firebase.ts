// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDD4UOSjVNhXc3-nDQTdMNZwvqWNiBdrYg",
    authDomain: "photogalary-ae537.firebaseapp.com",
    projectId: "photogalary-ae537",
    storageBucket: "photogalary-ae537.appspot.com",
    messagingSenderId: "1009070345535",
    appId: "1:1009070345535:web:60532d8077aa11c0f7578a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const StorageRef = getStorage(app)