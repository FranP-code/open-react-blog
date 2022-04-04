import {doc, getFirestore, setDoc} from 'firebase/firestore'
import { firebase } from "../../../../firebase"

const createUserDocumentOnFirestore = async (userData, username, displayUsername) => {
  
    try {
        const db = getFirestore(firebase)
        
        await setDoc(doc(db, 'users', userData.user.uid), {

            username: username,
            displayUsername: displayUsername
        })

    } catch (error) {
        console.log(error)
    }
}

export default createUserDocumentOnFirestore