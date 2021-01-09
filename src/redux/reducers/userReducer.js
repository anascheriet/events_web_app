const initialState = {
    user: {},
    token: {},
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
        default: // need this for default case
            return state;
    }
}


export default userReducer;