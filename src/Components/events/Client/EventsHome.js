import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Event } from "./Event"
import { EventDetail } from './EventDetail';
import "./EventHome.scss"
import "../../searchItems.scss";
export const EventsHome = () => {

    //get current location
    const location = useLocation();
    const pathId = location.pathname.split("/")[2];

    //get events from the state
    const { availableEvents } = useSelector(state => state.clientState);

    //set up search inputs (event name, event type, event country)
    const [searchedEName, setSearchedEName] = useState("");
    const [searchedEType, setSearchedEType] = useState("");
    const [searchedECountry, setSearchedECountry] = useState("");

    return (
        <motion.div className="eventList" style={{ marginTop: location.pathname === "/Guest" ? "3rem" : "0rem" }}>
            <AnimateSharedLayout type="switch">
                {/* wrap all the components that will be transitioning*/}
                <AnimatePresence>
                    {/* The component that will be animated should have a conditional toggle, pathId here */}
                    {pathId && <EventDetail pathId={pathId} />}
                </AnimatePresence>
                <h2 style={{ padding: "1rem", margin: "1rem" }}>Available events</h2>

                <div className="styled-input wide multi">
                    <div >
                        <input type="text" name="fn" id="fn" autoComplete="off" data-placeholder-focus="false" required onChange={(e) => setSearchedEName(e.target.value)} />
                        <label>Event Name</label>
                    </div>
                    <div >
                        <input type="text" name="ln" id="ln" autoComplete="off" data-placeholder-focus="false" required onChange={(e) => setSearchedEType(e.target.value)} />
                        <label>Event Type</label>

                    </div>
                    <div>
                        <input type="text" name="city" id="city" autoComplete="off" data-placeholder-focus="false" onChange={(e) => setSearchedECountry(e.target.value)} />
                        <label>Country</label>
                    </div>
                </div>

                <motion.div className="events" >
                    {availableEvents.filter((event) => {
                        if (searchedEName == "" && searchedECountry == "" && searchedEType == "") {
                            return event;
                        }
                        else if (event.event.eventName.toLowerCase().includes(searchedEName.toLowerCase()) && searchedEType == "" && searchedECountry == "") {
                            return event;
                        }
                        else if (event.event.country.toLowerCase().includes(searchedECountry.toLowerCase()) && searchedEType == "" && searchedEName == "") {
                            return event;
                        }
                        else if (event.event.eventType.name.toLowerCase().includes(searchedEType.toLowerCase()) && searchedEName == "" && searchedECountry == "") {
                            return event;
                        }
                        else if (event.event.eventName.toLowerCase().includes(searchedEName.toLowerCase()) && event.event.eventType.name.toLowerCase().includes(searchedEType.toLowerCase()) && searchedECountry == "") {
                            return event;
                        }
                        else if (event.event.eventName.toLowerCase().includes(searchedEName.toLowerCase()) && event.event.country.toLowerCase().includes(searchedECountry.toLowerCase()) && searchedEType == "") {
                            return event;
                        }
                        else if (event.event.eventType.name.toLowerCase().includes(searchedEType.toLowerCase()) && event.event.country.toLowerCase().includes(searchedECountry.toLowerCase()) && searchedEName == "") {
                            return event;
                        }
                        else if (event.event.eventName.toLowerCase().includes(searchedEName.toLowerCase()) && event.event.country.toLowerCase().includes(searchedECountry.toLowerCase()) && event.event.eventType.name.toLowerCase().includes(searchedEType.toLowerCase())) {
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
