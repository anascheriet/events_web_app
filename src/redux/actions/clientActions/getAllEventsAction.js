import axios from "axios"
import { eventsUrls } from "../../api"


export const getAllEventsAction = () => async (dispatch) => {
    const response = await axios.get(eventsUrls.getAll);
    dispatch({
        type: "Get_All_Events",
        payload: {
            events: response.data
        }
    })
}