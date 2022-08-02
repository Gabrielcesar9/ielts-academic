const listeningReducer = (state=false, action) =>{
    switch(action.type){
        case('LISTENINGDONE'):
            return true
        case('LISTENINGUNDONE'):
            return false
        default:
            return state
    }
}

export default listeningReducer