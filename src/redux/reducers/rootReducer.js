import { combineReducers } from "redux";
import { eventTypeReducer } from "./eventTypeReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
    userState: userReducer,
    eventTypesState: eventTypeReducer,
})

export default rootReducer;