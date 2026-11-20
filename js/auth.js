
/* =====================================
   DRESSCART 2.0 - AUTHENTICATION
   Firebase Authentication
===================================== */

import { auth } from "./firebase-config.js";

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    FacebookAuthProvider,
    sendPasswordResetEmail,
    sendEmailVerification,
    updateProfile,
    onAuthStateChanged,
    signOut,
    setPersistence,
    browserLocalPersistence,
    browserSessionPersistence
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";


// ELEMENTS

const authModal = document.getElementById("authModal");

const loginView = document.getElementById("loginView");
const registerView = document.getElementById("registerView");
const forgotView = document.getElementById("forgotView");

const authMessage = document.getElementById("authMessage");

const loginButton = document.getElementById("loginBtn");
const registerButton = document.getElementById("registerBtn");


// AUTH MESSAGE

function showAuthMessage(message, type = "") {

    authMessage.textContent = message;

    authMessage.className = "auth-message";

    if (type) {
        authMessage.classList.add(type);
    }

}

function clearAuthMessage() {
    showAuthMessage("");
}


// FRIENDLY ERROR MESSAGES

function getAuthError(error) {

    const messages = {

        "auth/invalid-email":
            "Please enter a valid email address.",

        "auth/user-not-found":
            "We couldn't find an account with those details.",

        "auth/wrong-password":
            "Incorrect email or password.",

        "auth/invalid-credential":
            "Incorrect email or password.",

        "auth/email-already-in-use":
            "This email already has an account. Please sign in.",

        "auth/weak-password":
            "Your password is too weak. Please use a stronger password.",

        "auth/popup-closed-by-user":
            "The sign-in window was closed before completion.",

        "auth/popup-blocked":
            "Your browser blocked the sign-in popup. Allow popups and try again.",

        "auth/unauthorized-domain":
            "This website domain is not authorized in Firebase.",

        "auth/account-exists-with-different-credential":
            "An account with this email already uses another sign-in method.",

        "auth/network-request-failed":
            "Network error. Please check your internet connection.",

        "auth/too-many-requests":
            "Too many attempts. Please wait before trying again.",

        "auth/operation-not-allowed":
            "This login method has not been enabled in Firebase.",

        "auth/invalid-api-key":
            "Your Firebase API key is invalid. Check your configuration."

    };

    return messages[error.code] ||
        "Something went wrong. Please try again. (" +
        error.code + ")";

}


// CHANGE AUTH VIEW

function showView(view) {

    loginView.hidden = view !== "login";
    registerView.hidden = view !== "register";
    forgotView.hidden = view !== "forgot";

    clearAuthMessage();

}

function openAuth(view = "login") {

    showView(view);

    authModal.classList.add("show");

}

function closeAuth() {

    authModal.classList.remove("show");

    clearAuthMessage();

}


// OPEN LOGIN AND REGISTER

loginButton.addEventListener("click", () => {

    document.getElementById("sidebar").classList.remove("open");

    document.getElementById("sidebarOverlay").classList.remove("show");

    openAuth("login");

});

registerButton.addEventListener("click", () => {

    document.getElementById("sidebar").classList.remove("open");

    document.getElementById("sidebarOverlay").classList.remove("show");

    openAuth("register");

});


// CLOSE AUTH MODAL

document.getElementById("closeAuth")
    .addEventListener("click", closeAuth);

authModal.addEventListener("click", event => {

    if (event.target === authModal) {
        closeAuth();
    }

});


// SWITCH LOGIN AND REGISTER

document.getElementById("showRegister")
    .addEventListener("click", () => showView("register"));

document.getElementById("showLogin")
    .addEventListener("click", () => showView("login"));

document.getElementById("backToLogin")
    .addEventListener("click", () => showView("login"));


// SHOW OR HIDE PASSWORD

