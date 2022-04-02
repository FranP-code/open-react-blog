import { deleteDoc, doc, getFirestore } from "firebase/firestore"
import { firebase } from "../../../../firebase"

const deletePost = async (userID, postID) => {
    try {
        const db = getFirestore(firebase)
        await deleteDoc(doc(db, `users/${userID}/posts`, postID))
        return "success"
    } catch (error) {
        console.log(error)
        return "error"
    }
}

export default deletePost