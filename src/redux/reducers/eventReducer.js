const initialState = {
    event: {},
    drawer: false,
}

export const eventReducer = (state = initialState, action) => {
    switch (action.type) {
        case "Load_Event_By_Id":
            return {
                ...state,
                event: action.payload.event,
                drawer: true
            }
        case "Unmount_Edit_Drawer":
            return {
                ...state,
                drawer: false,
            }
        default:
            return state
    }
}