import axios from "axios"
import { getCurrentUserUrl } from "../../api"

export const loadUserInfo = () => async (dispatch) => {
    const userData = await axios.get(getCurrentUserUrl);
    dispatch({
        type: "Load_User_Info",
        payload: {
            user: userData?.data,
            createdEvents: userData?.data?.createdEvents
        }
    })
}