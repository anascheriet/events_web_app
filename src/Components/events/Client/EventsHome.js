import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion';
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

    //fetch existing events from the api
    useEffect(() => {
        dispatch(getAllEventsAction());
    }, [dispatch])
    //get events from the state
    const { availableEvents } = useSelector(state => state.clientState);


    return (
        <motion.div className="eventList">
            <AnimateSharedLayout type="switch">
                {/* wrap all the components that will be transitioning*/}
                <AnimatePresence>
                    {/* The component that will be animated should have a conditional toggle, pathId here */}
                    {pathId && <EventDetail pathId={pathId} />}
                </AnimatePresence>
                <h2>Available events</h2>
                <motion.div className="events" >
                    {availableEvents.map((event) => {
                        return <Event event={event.event} />
                    })}
                </motion.div>
            </AnimateSharedLayout>
        </motion.div>
    )
}
