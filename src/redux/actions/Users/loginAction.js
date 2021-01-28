import axios from "axios"
import { loginUrlUrl } from "../../api"

export const login = (user, history) => async (dispatch) => {
  const tokenData = await axios.post(loginUrlUrl, user);
  if (tokenData) {
    localStorage.setItem("userToken", tokenData.data.token);
    dispatch({
      type: "Log_IN_User",
      payload: {
        token: tokenData.data.token
      }
    })
    history.push("/Redirect");
  }
}