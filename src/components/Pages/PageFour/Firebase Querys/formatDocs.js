const formatDocs = (docs) => {
  
    // docs.sort((a, b) => {if (a.date.seconds > b.date.seconds) { return -1 } else {return 1}})

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

    // if (lastArrayPlaced !== 0) {

    //     for (let i = 0; i <= lastArrayPlaced; i++) {
    //         returnArray[lastArrayPlaced].push({status: 'empty'})
    //         lastArrayPlaced++
    //     }
    // }

    console.log(returnArray)
    return returnArray
}

export default formatDocs