import { combineReducers } from "redux";
import { eventTypeReducer } from "./eventTypeReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
    userState: userReducer,
    eventTypes: eventTypeReducer,
})

export default rootReducer;