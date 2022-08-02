const writingReducer = (state=false, action) =>{
    switch(action.type){
        case('WRITINGDONE'):
            return true
        case('WRITINGUNDONE'):
            return false
        default:
            return state
    }
}

export default writingReducer