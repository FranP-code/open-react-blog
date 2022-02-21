import { collection, doc, getDoc, getDocs, getFirestore, limit, orderBy, query, where } from "firebase/firestore"
import { firebase } from "../../../../firebase"

const getPosts = async (id, setLastPost) => {
    
    try {
        
        const db = getFirestore(firebase)
        // const data = collection(db, `users/${id}/posts`)
        // const result = await getDocs(data)

        // const docs = result.docs.map(doc => doc.data())

        const q = query(collection(db, `users/${id}/posts`), orderBy("date", "desc"), limit(21))
        const result = await getDocs(q)
        setLastPost(result.docs[result.docs.length-1])
        const docs = result.docs.map(doc => 
            doc = {
                data: doc.data(),
                id: doc.id
            }
        )
        console.log(docs)
        return docs

    } catch (error) {
        console.log(error)
    }
}

export default getPosts