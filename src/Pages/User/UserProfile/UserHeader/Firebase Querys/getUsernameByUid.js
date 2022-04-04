import {getDoc, getFirestore, doc } from "firebase/firestore"
import { firebase } from '../../../../../firebase'

const getUsernameByUid = async (uid) => {

    try {
        const db = getFirestore(firebase)
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
            return docSnap.data()
        } else {
            return false
        }

    } catch (error) {
        console.log(error)
    }
}

export default getUsernameByUid