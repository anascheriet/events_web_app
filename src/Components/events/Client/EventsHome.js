import { motion } from 'framer-motion';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllEventsAction } from '../../../redux/actions/clientActions/getAllEventsAction';
import { Event } from "./Event"
import "./EventHome.scss"
export const EventsHome = () => {

    const dispatch = useDispatch();
    //fetch existing events from the api
    useEffect(() => {
        dispatch(getAllEventsAction());
    }, [])
    //get events from the state
    const { availableEvents } = useSelector(state => state.clientState);
    return (
        <motion.div className="eventList">
            <h2>Events</h2>
            <motion.div className="events" >
                {availableEvents.map((event) => {
                    return <Event event={event.event} />
                })}
            </motion.div>
        </motion.div>
    )
}
