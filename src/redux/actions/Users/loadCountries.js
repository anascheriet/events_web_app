import axios from "axios"

export const loadCountries = () => async (dispatch) => {
    const countriesData = await axios.get("https://countriesnow.space/api/v0.1/countries");

    dispatch({
        type: "Load_Countries",
        payload: {
            countries: countriesData.data.data
        }
    })
}