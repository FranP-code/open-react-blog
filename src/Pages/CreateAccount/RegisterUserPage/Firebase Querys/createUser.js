import { createUserWithEmailAndPassword, getAuth } from "firebase/auth"

const createUser = async (email, password) => {
  
    try {
        const auth = getAuth()

        const response = await createUserWithEmailAndPassword(auth, email, password)
        
        return response

    } catch (error) {
        console.log(error)

        return error.code
    }
}

export default createUser