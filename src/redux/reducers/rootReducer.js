import { combineReducers } from "redux";
import { eventReducer } from "./eventReducer";
import { eventTypeReducer } from "./eventTypeReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
    userState: userReducer,
    eventTypesState: eventTypeReducer,
    eventState: eventReducer,
})

export default rootReducer;