
const initialState = {
    availableEvents: [],
}

export const ClientReducer = (state = initialState, action) => {
    switch (action.type) {
        case "Get_All_Events": return {
            ...state,
            availableEvents: action.payload.events
        }
        default: return state
    }
}