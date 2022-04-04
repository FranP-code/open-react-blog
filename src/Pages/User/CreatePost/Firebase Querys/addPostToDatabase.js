import { addDoc, collection, getFirestore } from "firebase/firestore"
import { firebase } from "../../../../firebase"

const addPostToDatabase = async (userId, post) => {
  
    try {
        const db = getFirestore(firebase)
        const selectedCollection = collection(db, `users/${userId}/posts`)
        await addDoc(selectedCollection, post)
        return "success"
    } catch (error) {
        console.log(error)
        return "error"
    }
}

export default addPostToDatabase