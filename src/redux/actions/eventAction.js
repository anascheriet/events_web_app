import axios from 'axios'
import { createEventUrl } from '../api'

export const createEventAction = (event) => async (async) => {
    await axios.post(createEventUrl, event);
}