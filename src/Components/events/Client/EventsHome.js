import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import React, { useState } from 'react'
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

    //set up search input
    const [searchedEvent, setSearchedEvent] = useState("");

    return (
        <motion.div className="eventList" style={{ marginTop: location.pathname === "/Guest" ? "3rem" : "0rem" }}>
            <AnimateSharedLayout type="switch">
                {/* wrap all the components that will be transitioning*/}
                <AnimatePresence>
                    {/* The component that will be animated should have a conditional toggle, pathId here */}
                    {pathId && <EventDetail pathId={pathId} />}
                </AnimatePresence>
                <h2 style={{ padding: "1rem", margin: "1rem" }}>Available events</h2>
                <div className="searchedDiv">
                    <input type="text" placeholder="Search event by name..." onChange={(e) => setSearchedEvent(e.target.value)} />
                </div>

                <motion.div className="events" >
                    {availableEvents.filter((event) => {
                        if (searchedEvent == "") {
                            return event;
                        }
                        else if (event.event.eventName.toLowerCase().includes(searchedEvent.toLowerCase())) {
                            return event;
                        }
                    }).map((event) => {
                        return <Event key={event.event.id} event={event.event} />
                    })}
                </motion.div>
            </AnimateSharedLayout>
        </motion.div>
    )
}
