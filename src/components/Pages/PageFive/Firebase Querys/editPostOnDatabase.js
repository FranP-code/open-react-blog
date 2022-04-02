import { doc, getFirestore, updateDoc } from "firebase/firestore"
import { firebase } from "../../../../firebase"

const editPostOnDatabase = async (userId, postId, post) => {
  
    try {
        const db = getFirestore(firebase)
        const refDoc = doc(db, `users/${userId}/posts`, postId)
        
        await updateDoc(refDoc, post)
        
        return "success"
    } catch (error) {
        console.log(error)
        return "success"
    }
}

export default editPostOnDatabase