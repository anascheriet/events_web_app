import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import React from 'react'
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Event } from "./Event"
import { EventDetail } from './EventDetail';
import "./EventHome.scss"
export const EventsHome = () => {

    //get current location
    const location = useLocation();
    const pathId = location.pathname.split("/")[2];

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
                        return <Event key={event.event.id} event={event.event} />
                    })}
                </motion.div>
            </AnimateSharedLayout>
        </motion.div>
    )
}
