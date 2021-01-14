const initialState = {
    user: null,
    token: null,
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "Log_IN_User":
            return {
                ...state,
                token: action.payload.token
            }

        case "Log_Out_User": {
            return {
                ...state,
                token: action.payload.token
            }
        }
        case "Load_User_Info": 
        return {
            ...state,
            user: action.payload.user

        }
        default: // need this for default case
            return state;
    }
}


export default userReducer;