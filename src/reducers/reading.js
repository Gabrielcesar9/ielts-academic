const readingReducer = (state=false, action) =>{
    switch(action.type){
        case('READINGDONE'):
            return true
        case('READINGUNDONE'):
            return false
        default:
            return state
    }
}

export default readingReducer