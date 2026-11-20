
import { initializeApp } from
"https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";

import { getAuth } from
"https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

// REPLACE THESE VALUES WITH YOUR FIREBASE CONFIGURATION

const firebaseConfig = {
    apiKey: "AIzaSyCOpTLB7wU4Dk6sFTnND34KRzplXgb1YI0",
    authDomain: "dresscart-6edab.firebaseapp.com",
    projectId: "dresscart-6edab",
    storageBucket: "dresscart-6edab.firebasestorage.app",
    messagingSenderId: "425105245194",
    appId: "1:425105245194:web:2a4e26b9fc1367444a0bf3"
};

// INITIALIZE FIREBASE

const app = initializeApp(firebaseConfig);

// INITIALIZE AUTHENTICATION

const auth = getAuth(app);

export { app, auth };
