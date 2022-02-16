import {firebase} from '../../../../firebase'
import { getAuth, onAuthStateChanged } from "firebase/auth";

const checkUsernameLoged = (documentId, setUserLoged, setLoading) => {
  
    try {
        const auth = getAuth()
      
        onAuthStateChanged(auth, (user) => {
  
            console.log(user)
            
            if (user) {
                
                console.log(user.uid)
                console.log(documentId)
  
                if (user.uid === documentId) {
  
                  setUserLoged(true)
                  setLoading(false)
                  return
                }
              }
              
            setLoading(false)  
            setUserLoged(false)
        })
        
      } catch (error) {
        console.log(error)
      }
}

export default checkUsernameLoged