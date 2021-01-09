import axios from "axios"
import { userDataUrl } from "../api"

export const loadUser = (user) => async (dispatch) => {
    const userData = await axios.post(userDataUrl, user);
    console.log(userData);
    dispatch({
        type: "Fetch_User_Info",
        payload: {
            user: userData.data.user,
            events: userData.data.user.createdEvents,
            reservations: userData.data.user.bookedReservations,
            token: userData.data.token
        }
    })
}