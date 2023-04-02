import { db, auth } from "../../firebase"
import { addDoc, collection, getDocs, doc, deleteDoc, query, where } from "firebase/firestore"
import { CREATE_NOTE, GET_NOTES, DELETE_NOTE } from "../constants/actionTypes";
import Swal from 'sweetalert2'


//specifying the collection in the db
const postCollectionRef = collection(db, "notes")

export const createNote = (title, detail, category) => async (dispatch) => {
    const doc = {
        title,
        detail,
        category,
        authorId: auth.currentUser.uid
    }
    await addDoc(postCollectionRef, doc);
    dispatch({ type: CREATE_NOTE, payload: doc });
    Swal.fire({
        icon: "success",
        title: "Note has been created successfully!",
        showConfirmButton: false,
        timer: 1500
    });

}

export const getNotes = () => async (dispatch) => {
    const uid = JSON.parse(localStorage.getItem('data'))?.uid;
    const q = query(postCollectionRef, where("authorId", "==", uid));
    const querySnapshot = await getDocs(q);
    dispatch({ type: GET_NOTES, payload: querySnapshot });
}

export const deleteNote = (noteId) => async (dispatch) => {
    console.log("deleting the notes", noteId)
    const note = doc(db, "notes", noteId);
    await deleteDoc(note);
    dispatch({ type: DELETE_NOTE, payload: noteId });
    Swal.fire({
        icon: "success",
        title: "Note has been deleted successfully!",
        showConfirmButton: false,
        timer: 1500
    });
}