document.querySelectorAll("[data-toggle]").forEach(button => {

    button.addEventListener("click", () => {

        const inputId = button.dataset.toggle;

        const passwordInput = document.getElementById(inputId);

        const visible = passwordInput.type === "text";

        passwordInput.type = visible ? "password" : "text";

        button.innerHTML = visible
            ? '<i data-lucide="eye"></i>'
            : '<i data-lucide="eye-off"></i>';

        button.setAttribute(
            "aria-label",
            visible ? "Show password" : "Hide password"
        );

        if (window.lucide) {
            window.lucide.createIcons();
        }

    });

});


// REGISTER CUSTOMER

document.getElementById("registerForm")
    .addEventListener("submit", async event => {

        event.preventDefault();

        clearAuthMessage();

        const name = document.getElementById("registerName")
            .value.trim();

        const email = document.getElementById("registerEmail")
            .value.trim();

        const password = document.getElementById("registerPassword")
            .value;

        const confirmPassword = document.getElementById("confirmPassword")
            .value;

        const agreeTerms = document.getElementById("agreeTerms")
            .checked;

        const submitButton =
            event.currentTarget.querySelector('[type="submit"]');

        if (name.length < 2) {
            showAuthMessage("Please enter your full name.", "error");
            return;
        }

        if (password.length < 8) {
            showAuthMessage(
                "Your password must have at least 8 characters.",
                "error"
            );
            return;
        }

        if (password !== confirmPassword) {
            showAuthMessage(
                "Your passwords do not match.",
                "error"
            );
            return;
        }

        if (!agreeTerms) {
            showAuthMessage(
                "Please agree to the Terms and Privacy Policy.",
                "error"
            );
            return;
        }

        submitButton.disabled = true;
        submitButton.textContent = "Creating account...";

        try {

            const credential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            await updateProfile(credential.user, {
                displayName: name
            });

            let verificationSent = true;

            try {
                await sendEmailVerification(credential.user);
            } catch (verificationError) {
                verificationSent = false;
                console.error(
                    "Verification email could not be sent:",
                    verificationError
                );
            }

            document.getElementById("registerForm").reset();

            closeAuth();

            showToast(
                verificationSent
                    ? "Welcome to DressCart! Check your email for verification."
                    : "Welcome to DressCart! Your account was created."
            );

        } catch (error) {

            showAuthMessage(getAuthError(error), "error");

        } finally {

            submitButton.disabled = false;
            submitButton.textContent = "Create Account";

        }

    });


// LOGIN CUSTOMER

document.getElementById("loginForm")
    .addEventListener("submit", async event => {

        event.preventDefault();

        clearAuthMessage();

        const email = document.getElementById("loginEmail")
            .value.trim();

        const password = document.getElementById("loginPassword")
            .value;

        const remember = document.getElementById("rememberMe")
            .checked;

        const submitButton =
            event.currentTarget.querySelector('[type="submit"]');

        submitButton.disabled = true;
        submitButton.textContent = "Signing in...";

        try {

            await setPersistence(
                auth,
                remember
                    ? browserLocalPersistence
                    : browserSessionPersistence
            );

            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            document.getElementById("loginForm").reset();

            closeAuth();

            showToast("Successfully signed in!");

        } catch (error) {

            showAuthMessage(getAuthError(error), "error");

        } finally {

            submitButton.disabled = false;
            submitButton.textContent = "Sign In";

        }

    });


// FORGOT PASSWORD

document.getElementById("forgotPasswordBtn")
    .addEventListener("click", () => {

        const email = document.getElementById("loginEmail").value.trim();

        showView("forgot");

        document.getElementById("forgotEmail").value = email;

    });

document.getElementById("forgotForm")
    .addEventListener("submit", async event => {

        event.preventDefault();

        clearAuthMessage();

        const email = document.getElementById("forgotEmail")
            .value.trim();

        const submitButton =
            event.currentTarget.querySelector('[type="submit"]');

        submitButton.disabled = true;
        submitButton.textContent = "Sending...";

        try {

            await sendPasswordResetEmail(auth, email);

            showAuthMessage(
                "If an account is registered with this email, a password reset link will be sent. Please check your inbox and spam folder.",
                "success"
            );

        } catch (error) {

            showAuthMessage(getAuthError(error), "error");

        } finally {

            submitButton.disabled = false;
            submitButton.textContent = "Send Reset Link";

        }

    });


