export const updateReading = ()=>{
    return {
        type:'READINGDONE'
    }
}

export const updateListening = ()=>{
    return {
        type:'LISTENINGDONE'
    }
}

export const updateWriting = ()=>{
    return {
        type:'WRITINGDONE'
    }
}

export const updateEmail = (email) =>{
    return{
        type:'EMAIL',
        payload:email
    }
}