const initialState = {
    user: {},
    token: null,
    createdEvents: [],
    bookedReservations: []
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "Fetch_User_Info":
            return {
                ...state,
                user: action.payload.user,
                createdEvents: action.payload.events,
                bookedReservations: action.payload.reservations,
                token: action.payload.token
            }

        case "Log_Out_User": {
            return {
                ...state,
                user: action.payload.user
            }
        }
        default: // need this for default case
            return state;
    }
}


export default userReducer;