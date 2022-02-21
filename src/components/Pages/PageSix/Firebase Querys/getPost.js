import { doc, getDoc, getFirestore } from "firebase/firestore"
import { firebase } from "../../../../firebase"

const getPost = async (postId, usernameId) => {
  
    try {
        const db = getFirestore(firebase)
        const docRef = doc(db, `users/${usernameId}/posts`, postId)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
            const data = docSnap.data()

            console.log(data)
            return {
                state: "success",
                title: data.title,
                post: data.post
            }
        } else {
            return {
                state: "error"
            }
        }
    } catch (error) {
        console.log(error)
    }
}

export default getPost