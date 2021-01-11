import axios from "axios"
import { userDataUrl } from "../api"

export const login = (user) => async (dispatch) => {
    const userData = await axios.post(userDataUrl, user);
    localStorage.setItem("userToken", userData.data.token.token);
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