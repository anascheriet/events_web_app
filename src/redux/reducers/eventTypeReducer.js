const initialState = {
    eventTypes : [],
}

export const eventTypeReducer = (state = initialState, action) => {
    switch (action.type) {
        case "Load_Event_Types":
            return {
                ...state,
                eventTypes: action.payload.eventTypes,
            }
        default:
            return state;
    }
}