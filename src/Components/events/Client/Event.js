import { motion } from 'framer-motion'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Icon } from 'semantic-ui-react'
import { popup } from '../../../common/animations'
import { formatDate, formatImageLink } from '../../../common/util'
import { loadEventAction } from '../../../redux/actions/eventActions/loadEventAction'
import "./events.scss"

export const Event = ({ event }) => {

    const dispatch = useDispatch();

    const loadDetailHandler = () => {
        document.body.style.overflow = "hidden";
        dispatch(loadEventAction(event.id));
        console.log(event.id)
    }

    return (
        <motion.div variants={popup} initial="hidden" animate="show" layoutId={event.id.toString()} className="event" onClick={loadDetailHandler}>
            <Link to={`/Home/${event.id}`}>
                <motion.h3 layoutId={`name ${event.id.toString()}`}  >{event.eventName}</motion.h3>
                <motion.h4 layoutId={`location ${event.id.toString()}`}><Icon name="map pin" />{event.city}, {event.country}</motion.h4>
                <motion.h4 layoutId={`date ${event.id.toString()}`} > {formatDate(event.eventDate)}</motion.h4>
                <motion.img layoutId={`image ${event.id.toString()}`} src={formatImageLink(event.imagePath)} alt="img" />
            </Link>
        </motion.div>
    )
}
