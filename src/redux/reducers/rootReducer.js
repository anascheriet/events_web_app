import { combineReducers } from "redux";
import { ClientReducer } from "./ClientReducer";
import { eventReducer } from "./eventReducer";
import { eventTypeReducer } from "./eventTypeReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
    userState: userReducer,
    eventTypesState: eventTypeReducer,
    eventState: eventReducer,
    clientState: ClientReducer,
})

export default rootReducer;