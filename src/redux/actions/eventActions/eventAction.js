import axios from 'axios'
import { errorToast, successToast } from '../../../common/Notifications';
import { eventsUrls } from '../../api'

export const createEventAction = (event) => async () => {

    try {
        const resp = await axios.post(eventsUrls.create, event);
        successToast(resp.data);
    } catch (error) {
        errorToast(error.data);
    }

}