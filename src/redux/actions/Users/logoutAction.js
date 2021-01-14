

export const logoutAction = () => async (dispatch) => {
    localStorage.removeItem("userToken");
    dispatch({
        type: "Log_Out_User",
        payload: {
            token: null
        }
    })
}