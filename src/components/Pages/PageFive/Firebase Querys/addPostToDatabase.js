import { addDoc, collection, getFirestore } from "firebase/firestore"
import { firebase } from "../../../../firebase"

const addPostToDatabase = async (userId, post) => {
  
    try {
        const db = getFirestore(firebase)
        const selectedCollection = collection(db, `users/${userId}/posts`)
        const doc = await addDoc(selectedCollection, post)
        console.log(doc.id)
        return "success"
    } catch (error) {
        console.log(error)
        return "error"
    }
}

export default addPostToDatabase