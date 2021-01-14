import axios from "axios"
import { loginUrlUrl } from "../api"

export const login = (user) => async (dispatch) => {
    const tokenData = await axios.post(loginUrlUrl, user);
    localStorage.setItem("userToken", tokenData.data.token);
    console.log(tokenData);
    dispatch({
        type: "Log_IN_User",
        payload: {
          token: tokenData.data.token
        }
    })
}