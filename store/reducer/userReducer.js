export default function userReducer(state = {}, action) {
    switch(action.type){
        case 'USER_GET_DATA_SUCCESS':
            return{...state, user: action.user};
        default:
            return state
    }
    
}