import { collection, doc, getDoc, getDocs, getFirestore } from "firebase/firestore"
import { firebase } from "../../../../firebase"

const returnAndFormatUsernameDocuments = async (id) => {
    
    const docs = await (async () => {

        try {
            
            const db = getFirestore(firebase)
            const data = collection(db, `users/${id}/posts`)
            const result = await getDocs(data)

            const docs = result.docs.map(doc => doc.data())

            console.log(docs)
            return docs

        } catch (error) {
            console.log(error)
        }
    })()

    docs.sort((a, b) => {if (a.date.seconds > b.date.seconds) { return -1 } else {return 1}})

    let lastArrayPlaced = 0
    let returnArray = [[], [], []]

    docs.forEach(doc => {

        console.log(returnArray)
        console.log(returnArray[lastArrayPlaced])
        returnArray[lastArrayPlaced].push(doc)
        
        lastArrayPlaced++

        if (lastArrayPlaced === 3) {

            lastArrayPlaced = 0
        } 
    })

    console.log(returnArray)
    return returnArray
}

export default returnAndFormatUsernameDocuments