const emailReducer = (state='', action) =>{
    switch(action.type){
        case('EMAIL'):
            state = action.payload
            return state
        default:
            return state
    }

}

export default emailReducer