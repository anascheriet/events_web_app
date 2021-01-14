import axios from "axios"
import { eventTypesUrls } from "../../api"

export const createEventTypeAction = (eventType) => async (dispatch) => {
    await axios.post(eventTypesUrls.create, eventType);
}