// GOOGLE LOGIN

let googleLoginInProgress = false;

document.getElementById("googleLogin")
    .addEventListener("click", async () => {

        if (googleLoginInProgress) return;

        googleLoginInProgress = true;

        clearAuthMessage();

        const button = document.getElementById("googleLogin");
        button.disabled = true;

        const provider = new GoogleAuthProvider();

        provider.setCustomParameters({
            prompt: "select_account"
        });

        try {

            await setPersistence(auth, browserLocalPersistence);

            await signInWithPopup(auth, provider);

            closeAuth();

            showToast("Successfully signed in with Google!");

        } catch (error) {

            console.error("Google login error:", error);

            showAuthMessage(getAuthError(error), "error");

        } finally {

            googleLoginInProgress = false;
            button.disabled = false;

        }

    });


// FACEBOOK LOGIN

document.getElementById("facebookLogin")
    .addEventListener("click", async () => {

        clearAuthMessage();

        const provider = new FacebookAuthProvider();

        provider.addScope("email");

        try {

            await setPersistence(auth, browserLocalPersistence);

            await signInWithPopup(auth, provider);

            closeAuth();

            showToast("Successfully signed in with Facebook!");

        } catch (error) {

            showAuthMessage(getAuthError(error), "error");

            console.error("Facebook login error:", error);

        }

    });


// CREATE CUSTOMER ACCOUNT PANEL

const accountPanel = document.createElement("div");

accountPanel.className = "account-card";

accountPanel.hidden = true;

const sidebarLabel = document.querySelector(".sidebar-label");

sidebarLabel.parentNode.insertBefore(accountPanel, sidebarLabel);

// SYNC FIREBASE CUSTOMER TO MYSQL

async function syncCustomerToDatabase(user) {

    if (!user) return;

    const provider =
        user.providerData?.[0]?.providerId || "password";

    try {

        const response = await fetch("php/customer_sync.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                firebase_uid: user.uid,
                full_name: user.displayName || "Customer",
                email: user.email || "",
                auth_provider: provider
            })
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
            throw new Error(result.message || "Customer sync failed.");
        }

        console.log("Customer successfully saved in MySQL!");

    } catch (error) {

        console.error("Customer database sync error:", error);

    }

}

// CUSTOMER LOGIN STATUS

onAuthStateChanged(auth, async user => {

    window.currentUser = user;

    if (user) {

        await syncCustomerToDatabase(user);
        
        // LOAD CUSTOMER ORDERS FROM MYSQL

if (typeof window.loadCustomerOrders === "function") {
    await window.loadCustomerOrders();
}

        loginButton.hidden = true;
        registerButton.hidden = true;

        accountPanel.hidden = false;

        accountPanel.replaceChildren();

        const greeting = document.createElement("strong");

        greeting.textContent =
            "Hello, " + (user.displayName || "Customer") + "!";

        const email = document.createElement("p");

        email.textContent = user.email || "";

        const status = document.createElement("p");

        status.textContent = user.emailVerified
            ? "Verified account"
            : "Email not verified yet";

        const logoutButton = document.createElement("button");

        logoutButton.className = "logout-btn";

        logoutButton.textContent = "LOG OUT";

        logoutButton.addEventListener("click", async () => {

            try {

                await signOut(auth);

                closeAuth();

                document.getElementById("sidebar")
                    .classList.remove("open");

                document.getElementById("sidebarOverlay")
                    .classList.remove("show");

                showToast("You have signed out.");

            } catch (error) {

                showToast(getAuthError(error));

            }

        });

        accountPanel.append(
            greeting,
            email,
            status,
            logoutButton
        );

    } else {

        loginButton.hidden = false;
        registerButton.hidden = false;

        accountPanel.hidden = true;

    }

});


// KEYBOARD SUPPORT

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
        closeAuth();
    }

});

console.log("DressCart authentication initialized.");

