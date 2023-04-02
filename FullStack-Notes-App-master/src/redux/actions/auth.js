import { AUTH, LOGOUT } from "../constants/actionTypes"
import { doc, setDoc, getDoc } from "firebase/firestore"
import { db, auth } from "../../firebase"
import {
    createUserWithEmailAndPassword,
    signOut,
    signInWithEmailAndPassword,
} from "firebase/auth"
import Swal from 'sweetalert2'


export const signup = (firstName, lastName, email, password, navigate) => async (dispatch) => {
    try {
        const response = await createUserWithEmailAndPassword(auth, email, password);

        // Add a new document in collection "cities"
        await setDoc(doc(db, "users", response.user.uid), {
            firstName,
            lastName,
            initials: firstName[0] + lastName[0],
            uid: response.user.uid
        });
        dispatch({ type: AUTH, payload: { firstName, lastName, initials: `${firstName[0]}${lastName[0]}`, uid: response.user.uid } });
        navigate("/");

        Swal.fire({
            icon: "success",
            title: "Signup Success!",
            showConfirmButton: false,
            timer: 1500
        });
    }
    catch (error) {
        if (error.code === "auth/weak-password") {
            // Set error to auth/weak-password
            // Fire the alert
            Swal.fire({
                icon: "error",
                title: "Weak Password !",
                text: "Password should be at least 6 characters",
                showConfirmButton: false,
                timer: 1500
            });
        }

        else if (error.code === "auth/email-already-in-use") {
            // Fire the alert
            Swal.fire({
                icon: "error",
                title: "Account Already Exists !",
                text: "Email address is already in use by another account",
                showConfirmButton: false,
                timer: 2500,
            });
        }
    }
}

export const signout = (navigate) => async (dispatch) => {
    await signOut(auth);
    dispatch({ type: LOGOUT })
    navigate("/")
    Swal.fire({
        icon: "success",
        title: "Signed Out !",
        showConfirmButton: false,
        timer: 1000
    });
}

export const login = (email, password, navigate) => async (dispatch) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        const docRef = doc(db, 'users', auth.currentUser.uid)
        getDoc(docRef)
            .then(doc => {
                dispatch({ type: AUTH, payload: doc.data() })
                navigate("/notes")
            })
        Swal.fire({
            icon: "success",
            title: "Login Success!",
            showConfirmButton: false,
            timer: 1500
        });
    }
    catch (error) {
        // Identify the error
        if (error.code === "auth/wrong-password") {
            // Set error to wrong-password
            // Fire the alert
            Swal.fire({
                icon: "error",
                title: "Password is incorrect !",
                showConfirmButton: false,
                timer: 1500,
            });
        }

        else if (error.code === "auth/user-not-found") {
            // Fire the alert
            Swal.fire({
                icon: "error",
                title: "User not found !",
                showConfirmButton: false,
                timer: 1500,
            });
        }

        else if (error.code === "auth/too-many-requests") {
            // Fire the alert
            Swal.fire({
                icon: "error",
                title: "Too many failed login attempts, please try again later !",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    }
}


