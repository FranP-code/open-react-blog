import { collection, doc, getDoc, getDocs, getFirestore, limit, orderBy, query, startAfter, startAt, where } from "firebase/firestore"
import { firebase } from "../../../../firebase"

const getMorePosts = async (id, lastDocument, setLastPost) => {
  
    try {
        const db = getFirestore(firebase)
        // const q = query((collection(db, `users/${id}/posts`), orderBy("date", "desc"), limit(20)), startAt(lastDocument))
        const userRef = collection(db, `users/${id}/posts`);
        const q = query(userRef, orderBy("date", "desc"), startAfter(lastDocument), limit(21))

        const result = await getDocs(q)
        setLastPost(result.docs[result.docs.length-1])
        const docs = result.docs.map(doc => 
            doc = {
                data: doc.data(),
                id: doc.id
            }
        )
        return docs
    } catch (error) {
        console.log(error)
    }
}

export default getMorePosts