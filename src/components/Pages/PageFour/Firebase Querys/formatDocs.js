const formatDocs = (docs) => {

    let lastArrayPlaced = 0
    let returnArray = [[], [], []]

    docs.forEach(doc => {

        returnArray[lastArrayPlaced].push(doc)
        
        lastArrayPlaced++

        if (lastArrayPlaced === 3) {

            lastArrayPlaced = 0
        } 
    })

    return returnArray
}

export default formatDocs