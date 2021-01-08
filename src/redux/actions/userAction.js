import axios from "axios"
import { userDataUrl } from "../api"

export const loadUser = (user) => async (dispatch) => {
    const userData = (user) => await axios.post(userDataUrl, user);
    dispatch({
        type: "Fetch user info",
        payload: {
            user: userData.user,
            reservations: userData.user.bookedReservations,
            createdEvents: userData.user.createdEvents
        }
    })
}