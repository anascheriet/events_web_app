import axios from "axios"
import { eventsUrls } from "../../api"

export const loadEventAction = (id) => async (dispatch) => {
    const response = await axios.get(eventsUrls.details(id));
    //console.log(response.data.event);

    dispatch({
        type: "Load_Event_By_Id",
        payload: {
            event: response.data.event,
        }
    })
}

export const unMountDrawer = () => async (dispatch) => {
    dispatch({
        type: "Unmount_Edit_Drawer"
    }
    )
}