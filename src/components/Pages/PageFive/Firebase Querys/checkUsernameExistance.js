import { collection, getDocs, getFirestore, limit, query, where } from "firebase/firestore"
import { firebase } from "../../../../firebase"

const checkUsernameExistance = async (username) => {
    try {
        const db = getFirestore(firebase)
        const usersRef = collection(db, 'users')

        const q = query(usersRef, where('username', "==", username), limit(1))
        const result = await getDocs(q)

        if (result.docs[0]) {
            return {userExists: true, data: result.docs[0].data(), id: result.docs[0].id}
        }
        
        return {userExists: false}

    } catch (error) {
        console.log(error)
    }
}

export default checkUsernameExistance