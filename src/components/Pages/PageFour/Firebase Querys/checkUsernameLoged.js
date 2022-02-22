import { getAuth, onAuthStateChanged } from "firebase/auth";

const checkUsernameLoged = (documentId, setUserLoged) => {
  
    try {
        const auth = getAuth()
      
        onAuthStateChanged(auth, (user) => {
              
            if (user) {
  
                if (user.uid === documentId) {
  
                  setUserLoged(true)
                  return
                }
              }
            setUserLoged(false)
        })
        
      } catch (error) {
        console.log(error)
      }
}

export default checkUsernameLoged