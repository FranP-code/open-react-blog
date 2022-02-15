import { createUserWithEmailAndPassword, getAuth } from "firebase/auth"

const createUser = async (email, password, userData, enqueueSnackbar) => {
  
    try {
        const auth = getAuth()

        const response = await createUserWithEmailAndPassword(auth, email, password)
        
        return response

    } catch (error) {
        console.log(error)
        console.log(error.code)

        return error.code
    }
}

export default createUser