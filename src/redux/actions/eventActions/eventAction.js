import axios from 'axios'
import { eventsUrls } from '../../api'

export const createEventAction = (event) => async () => {
    await axios.post(eventsUrls.create, event);
}