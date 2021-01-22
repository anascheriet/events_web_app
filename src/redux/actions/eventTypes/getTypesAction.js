import axios from "axios"
import { eventTypesUrls } from "../../api"

export const getAllEventTypes = () => async (dispatch) => {
    const Types = await axios.get(eventTypesUrls.get);
    dispatch({
        type: "Load_Event_Types",
        payload: {
            eventTypes: Types?.data
        }
    })
}