const initialState = {
    user: [],
    createdEvents: [],
    bookedReservations: []
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "Fetch user info":
            return {
                ...state,
                user: action.payload.user,
                bookedReservations: action.payload.reservations,
                createdEvents: action.payload.createdEvents
            }
        default: // need this for default case
            return state;
    }
}


export default userReducer;