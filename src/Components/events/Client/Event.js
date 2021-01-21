import { motion } from 'framer-motion'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Icon } from 'semantic-ui-react'
import { formatDate, formatImageLink } from '../../../common/util'
import { loadEventAction } from '../../../redux/actions/eventActions/loadEventAction'
import "./events.scss"

export const Event = ({ event }) => {

    const dispatch = useDispatch();

    const loadDetailHandler = () => {
        document.body.style.overflow = "hidden";
        dispatch(loadEventAction(event.id));
    }

    return (
        <motion.div className="event" onClick={loadDetailHandler}>
            <Link to={`/Events/${event.id}`}>
                <h3 >{event.eventName}</h3>
                <h4> {formatDate(event.eventDate)}</h4>
                <h4><Icon name="map pin" />{event.city}, {event.country}</h4>
                <img src={formatImageLink(event.imagePath)} alt="img" />
            </Link>
        </motion.div>
    )
}
