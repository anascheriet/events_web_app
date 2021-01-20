const initialState = {
    user: null,
    token: null,
    isLoggedIn: false
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "Log_IN_User":
            return {
                ...state,
                token: action.payload.token,
                isLoggedIn: true
            }

        case "Log_Out_User": {
            return {
                ...state,
                token: action.payload.token,
                user: action.payload.user,
                isLoggedIn: false,
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