import { motion } from 'framer-motion';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getAllEventsAction } from '../../../redux/actions/clientActions/getAllEventsAction';
import { Event } from "./Event"
import { EventDetail } from './EventDetail';
import "./EventHome.scss"
export const EventsHome = () => {

    const dispatch = useDispatch();

    //get current location
    const location = useLocation();
    const pathId = location.pathname.split("/")[2];
    console.log(pathId);


    //fetch existing events from the api
    useEffect(() => {
        dispatch(getAllEventsAction());
        console.log(location.pathname);
    }, [])
    //get events from the state
    const { availableEvents } = useSelector(state => state.clientState);


    return (
        <motion.div className="eventList">
            {pathId && <EventDetail />}
            <h2>events</h2>
            <motion.div className="events" >
                {availableEvents.map((event) => {
                    return <Event event={event.event} />
                })}
            </motion.div>
        </motion.div>
    )
}
